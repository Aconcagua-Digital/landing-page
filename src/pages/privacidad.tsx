import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// =========================================
// DATOS DEL RESPONSABLE
// (están en un solo lugar para no tener que buscarlos en el texto)
// Cada vez que cambies algo de esta política, actualizá la fecha de "updated".
// =========================================
const LEGAL = {
  name: 'Juan Ignacio Araujo',
  email: 'aconcdigital@gmail.com',
  updated: { es: '9 de octubre de 2026', en: 'October 9, 2026' },
};

type Section = { heading: string; intro?: string[]; bullets?: string[]; paragraphs?: string[] };

function getContent(locale: 'es' | 'en') {
  if (locale === 'es') {
    return {
      back: '← Volver al inicio',
      title: 'Política de Privacidad',
      updatedLabel: 'Última actualización',
      note: null as string | null,
      sections: [
        {
          heading: '1. Quién es el responsable',
          paragraphs: [
            `El responsable del tratamiento de tus datos personales es ${LEGAL.name}, con domicilio en Córdoba, Argentina, titular del sitio aconcagua-digital.com (en adelante, "Aconcagua Digital").`,
            `Podés contactarnos en ${LEGAL.email} o por WhatsApp.`,
          ],
        },
        {
          heading: '2. Qué datos recopilamos',
          bullets: [
            'Datos que nos enviás vos: nombre, empresa y el contenido del mensaje que escribís en el formulario de contacto.',
            'Datos técnicos: la plataforma donde se aloja el sitio puede registrar tu dirección IP, tipo de navegador y fecha de acceso en registros de servidor, con fines de seguridad y funcionamiento.',
            'Datos de navegación para medición y publicidad: a través del Píxel de Meta y la API de Conversiones de Meta (ver punto 6), como las páginas que visitás y si hacés clic en el botón de WhatsApp.',
          ],
          paragraphs: [
            'El sitio no utiliza herramientas de analítica propias. Las únicas herramientas de seguimiento publicitario son el Píxel de Meta y la API de Conversiones de Meta, que se explican en el punto 6.',
          ],
        },
        {
          heading: '3. Cómo funciona el formulario de contacto',
          paragraphs: [
            'El formulario no guarda lo que escribís en nuestros servidores. Arma un mensaje que se abre en WhatsApp, y solo se envía si vos lo enviás desde ahí. Desde ese momento, el mensaje queda sujeto también a las condiciones y la política de privacidad de WhatsApp.',
            'No enviamos a Meta el contenido de los mensajes que escribís en el formulario, ni desde el Píxel ni desde nuestro servidor.',
          ],
        },
        {
          heading: '4. Para qué usamos tus datos',
          bullets: [
            'Responder tu consulta.',
            'Elaborar presupuestos y mantener la relación comercial, si avanzamos con un proyecto.',
            'Medir el resultado de nuestras campañas de publicidad en Meta y mostrar publicidad a personas que visitaron el sitio.',
          ],
          paragraphs: ['No vendemos tus datos ni los cedemos a terceros para sus propios fines.'],
        },
        {
          heading: '5. Información guardada en tu navegador',
          paragraphs: [
            'El sitio guarda en tu propio navegador dos valores técnicos: tu preferencia de idioma (español o inglés) y una marca de sesión para el comportamiento de desplazamiento de la página. No son cookies, no se usan para identificarte ni para seguimiento, y no se envían a ningún servidor. Podés borrarlos desde la configuración de tu navegador.',
            'Aparte de estos dos valores, el Píxel de Meta puede guardar cookies en tu navegador, como se explica en el punto siguiente.',
          ],
        },
        {
          heading: '6. Píxel de Meta (medición y publicidad)',
          intro: [
            'Este sitio usa el Píxel de Meta y la API de Conversiones de Meta, herramientas de Meta Platforms, Inc., para medir el resultado de nuestra publicidad y para mostrar anuncios a personas que visitaron el sitio.',
            'El Píxel funciona en tu navegador y puede guardar cookies propias de Meta (por ejemplo, _fbp). La API de Conversiones envía información a Meta desde nuestro servidor cuando hacés una acción importante, como hacer clic en el botón de WhatsApp. En ambos casos, Meta puede recibir información como:',
          ],
          bullets: [
            'tu dirección IP y datos de tu navegador y dispositivo;',
            'los identificadores de las cookies de Meta (_fbp y _fbc), si existen;',
            'las páginas que visitás en el sitio;',
            'acciones como hacer clic en el botón de WhatsApp.',
          ],
        },
        {
          heading: '7. Cómo limitar el seguimiento de Meta',
          paragraphs: [
            'Meta trata esa información según su propia política de privacidad. Podés limitar los anuncios personalizados desde la configuración de anuncios de tu cuenta de Facebook o Instagram, borrar o bloquear las cookies desde tu navegador, o usar un bloqueador de rastreadores. El sitio funciona igual si lo hacés.',
          ],
        },
        {
          heading: '8. Proveedores que intervienen',
          bullets: [
            'Vercel, que aloja el sitio.',
            'Meta Platforms, Inc., por el Píxel de Meta y la API de Conversiones, y por WhatsApp si decidís enviarnos tu consulta por ese medio.',
          ],
          paragraphs: [
            'Estos proveedores pueden estar ubicados fuera de Argentina, por lo que tus datos podrían tratarse en otros países.',
          ],
        },
        {
          heading: '9. Cuánto tiempo conservamos tus datos',
          paragraphs: [
            'Conservamos tu consulta el tiempo necesario para atenderla y, si hay relación comercial, mientras esta dure y durante los plazos que exijan las obligaciones legales aplicables.',
            'Los datos que Meta recibe a través del Píxel y la API de Conversiones se conservan según los plazos de la propia Meta.',
          ],
        },
        {
          heading: '10. Tus derechos',
          paragraphs: [
            `Conforme a la Ley 25.326 de Protección de los Datos Personales, tenés derecho a acceder a tus datos, y a solicitar su rectificación, actualización o supresión. Para ejercerlos, escribinos a ${LEGAL.email} indicando qué necesitás. Responderemos dentro de los plazos legales.`,
            'Respecto de los datos que Meta recibe a través del Píxel y la API de Conversiones, también podés ejercer tus derechos ante Meta desde su configuración de privacidad.',
            'La Agencia de Acceso a la Información Pública (AAIP), en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos de quienes consideren afectados sus derechos por el incumplimiento de las normas de protección de datos personales.',
          ],
        },
        {
          heading: '11. Cambios en esta política',
          paragraphs: [
            'Si el sitio suma nuevas herramientas (por ejemplo, analítica u otras herramientas de publicidad), actualizaremos esta política antes de activarlas y cambiaremos la fecha de arriba.',
          ],
        },
      ] as Section[],
    };
  }

  return {
    back: '← Back to home',
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    note: 'Courtesy translation. In case of discrepancy, the Spanish version prevails.',
    sections: [
      {
        heading: '1. Who is responsible',
        paragraphs: [
          `The data controller for your personal data is ${LEGAL.name}, based in Córdoba, Argentina, owner of aconcagua-digital.com ("Aconcagua Digital").`,
          `You can reach us at ${LEGAL.email} or via WhatsApp.`,
        ],
      },
      {
        heading: '2. What data we collect',
        bullets: [
          'Data you send us: your name, company and the message you write in the contact form.',
          'Technical data: the platform hosting the site may log your IP address, browser type and access date in server logs, for security and operational purposes.',
          'Browsing data for measurement and advertising: through the Meta Pixel and Meta Conversions API (see section 6), such as the pages you visit and whether you click the WhatsApp button.',
        ],
        paragraphs: [
          'The site does not use its own analytics tools. The only advertising tracking tools are the Meta Pixel and the Meta Conversions API, explained in section 6.',
        ],
      },
      {
        heading: '3. How the contact form works',
        paragraphs: [
          'The form does not store what you write on our servers. It prepares a message that opens in WhatsApp, and it is only sent if you send it from there. From that point, the message is also subject to WhatsApp\'s terms and privacy policy.',
          'We do not send the content of the messages you write in the form to Meta, neither from the Pixel nor from our server.',
        ],
      },
      {
        heading: '4. What we use your data for',
        bullets: [
          'To answer your inquiry.',
          'To prepare quotes and maintain the business relationship if we move forward with a project.',
          'To measure the results of our advertising campaigns on Meta and to show ads to people who visited the site.',
        ],
        paragraphs: ['We do not sell your data or share it with third parties for their own purposes.'],
      },
      {
        heading: '5. Information stored in your browser',
        paragraphs: [
          'The site stores two technical values in your own browser: your language preference (Spanish or English) and a session flag used for page scroll behavior. They are not cookies, are not used to identify you or for tracking, and are not sent to any server. You can delete them from your browser settings.',
          'Apart from these two values, the Meta Pixel may store cookies in your browser, as explained in the next section.',
        ],
      },
      {
        heading: '6. Meta Pixel (measurement and advertising)',
        intro: [
          'This site uses the Meta Pixel and the Meta Conversions API, tools from Meta Platforms, Inc., to measure the results of our advertising and to show ads to people who visited the site.',
          'The Pixel runs in your browser and may store Meta cookies (for example, _fbp). The Conversions API sends information to Meta from our server when you take an important action, such as clicking the WhatsApp button. In both cases, Meta may receive information such as:',
        ],
        bullets: [
          'your IP address and data about your browser and device;',
          'the identifiers of Meta cookies (_fbp and _fbc), if they exist;',
          'the pages you visit on the site;',
          'actions such as clicking the WhatsApp button.',
        ],
      },
      {
        heading: '7. How to limit Meta tracking',
        paragraphs: [
          'Meta processes this information under its own privacy policy. You can limit personalized ads from the ad settings of your Facebook or Instagram account, delete or block cookies in your browser, or use a tracker blocker. The site works the same if you do.',
        ],
      },
      {
        heading: '8. Providers involved',
        bullets: [
          'Vercel, which hosts the site.',
          'Meta Platforms, Inc., for the Meta Pixel and the Conversions API, and for WhatsApp if you choose to contact us through it.',
        ],
        paragraphs: [
          'These providers may be located outside Argentina, so your data may be processed in other countries.',
        ],
      },
      {
        heading: '9. How long we keep your data',
        paragraphs: [
          'We keep your inquiry for as long as needed to handle it and, if a business relationship follows, for as long as it lasts and for the periods required by applicable legal obligations.',
          'Data that Meta receives through the Pixel and the Conversions API is kept according to Meta\'s own retention periods.',
        ],
      },
      {
        heading: '10. Your rights',
        paragraphs: [
          `Under Argentine Law 25,326 on Personal Data Protection, you have the right to access your data and to request its correction, update or deletion. To exercise them, write to ${LEGAL.email} stating what you need. We will respond within the legal deadlines.`,
          'Regarding data that Meta receives through the Pixel and the Conversions API, you can also exercise your rights with Meta from its privacy settings.',
          'The Agency for Access to Public Information (AAIP), as the supervisory authority of Law 25,326, is empowered to handle complaints from those who consider their rights affected by non-compliance with personal data protection rules.',
        ],
      },
      {
        heading: '11. Changes to this policy',
        paragraphs: [
          'If the site adds new tools (for example, analytics or other advertising tools), we will update this policy before enabling them and change the date above.',
        ],
      },
    ] as Section[],
  };
}

export default function Privacidad() {
  const [locale, setLocale] = useState<'es' | 'en'>('es');

  // Misma lógica que la página principal: lee el idioma que ya eligió la persona.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aconcagua-lang');
      if (saved === 'es' || saved === 'en') {
        setLocale(saved);
      } else if (!navigator.language.toLowerCase().startsWith('es')) {
        setLocale('en');
      }
    } catch {
      /* si el navegador bloquea localStorage, queda en español */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function toggleLocale() {
    const next = locale === 'es' ? 'en' : 'es';
    setLocale(next);
    try {
      localStorage.setItem('aconcagua-lang', next);
    } catch {
      /* sin persistencia, pero el cambio se ve igual */
    }
  }

  const c = getContent(locale);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white font-sans px-4 py-16 md:py-24">
      <Head>
        <title>{`${c.title} | Aconcagua Digital`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`${c.title} — Aconcagua Digital`} />
        <link rel="canonical" href="https://aconcagua-digital.com/privacidad" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-12">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            {c.back}
          </Link>
          <button
            onClick={toggleLocale}
            className="text-xs font-bold tracking-widest text-gray-400 hover:text-white border border-white/10 rounded-full px-3 py-1.5 transition-colors"
            aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{c.title}</h1>
        <div className="h-1 w-20 bg-white rounded-full mb-4"></div>
        <p className="text-sm text-gray-500">
          {c.updatedLabel}: {LEGAL.updated[locale]}
        </p>
        {c.note && <p className="mt-2 text-xs text-gray-600">{c.note}</p>}

        {c.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-bold text-white mb-3">{section.heading}</h2>
            {section.intro?.map((p) => (
              <p key={p} className="text-gray-400 leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 text-gray-400 leading-relaxed mb-3">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {section.paragraphs?.map((p) => (
              <p key={p} className="text-gray-400 leading-relaxed mb-3">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
