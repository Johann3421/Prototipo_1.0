import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://techmype.pe'),
  title: {
    default: 'Sistemas de Ventas y Software para MYPES en Perú | TechMYPE',
    template: '%s | TechMYPE',
  },
  description:
    'Software de ventas (POS), tiendas online y desarrollo a medida para MYPES en Perú. ' +
    'Tecnología peruana desde Huánuco para todo el país. Facturación electrónica SUNAT incluida.',
  keywords: [
    'Software para MYPES Perú',
    'Sistema de ventas Lima',
    'Sistema POS ferreterías Perú',
    'Desarrollo de software para pequeñas empresas',
    'Facturación electrónica Perú',
    'POS para bodegas Perú',
    'Tienda online para pymes Lima',
    'Software punto de venta Perú',
    'E-commerce para negocios Lima',
    'Sistema de inventario pequeña empresa',
    'Software MYPE Huánuco',
  ],
  authors: [{ name: 'Johann Abad — TechMYPE', url: 'https://techmype.pe' }],
  creator: 'TechMYPE',
  publisher: 'TechMYPE',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://techmype.pe',
    siteName: 'TechMYPE',
    title: 'Sistemas de Ventas y Software para MYPES en Perú | TechMYPE',
    description:
      'Sistema POS, tienda online y software a medida. Para dueños de negocios que no tienen tiempo que perder.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TechMYPE - Software para MYPES Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistemas de Ventas y Software para MYPES en Perú | TechMYPE',
    description:
      'Sistema POS, tienda online y software a medida para pequeños negocios.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
  },
  alternates: {
    canonical: 'https://techmype.pe',
  },
  other: {
    'geo.region': 'PE-HUC',
    'geo.placename': 'Huánuco, Perú',
    'geo.position': '-9.9306;-76.2422',
    ICBM: '-9.9306, -76.2422',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
