import './globals.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';

// ID del Píxel de Meta. No es un dato secreto: se ve en el código de cualquier sitio que lo use.
const META_PIXEL_ID = '1423015095887252';

// Solo se activa en el sitio publicado, así tus pruebas con `npm run dev`
// no ensucian los datos del pixel.
const PIXEL_ACTIVO = process.env.NODE_ENV === 'production';

// El archivo de Meta (fbevents.js) pesa y frenaba la velocidad del sitio en celular (PageSpeed).
// Por eso NO se descarga apenas abre la página: se descarga cuando la persona hace
// algo (mueve el mouse, toca la pantalla, aprieta una tecla o usa la rueda).
// Ventajas: la página carga rápido y además no se cuentan visitas de robots.
// Costo: una visita que entra y se va sin tocar nada no queda registrada.
// (El scroll solo no cuenta, para que las herramientas de medición no lo activen sin querer.)
const EVENTOS_DE_USO = ['pointerdown', 'touchstart', 'keydown', 'wheel', 'mousemove'] as const;

export default function App({ Component, pageProps }: AppProps) {
  const [descargarPixel, setDescargarPixel] = useState(false);

  useEffect(() => {
    if (!PIXEL_ACTIVO) return;

    const activar = () => {
      setDescargarPixel(true);
      EVENTOS_DE_USO.forEach((e) => window.removeEventListener(e, activar));
    };

    EVENTOS_DE_USO.forEach((e) => window.addEventListener(e, activar, { passive: true }));
    return () => EVENTOS_DE_USO.forEach((e) => window.removeEventListener(e, activar));
  }, []);

  return (
    <>
      <Component {...pageProps} />

      {PIXEL_ACTIVO && (
        <>
          {/* Paso 1 (siempre): deja armada la "cola" de Meta. No descarga nada ni frena la página.
              Así, si alguien toca WhatsApp como primera acción, el evento queda anotado igual. */}
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

          {/* Paso 2 (solo cuando la persona interactúa): descarga el archivo de Meta,
              que lee la cola y envía todo lo anotado. */}
          {descargarPixel && (
            <Script
              id="meta-pixel-js"
              src="https://connect.facebook.net/en_US/fbevents.js"
              strategy="afterInteractive"
            />
          )}
        </>
      )}
    </>
  );
}