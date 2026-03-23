'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '@/components/ui/PricingCard';
import type { PlanData } from '@/types';

const plans: PlanData[] = [
  {
    id: 'emprendedor',
    name: 'Plan Emprendedor',
    emoji: '🌱',
    price: { monthly: 99, annual: 79 },
    description: 'Perfecto para negocios que recién empiezan a digitalizarse.',
    features: [
      'Sistema POS básico',
      'Hasta 500 productos en inventario',
      'Reportes diarios y semanales',
      'Soporte por WhatsApp (Lun-Sab)',
      '1 usuario',
    ],
    notIncluded: ['E-commerce', 'Facturación electrónica SUNAT'],
    cta: 'Empezar ahora',
    whatsappPlan: 'Emprendedor',
    highlighted: false,
  },
  {
    id: 'negocio',
    name: 'Plan Negocio',
    emoji: '🏢',
    price: { monthly: 249, annual: 199 },
    description: 'Para negocios en crecimiento que necesitan más control y ventas online.',
    features: [
      'Sistema POS completo',
      'Inventario ilimitado',
      'Tienda e-commerce incluida',
      'Integración Yape, Plin y tarjetas',
      'Facturación electrónica SUNAT',
      'Reportes avanzados',
      'Hasta 5 usuarios',
      'Soporte prioritario 7 días',
    ],
    notIncluded: [],
    cta: 'Elegir Plan Negocio',
    whatsappPlan: 'Negocio',
    highlighted: true,
    badge: 'Más popular',
  },
  {
    id: 'corporativo',
    name: 'Plan Corporativo',
    emoji: '🏗️',
    price: { monthly: 0, annual: 0 },
    priceLabel: 'A consultar',
    description: 'Solución a medida para empresas con procesos específicos.',
    features: [
      'Todo lo del Plan Negocio',
      'Desarrollo de módulos a medida',
      'Integración con ERP/CRM existente',
      'Usuarios ilimitados',
      'Servidor dedicado',
      'SLA de soporte garantizado',
      'Gerente de cuenta asignado',
    ],
    notIncluded: [],
    cta: 'Solicitar cotización',
    whatsappPlan: 'Corporativo',
    highlighted: false,
  },
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="precios" className="py-24 md:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Planes diseñados para crecer contigo
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-4">
            Sin sorpresas. Precio fijo en Soles. Cancela cuando quieras.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span
            className={`text-sm font-medium transition-colors ${
              !isAnnual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
            }`}
          >
            Mensual
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-emerald-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle billing period"
          >
            <motion.div
              layout
              className="absolute top-1 w-5 h-5 bg-emerald-600 rounded-full"
              animate={{ left: isAnnual ? '32px' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${
              isAnnual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
            }`}
          >
            Anual
          </span>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full"
            >
              Ahorra 2 meses
            </motion.span>
          )}
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
