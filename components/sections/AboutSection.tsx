'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-20 md:py-28 bg-zinc-50 border-t border-[var(--border-default)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Photo placeholder */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                <span className="text-white text-8xl font-black select-none">J</span>
              </div>
              {/* Badge flotante */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg border border-zinc-100 px-4 py-3"
              >
                <p className="text-xs text-zinc-500">Operando desde</p>
                <p className="text-sm font-bold text-zinc-900">🇵🇪 Huánuco, Perú</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-4">
              El equipo detrás
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15] mb-5">
              Software de nivel empresarial, accesible para tu negocio local.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              Dirigido por{' '}
              <strong className="text-[var(--text-primary)]">Johann Abad</strong>, especialista
              Técnico en Ingeniería de Software con IA. Operando desde{' '}
              <strong className="text-[var(--text-primary)]">Huánuco para todo el Perú</strong>,
              nuestra misión es que las bodegas, ferreterías y MYPES tengan la misma ventaja
              tecnológica que las grandes cadenas, sin pagar de más.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-4 mb-8">
              <p className="text-[var(--text-secondary)] italic leading-relaxed text-sm md:text-base">
                &ldquo;No te vendemos código; te vendemos <strong className="text-[var(--text-primary)]">tiempo y control</strong>.&rdquo;
              </p>
            </blockquote>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '100%', label: 'Peruano' },
                { value: 'IA', label: 'Integrada' },
                { value: '24h', label: 'Setup' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-white border border-[var(--border-default)]">
                  <p className="text-2xl font-black text-emerald-600">{stat.value}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="/empresa"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Conoce más sobre nosotros
              <span>&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
