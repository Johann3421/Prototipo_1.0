'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Calculator, Clock, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: ClipboardList,
    title: 'Anotas todo en un cuaderno',
    description: 'Y cuando buscas una venta de la semana pasada... ya no la encuentras.',
  },
  {
    icon: Calculator,
    title: 'No sabes cuánto ganaste hoy',
    description: 'Cierras la caja y sientes que vendiste bien, pero no tienes números reales.',
  },
  {
    icon: Clock,
    title: 'Pierdes horas haciendo cuentas',
    description: 'Entre facturas, stock y cobranzas se te va medio día sin producir.',
  },
  {
    icon: AlertTriangle,
    title: 'Se te pierden productos',
    description: 'Sin control de inventario real, la mercadería desaparece sin explicación.',
  },
];

export default function ProblemsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-4">
            😤 ¿Te suena familiar?
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Sabemos que gestionar tu negocio en papel es difícil
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Miles de dueños de MYPES en Perú enfrentan estos problemas todos los días.
            La buena noticia: tienen solución.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[var(--border-default)] rounded-2xl p-6 
                  hover:border-red-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-red-500" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
