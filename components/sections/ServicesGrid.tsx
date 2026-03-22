'use client';

import { motion } from 'framer-motion';
import ServiceCard from '@/components/ui/ServiceCard';
import type { ServiceData } from '@/types';

const services: ServiceData[] = [
  {
    id: 'pos',
    icon: '🏪',
    iconBg: 'bg-emerald-50',
    tag: 'Más solicitado',
    tagColor: 'bg-emerald-100 text-emerald-800',
    title: 'Sistema de Ventas y POS',
    description: 'Controla tu stock, caja y ventas desde tu celular o PC. Olvídate del cuaderno y evita pérdidas.',
    features: [
      'Control de inventario en tiempo real',
      'Reportes de ventas diarios',
      'Compatible con impresora térmica',
      'Facturación electrónica SUNAT',
    ],
    cta: 'Ver demo',
    size: 'large',
    visual: 'pos-mockup',
  },
  {
    id: 'ecommerce',
    icon: '🛍️',
    iconBg: 'bg-blue-50',
    tag: 'Nuevo',
    tagColor: 'bg-blue-100 text-blue-800',
    title: 'E-commerce para MYPES',
    description: 'Tu tienda abierta las 24 horas. Recibe pedidos por WhatsApp y acepta pagos con Yape, Plin o tarjetas.',
    features: [
      'Integración con Yape y Plin',
      'Catálogo de productos ilimitado',
      'Pedidos directo a WhatsApp',
      'Panel de gestión simple',
    ],
    cta: 'Quiero mi tienda',
    size: 'medium',
  },
  {
    id: 'saas',
    icon: '⚙️',
    iconBg: 'bg-purple-50',
    tag: 'Personalizado',
    tagColor: 'bg-purple-100 text-purple-800',
    title: 'SaaS a Medida',
    description: 'Creamos la herramienta exacta que tu empresa necesita para automatizar procesos y ahorrar dinero.',
    features: [
      'Desarrollo 100% personalizado',
      'Integración con tus sistemas actuales',
      'Mantenimiento incluido',
    ],
    cta: 'Cotizar proyecto',
    size: 'medium',
  },
  {
    id: 'web',
    icon: '🌐',
    iconBg: 'bg-amber-50',
    tag: 'SEO incluido',
    tagColor: 'bg-amber-100 text-amber-800',
    title: 'Presencia Web Pro',
    description: 'Aparece primero en Google cuando busquen tus servicios en tu zona o ciudad.',
    features: [
      'Diseño profesional responsive',
      'SEO local optimizado',
      'Google Business configurado',
    ],
    cta: 'Ver ejemplos',
    size: 'medium',
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-24 md:py-32">
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
            Todo lo que tu negocio necesita para crecer
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            Soluciones de software diseñadas específicamente para MYPES peruanas.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
