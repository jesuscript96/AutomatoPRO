import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/layout/SmoothScroll';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

// Configurar fuentes Zodiak con diferentes pesos
const zodiakThin = localFont({
  src: './fonts/Zodiak-Thin.woff2',
  variable: '--font-zodiak-thin',
  display: 'swap',
  weight: '100',
});

const zodiakLight = localFont({
  src: './fonts/Zodiak-Light.woff2',
  variable: '--font-zodiak-light',
  display: 'swap',
  weight: '300',
});

const zodiakRegular = localFont({
  src: './fonts/Zodiak-Regular.woff2',
  variable: '--font-zodiak-regular',
  display: 'swap',
  weight: '400',
});

const zodiakBold = localFont({
  src: './fonts/Zodiak-Bold.woff2',
  variable: '--font-zodiak-bold',
  display: 'swap',
  weight: '700',
});

const zodiakExtrabold = localFont({
  src: './fonts/Zodiak-Extrabold.woff2',
  variable: '--font-zodiak-extrabold',
  display: 'swap',
  weight: '800',
});

const zodiakBlack = localFont({
  src: './fonts/Zodiak-Black.woff2',
  variable: '--font-zodiak-black',
  display: 'swap',
  weight: '900',
});

export const metadata: Metadata = {
  title: 'Storytelling | Personalización 100% para Marcas con Personalidad',
  description:
    'Creamos experiencias web únicas que cuentan tu historia. Personalización 100% para marcas con personalidad que quieren dejar huella con su storytelling.',
  icons: {
    icon: '/tabdub.png',
    shortcut: '/tabdub.png',
    apple: '/tabdub.png',
  },
  openGraph: {
    title: 'Storytelling | Personalización 100% para Marcas con Personalidad',
    description:
      'Creamos experiencias web únicas que cuentan tu historia. Personalización 100% para marcas con personalidad que quieren dejar huella con su storytelling.',
    images: [
      {
        url: '/logotab.png',
        width: 1200,
        height: 630,
        alt: 'AutomatoPRO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storytelling | Personalización 100% para Marcas con Personalidad',
    description:
      'Creamos experiencias web únicas que cuentan tu historia. Personalización 100% para marcas con personalidad que quieren dejar huella con su storytelling.',
    images: ['/logotab.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${zodiakThin.variable} ${zodiakLight.variable} ${zodiakRegular.variable} ${zodiakBold.variable} ${zodiakExtrabold.variable} ${zodiakBlack.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=GTM-NJRP67W3'+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NJRP67W3');
          `,
          }}
        />
      </head>

      <body className="antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJRP67W3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <SmoothScroll />
        <Header />

        <main className="min-h-screen">{children}</main>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
