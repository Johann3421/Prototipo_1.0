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
    default: 'TechMYPE | Software para MYPES Perú — POS, E-commerce y Más',
    template: '%s | TechMYPE',
  },
  description:
    'Software de ventas (POS), tiendas online y desarrollo a medida para MYPES en Perú. ' +
    'Tecnología peruana que entiende tu negocio. Facturación electrónica SUNAT incluida.',
  keywords: [
    'Software para MYPES Perú',
    'Sistema de ventas Lima',
    'Desarrollo de software para pequeñas empresas',
    'Facturación electrónica Perú',
    'POS para bodegas Perú',
    'Tienda online para pymes Lima',
    'Software punto de venta Perú',
    'E-commerce para negocios Lima',
    'Sistema de inventario pequeña empresa',
    'Software contable MYPES Perú',
  ],
  authors: [{ name: 'TechMYPE', url: 'https://techmype.pe' }],
  creator: 'TechMYPE',
  publisher: 'TechMYPE',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://techmype.pe',
    siteName: 'TechMYPE',
    title: 'Software para MYPES Perú | Digitaliza tu Negocio',
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
    title: 'Software para MYPES Perú | TechMYPE',
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
    'geo.region': 'PE',
    'geo.placename': 'Lima, Perú',
    'geo.position': '-12.0464;-77.0428',
    ICBM: '-12.0464, -77.0428',
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
