'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import type { MetricData, TestimonialData } from '@/types';

const metrics: MetricData[] = [
  { value: 150, suffix: '+', label: 'Negocios en Perú' },
  { value: 98, suffix: '%', label: 'Clientes satisfechos' },
  { value: 3, suffix: ' días', label: 'Para tener tu sistema activo' },
  { value: 24, suffix: '/7', label: 'Soporte técnico' },
];

const testimonials: TestimonialData[] = [
  {
    quote: 'Antes anotaba todo en un cuaderno y siempre había errores. Ahora cierro mi caja en 2 minutos.',
    author: 'María Quispe',
    role: 'Dueña de bodega, Lima Norte',
    avatar: 'MQ',
    stars: 5,
  },
  {
    quote: 'Mi tienda online recibe pedidos incluso cuando duermo. Los clientes pagan con Yape sin problemas.',
    author: 'Carlos Huanca',
    role: 'Comerciante textil, Gamarra',
    avatar: 'CH',
    stars: 5,
  },
  {
    quote: 'El sistema de POS es muy fácil. Mis empleados lo aprendieron en un día, sin necesidad de capacitación.',
    author: 'Rosa Mamani',
    role: 'Restaurante, Arequipa',
    avatar: 'RM',
    stars: 5,
  },
];

const cities = ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huánuco', 'Cusco'];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Metrics Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric) => (
            <AnimatedCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-center text-[var(--text-primary)] max-w-3xl mx-auto mb-8"
        >
          Más de <span className="text-[var(--brand-primary)]">150</span> negocios
          en Perú ya confían en nosotros para su transformación digital.
        </motion.p>

        {/* Cities */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {cities.map((city, i) => (
            <span key={city} className="flex items-center gap-3">
              <span className="bg-zinc-100 text-zinc-600 text-sm px-3 py-1 rounded-full">
                {city}
              </span>
              {i < cities.length - 1 && (
                <span className="text-zinc-300 hidden sm:inline">·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-[var(--border-default)] rounded-xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--text-primary)] text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
