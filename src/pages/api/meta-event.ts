import type { NextApiRequest, NextApiResponse } from 'next';

// API de Conversiones de Meta: recibe el aviso desde el sitio y lo reenvía a Meta
// desde el servidor. El token de acceso es SECRETO: vive solo en las variables de
// entorno de Vercel (META_CAPI_TOKEN), nunca en el código.

const PIXEL_ID = '1423015095887252'; // público, igual que en _app.tsx
const GRAPH_VERSION = 'v25.0';
const SITIO = 'https://aconcagua-digital.com/';

// Solo aceptamos estos eventos y solo pedidos que vengan de nuestro propio sitio,
// para que nadie pueda usar este endpoint para mandar cualquier cosa a nuestro pixel.
const EVENTOS_PERMITIDOS = ['Lead', 'Contact'];
const HOSTS_PERMITIDOS = [
  'aconcagua-digital.com',
  'www.aconcagua-digital.com',
  'aconcagua-digital.vercel.app',
  'localhost',
];

function urlPermitida(valor: unknown): URL | null {
  if (typeof valor !== 'string') return null;
  try {
    const url = new URL(valor);
    return HOSTS_PERMITIDOS.includes(url.hostname) ? url : null;
  } catch {
    return null;
  }
}

function primerValor(h: string | string[] | undefined): string | undefined {
  return Array.isArray(h) ? h[0] : h;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false });
    return;
  }

  if (!urlPermitida(req.headers.origin)) {
    res.status(403).json({ ok: false });
    return;
  }

  const { eventName, eventId, eventSourceUrl } = (req.body ?? {}) as Record<string, unknown>;

  if (typeof eventName !== 'string' || !EVENTOS_PERMITIDOS.includes(eventName)) {
    res.status(400).json({ ok: false });
    return;
  }
  if (typeof eventId !== 'string' || eventId.length < 8 || eventId.length > 100) {
    res.status(400).json({ ok: false });
    return;
  }

  const userAgent = req.headers['user-agent'];
  if (!userAgent) {
    res.status(400).json({ ok: false });
    return;
  }

  // Sin token (por ejemplo, en tu compu) no se envía nada y no se rompe nada.
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    res.status(200).json({ ok: true, skipped: true });
    return;
  }

  const origen = urlPermitida(eventSourceUrl);
  const ip =
    primerValor(req.headers['x-forwarded-for'])?.split(',')[0].trim() || req.socket.remoteAddress;

  // Cookies que crea el Píxel de Meta en el navegador. Ayudan a Meta a reconocer a la persona.
  const fbp = typeof req.cookies._fbp === 'string' ? req.cookies._fbp.slice(0, 200) : undefined;
  const fbc = typeof req.cookies._fbc === 'string' ? req.cookies._fbc.slice(0, 200) : undefined;

  const cuerpo: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: origen ? origen.origin + origen.pathname + origen.search : SITIO,
        action_source: 'website',
        user_data: {
          client_ip_address: ip,
          client_user_agent: userAgent,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
      },
    ],
  };

  // Solo para probar: con este código los eventos aparecen en "Probar eventos" de Meta
  // y no cuentan como reales. Hay que borrar la variable cuando termines de probar.
  if (process.env.META_TEST_EVENT_CODE) {
    cuerpo.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const respuesta = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!respuesta.ok) {
      // Se guarda solo el motivo (nunca la dirección con el token) para verlo en los logs de Vercel.
      console.error('Meta CAPI rechazó el evento:', respuesta.status, (await respuesta.text()).slice(0, 500));
      res.status(502).json({ ok: false });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Meta CAPI no respondió:', error instanceof Error ? error.name : 'error');
    res.status(502).json({ ok: false });
  }
}
