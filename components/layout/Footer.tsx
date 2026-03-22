import { buildWhatsAppUrl } from '@/lib/whatsapp';

const serviceLinks = [
  { label: 'Sistema POS', href: '#servicios' },
  { label: 'E-commerce', href: '#servicios' },
  { label: 'SaaS a Medida', href: '#servicios' },
  { label: 'Presencia Web', href: '#servicios' },
];

const companyLinks = [
  { label: 'Sobre nosotros', href: '#' },
  { label: 'Blog (próximamente)', href: '#' },
  { label: 'Términos y privacidad', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-zinc-400">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <a href="#" className="flex items-center gap-2 text-lg font-bold text-white mb-3">
              <span className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </span>
              TechMYPE
            </a>
            <p className="text-sm leading-relaxed text-zinc-400">
              Software peruano para negocios peruanos.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  WhatsApp: +51 999 999 999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span className="text-zinc-400">hola@techmype.pe</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-zinc-400">Lima, Perú (servicio nacional)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            © 2025 TechMYPE. Todos los derechos reservados. RUC: XXXXXXXXXX | Hecho con ❤️ en Perú
          </p>
          <div className="flex gap-4 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
