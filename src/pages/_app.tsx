import './globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

// ID del Píxel de Meta. No es un dato secreto: se ve en el código de cualquier sitio que lo use.
const META_PIXEL_ID = '1423015095887252';

// Solo se activa en el sitio publicado, así tus pruebas con `npm run dev`
// no ensucian los datos del pixel.
const PIXEL_ACTIVO = process.env.NODE_ENV === 'production';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      {PIXEL_ACTIVO && (
        // lazyOnload: se carga cuando el navegador ya terminó de mostrar la página,
        // para no bajar la velocidad (PageSpeed).
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
