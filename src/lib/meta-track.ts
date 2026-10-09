// Avisa a Meta cuando alguien hace una acción importante (por ejemplo, tocar el botón de WhatsApp).
//
// Lo manda dos veces con el MISMO ID de evento:
//   1) desde el navegador (el Píxel)
//   2) desde nuestro servidor (API de Conversiones, ver src/pages/api/meta-event.ts)
// Meta ve que es el mismo evento y lo cuenta una sola vez.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Lead = tocó el botón del formulario. Contact = tocó el link de WhatsApp del pie de página.
export type MetaEvent = 'Lead' | 'Contact';

function nuevoIdDeEvento(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackMeta(eventName: MetaEvent) {
  try {
    const eventId = nuevoIdDeEvento();

    // 1) Píxel (navegador). Solo existe en el sitio publicado, y una vez que terminó de cargar.
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, {}, { eventID: eventId });
    }

    // 2) API de Conversiones (servidor). "keepalive" hace que el envío termine
    //    aunque la persona ya haya cambiado de pestaña hacia WhatsApp.
    fetch('/api/meta-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, eventId, eventSourceUrl: window.location.href }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Si algo falla, no pasa nada: el link de WhatsApp igual funciona.
  }
}
