import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel Administrativo | TechMYPE',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-zinc-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}
