import { PrismaClient, ServiceType, LeadSource, LeadStatus, EventType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // ── Limpiar datos previos ──────────────────────────────
  await prisma.eventLog.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.admin.deleteMany();

  // ── Admin por defecto ─────────────────────────────────
  await prisma.admin.create({
    data: {
      email: 'admin@techmype.pe',
      passwordHash: 'change-me-in-production',
    },
  });

  // ── 5 Leads de prueba ─────────────────────────────────
  const leads = [
    {
      nombreContacto: 'Pedro García',
      nombreNegocio: 'Bodega Don Pepe',
      telefonoWhatsApp: '51987654321',
      ciudad: 'Lima',
      servicioInteres: ServiceType.POS_VENTAS,
      origen: LeadSource.ORGANIC,
      estado: LeadStatus.NUEVO,
      notasAdmin: 'Interesado en el plan básico. Tiene bodega mediana.',
    },
    {
      nombreContacto: 'María Torres',
      nombreNegocio: 'Ferretería Los Andes',
      telefonoWhatsApp: '51976543210',
      ciudad: 'Huánuco',
      servicioInteres: ServiceType.POS_VENTAS,
      origen: LeadSource.REFERRAL,
      estado: LeadStatus.CONTACTADO,
      notasAdmin: 'Referido de otro cliente. Necesita 2 terminales.',
    },
    {
      nombreContacto: 'Carlos Soto',
      nombreNegocio: "Ropa Moderna D'Moda",
      telefonoWhatsApp: '51965432109',
      ciudad: 'Lima',
      servicioInteres: ServiceType.ECOMMERCE,
      origen: LeadSource.FACEBOOK_AD,
      estado: LeadStatus.EN_NEGOCIACION,
      notasAdmin: 'Tiene catálogo de 50 productos. Quiere tienda online.',
    },
    {
      nombreContacto: 'Ana Ramírez',
      nombreNegocio: 'Distribuidora Norteña',
      telefonoWhatsApp: '51954321098',
      ciudad: 'Chiclayo',
      servicioInteres: ServiceType.SAAS_MEDIDA,
      origen: LeadSource.GOOGLE_AD,
      estado: LeadStatus.CERRADO_GANADO,
      planSeleccionado: 'Plan Negocio',
      notasAdmin: 'Cliente activo desde enero 2026. Facturación mensual.',
    },
    {
      nombreContacto: 'Luis Flores',
      nombreNegocio: 'Consultora Flores & Asociados',
      telefonoWhatsApp: '51943210987',
      ciudad: 'Lima',
      servicioInteres: ServiceType.WEB_CORPORATIVA,
      origen: LeadSource.DIRECT,
      estado: LeadStatus.CERRADO_PERDIDO,
      notasAdmin: 'Buscaba algo muy personalizado. Presupuesto muy bajo.',
    },
  ];

  for (const lead of leads) {
    await prisma.lead.create({ data: lead });
  }
  console.log('✅ 5 leads creados');

  // ── 50 EventLogs distribuidos en el último mes ─────────
  const now = new Date();
  const eventTypes = [EventType.DEMO_CLICK, EventType.WHATSAPP_CLICK, EventType.PRICING_VIEW];
  const targets = [
    'POS_Ventas',
    'Catalogo_WhatsApp',
    'Dashboard_Demo',
    'CashFlow_Demo',
    'Hero_Main_Button',
    'Pricing_CTA',
    'Hero_Demo_Button',
  ];

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);

    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const target = targets[Math.floor(Math.random() * targets.length)];

    await prisma.eventLog.create({
      data: {
        eventType,
        target,
        metadata: { device: i % 2 === 0 ? 'mobile' : 'desktop' },
        createdAt: date,
      },
    });
  }
  console.log('✅ 50 eventos de analítica creados');

  console.log('🎉 Seed completado con éxito');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
