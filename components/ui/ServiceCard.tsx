'use client';

import { motion } from 'framer-motion';
import type { ServiceData } from '@/types';

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-white border border-[var(--border-default)] rounded-xl p-6 md:p-8 
        hover:border-emerald-200 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 
        transition-all duration-200 group
        ${service.size === 'large' ? 'md:col-span-2' : ''}`}
    >
      {/* Tag */}
      <span
        className={`absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full ${service.tagColor}`}
      >
        {service.tag}
      </span>

      {/* Icon */}
      <div
        className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center text-2xl mb-4`}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
            <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contacto"
        className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm hover:underline group-hover:gap-2 transition-all duration-200"
      >
        {service.cta}
        <span>&rarr;</span>
      </a>
    </motion.div>
  );
}
