import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { ServiceType, LeadSource } from '@prisma/client';

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().min(2).max(150),
  phone: z.string().regex(/^(\+51|51)?[9][0-9]{8}$/, 'Numero peruano invalido'),
  city: z.enum(['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huanuco', 'Cusco', 'Otra']).optional(),
  serviceInterest: z.enum(['pos', 'ecommerce', 'saas', 'web', 'unknown']),
  message: z.string().max(1000).optional(),
  planSelected: z.string().optional(),
  source: z.enum(['landing_form', 'whatsapp_btn', 'pricing_cta']).default('landing_form'),
});

const SERVICE_MAP = { pos:'POS_VENTAS', ecommerce:'ECOMMERCE', saas:'SAAS_MEDIDA', web:'WEB_CORPORATIVA', unknown:'POS_VENTAS' };
const SOURCE_MAP = { landing_form:'ORGANIC', whatsapp_btn:'DIRECT', pricing_cta:'DIRECT' };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = LeadSchema.parse(body);
    const existing = await prisma.lead.findFirst({ where: { telefonoWhatsApp: data.phone, createdAt: { gte: new Date(Date.now() - 3600_000) } } });
    if (existing) return NextResponse.json({ success: true, message: 'Registro recibido' }, { status: 200 });
    const lead = await prisma.lead.create({ data: { nombreContacto: data.name, nombreNegocio: data.businessName, telefonoWhatsApp: data.phone, ciudad: data.city ?? null, servicioInteres: SERVICE_MAP[data.serviceInterest] as ServiceType, origen: (SOURCE_MAP[data.source] ?? 'ORGANIC') as LeadSource, planSeleccionado: data.planSelected ?? null, notasAdmin: data.message ?? null } });
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ success: false, errors: error.flatten().fieldErrors }, { status: 400 });
    console.error('[API/leads] Error:', error);
    return NextResponse.json({ success: false, message: 'Error interno. Intenta por WhatsApp.' }, { status: 500 });
  }
}
