'use client';

import { motion } from 'framer-motion';
import type { PlanData } from '@/types';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface PricingCardProps {
  plan: PlanData;
  isAnnual: boolean;
  index: number;
}

export default function PricingCard({ plan, isAnnual, index }: PricingCardProps) {
  const price = isAnnual ? plan.price.annual : plan.price.monthly;
  const originalPrice = plan.price.monthly;
  const isCustom = plan.price.monthly === 0;
  const isDark = plan.highlighted;

  const handleCta = () => {
    window.open(buildWhatsAppUrl(plan.whatsappPlan), '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-200
        ${isDark
          ? 'bg-[var(--bg-dark)] text-white ring-2 ring-emerald-500 scale-[1.02]'
          : 'bg-white border border-[var(--border-default)] hover:shadow-[var(--shadow-hover)]'
        }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
          {plan.badge}
        </span>
      )}

      {/* Emoji & Name */}
      <div className="mb-4">
        <span className="text-3xl">{plan.emoji}</span>
        <h3 className={`text-xl font-semibold mt-2 ${isDark ? 'text-white' : 'text-[var(--text-primary)]'}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-[var(--text-secondary)]'}`}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {isCustom ? (
          <span className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            {plan.priceLabel}
          </span>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-medium align-top mt-1 ${isDark ? 'text-zinc-400' : 'text-[var(--text-secondary)]'}`}>
              S/
            </span>
            <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[var(--text-primary)]'}`}>
              {price}
            </span>
            <span className={`text-sm ${isDark ? 'text-zinc-400' : 'text-[var(--text-muted)]'}`}>
              /mes
            </span>
            {isAnnual && !isCustom && (
              <span className={`text-sm line-through ml-2 ${isDark ? 'text-zinc-500' : 'text-[var(--text-muted)]'}`}>
                S/{originalPrice}
              </span>
            )}
          </div>
        )}
        {isAnnual && !isCustom && (
          <span className="inline-block mt-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Ahorra 2 meses
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className={`flex items-start gap-2 text-sm ${isDark ? 'text-zinc-300' : 'text-[var(--text-primary)]'}`}>
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            {feature}
          </li>
        ))}
        {plan.notIncluded.map((feature) => (
          <li key={feature} className={`flex items-start gap-2 text-sm ${isDark ? 'text-zinc-600' : 'text-[var(--text-muted)]'}`}>
            <span className="mt-0.5 flex-shrink-0">✗</span>
            <span className="line-through">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCta}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200
          ${isDark
            ? 'bg-emerald-500 text-white hover:bg-emerald-400'
            : 'border border-emerald-600 text-emerald-600 hover:bg-emerald-50'
          }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}
