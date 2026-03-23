'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, LayoutDashboard, Smartphone, Wallet } from 'lucide-react';
import DemoCard from '@/components/ui/DemoCard';

/* ── Mini-Preview Components ── */

function POSPreview() {
  return (
    <div className="space-y-2">
      {[
        { name: 'Arroz 1kg', stock: 12, color: 'text-emerald-600 bg-emerald-50' },
        { name: 'Aceite 1L', stock: 5, color: 'text-amber-600 bg-amber-50' },
        { name: 'Fideos', stock: 20, color: 'text-emerald-600 bg-emerald-50' },
      ].map((item) => (
        <div key={item.name} className="flex items-center justify-between text-xs">
          <span className="text-zinc-600">{item.name}</span>
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${item.color}`}>
              Stock: {item.stock}
            </span>
          </div>
        </div>
      ))}
      <div className="pt-1.5">
        <div className="w-full h-7 bg-emerald-600 rounded-md flex items-center justify-center">
          <span className="text-white text-[10px] font-medium">Vender</span>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[40, 55, 35, 65, 50].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-12">
            <div
              className={`w-full rounded-t ${i === 3 ? 'bg-violet-500' : 'bg-zinc-200'}`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-400">Ganancia Total</span>
        <span className="text-xs font-bold text-zinc-800">S/ 4,500.00</span>
      </div>
    </div>
  );
}

function CatalogPreview() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: 'Polo', price: 'S/ 45' },
        { name: 'Mochila', price: 'S/ 65' },
      ].map((item) => (
        <div key={item.name} className="bg-white rounded-lg border border-zinc-100 p-2">
          <div className="w-full h-6 bg-zinc-100 rounded mb-1.5" />
          <p className="text-[10px] text-zinc-600">{item.name}</p>
          <p className="text-[10px] font-bold text-zinc-800">{item.price}</p>
          <div className="w-full h-5 bg-[#25D366] rounded mt-1 flex items-center justify-center">
            <span className="text-white text-[8px] font-medium">WhatsApp</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CashFlowPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-zinc-600">Alquiler</span>
        </div>
        <span className="text-red-500 font-medium">-S/ 800</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-600">Venta: Cliente</span>
        </div>
        <span className="text-emerald-600 font-medium">+S/ 120</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-600">Venta: Lunes</span>
        </div>
        <span className="text-emerald-600 font-medium">+S/ 450</span>
      </div>
    </div>
  );
}

/* ── Main Section ── */

const demos = [
  {
    id: 'pos' as const,
    icon: ShoppingCart,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    badge: 'Popular',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    title: 'Sistema de Ventas (POS)',
    description: 'Controla tu inventario y vende en segundos. Olvida el cuaderno, emite tickets y evita pérdidas de mercadería.',
    preview: <POSPreview />,
    cta: 'Probar POS →',
  },
  {
    id: 'dashboard' as const,
    icon: LayoutDashboard,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    badge: 'Nuevo',
    badgeColor: 'bg-violet-100 text-violet-700',
    title: 'Dashboard Empresarial',
    description: 'Toma decisiones con datos reales. Visualiza tus ganancias diarias, semanales y mensuales de forma automática.',
    preview: <DashboardPreview />,
    cta: 'Ver Reportes →',
  },
  {
    id: 'catalog' as const,
    icon: Smartphone,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    badge: 'WhatsApp',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    title: 'Catálogo WhatsApp Pro',
    description: 'Tu tienda abierta 24/7. Permite que tus clientes elijan sus productos y te envíen el pedido directo a tu WhatsApp.',
    preview: <CatalogPreview />,
    cta: 'Ver Tienda Demo →',
  },
  {
    id: 'cashflow' as const,
    icon: Wallet,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    badge: 'Finanzas',
    badgeColor: 'bg-amber-100 text-amber-700',
    title: 'Gestor de Flujo de Caja',
    description: 'Domina tus finanzas. Registra ingresos y egresos para saber exactamente cuánto dinero tienes en tu negocio.',
    preview: <CashFlowPreview />,
    cta: 'Gestionar Caja →',
  },
];

export default function DemoHub() {
  return (
    <section id="demos" className="py-24 md:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
            🚀 Prueba gratis, sin registro
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Demos interactivas — pruébalas ahora mismo
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Haz clic en cualquier demo para ver cómo funcionaría tu software. 
            Sin login, sin descargas, 100% en tu navegador.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {demos.map((demo, index) => (
            <DemoCard key={demo.id} {...demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
