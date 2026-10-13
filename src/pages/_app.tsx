import './globals.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';

// IDs de medición. No son datos secretos: se ven en el código de cualquier sitio que los use.
const META_PIXEL_ID = '1423015095887252';
const GA_ID = 'G-8S5B7RJM15';

// Solo se activa en el sitio publicado, así tus pruebas con `npm run dev`
// no ensucian los datos del pixel ni de Google Analytics.
const MEDICION_ACTIVA = process.env.NODE_ENV === 'production';

// Los archivos de Meta (fbevents.js) y de Google (gtag.js) pesan y frenaban la velocidad
// del sitio en celular (PageSpeed). Por eso NO se descargan apenas abre la página:
// se descargan cuando la persona hace algo (mueve el mouse, toca la pantalla,
// aprieta una tecla o usa la rueda).
// Ventajas: la página carga rápido y además no se cuentan visitas de robots.
// Costo: una visita que entra y se va sin tocar nada no queda registrada.
// (El scroll solo no cuenta, para que las herramientas de medición no lo activen sin querer.)
const EVENTOS_DE_USO = ['pointerdown', 'touchstart', 'keydown', 'wheel', 'mousemove'] as const;

export default function App({ Component, pageProps }: AppProps) {
  const [descargarMedicion, setDescargarMedicion] = useState(false);

  useEffect(() => {
    if (!MEDICION_ACTIVA) return;

    const activar = () => {
      setDescargarMedicion(true);
      EVENTOS_DE_USO.forEach((e) => window.removeEventListener(e, activar));
    };

    EVENTOS_DE_USO.forEach((e) => window.addEventListener(e, activar, { passive: true }));
    return () => EVENTOS_DE_USO.forEach((e) => window.removeEventListener(e, activar));
  }, []);

  return (
    <>
      <Component {...pageProps} />

      {MEDICION_ACTIVA && (
        <>
          {/* Paso 1 (siempre): deja armadas las "colas" de Meta y de Google. No descargan nada
              ni frenan la página. Así, si alguien toca WhatsApp como primera acción,
              el evento queda anotado igual. */}
          <Script id="meta-pixel-cola" strategy="afterInteractive">
            {`
              !function(f,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[]}(window);
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <Script id="ga-cola" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>

          {/* Paso 2 (solo cuando la persona interactúa): descarga los archivos de Meta y de Google,
              que leen la cola y envían todo lo anotado. */}
          {descargarMedicion && (
            <>
              <Script
                id="meta-pixel-js"
                src="https://connect.facebook.net/en_US/fbevents.js"
                strategy="afterInteractive"
              />
              <Script
                id="ga-js"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
