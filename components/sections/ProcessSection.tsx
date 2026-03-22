'use client';

import { motion } from 'framer-motion';
import type { StepData } from '@/types';

const steps: StepData[] = [
  {
    number: '01',
    icon: '💬',
    title: 'Nos contactas por WhatsApp',
    description: 'Cuéntanos qué necesitas en 5 minutos. Respondemos el mismo día.',
  },
  {
    number: '02',
    icon: '📋',
    title: 'Recibiste tu propuesta',
    description: 'Te enviamos una propuesta clara con precios en Soles. Sin costos ocultos.',
  },
  {
    number: '03',
    icon: '🚀',
    title: 'Tu sistema está listo',
    description: 'En 3 a 7 días hábiles tu sistema está activo y te capacitamos gratis.',
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            ¿Cómo empezamos a trabajar juntos?
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-4">
            Sin tecnicismos. Sin contratos complicados. Solo resultados.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] border-t-2 border-dashed border-emerald-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Background Number */}
              <span className="text-7xl font-bold text-[var(--border-default)] select-none leading-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mx-auto -mt-4 relative z-10">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-4">
                {step.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-2 max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
