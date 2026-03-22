import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().min(2).max(150),
  phone: z.string().regex(/^(\+51|51)?[9][0-9]{8}$/, 'Número peruano inválido'),
  city: z.enum(['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huánuco', 'Cusco', 'Otra']),
  serviceInterest: z.enum(['pos', 'ecommerce', 'saas', 'web', 'unknown']),
  message: z.string().max(1000).optional(),
  planSelected: z.string().optional(),
  source: z.enum(['landing_form', 'whatsapp_btn', 'pricing_cta']).default('landing_form'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = LeadSchema.parse(body);

    const ip = request.headers.get('x-forwarded-for')
      ?? request.headers.get('x-real-ip')
      ?? null;
    const userAgent = request.headers.get('user-agent') ?? null;

    // Anti-spam: check duplicate phone within 1 hour
    const existing = await query(
      'SELECT id FROM leads WHERE phone = $1 AND created_at > NOW() - INTERVAL \'1 hour\'',
      [data.phone]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Registro recibido' },
        { status: 200 }
      );
    }

    const result = await query<{ id: string }>(
      `INSERT INTO leads
        (name, business_name, phone, city, service_interest, message,
         plan_selected, source, utm_source, utm_medium, utm_campaign,
         ip_address, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id`,
      [
        data.name, data.businessName, data.phone, data.city,
        data.serviceInterest, data.message ?? null,
        data.planSelected ?? null, data.source,
        data.utmSource ?? null, data.utmMedium ?? null,
        data.utmCampaign ?? null, ip, userAgent,
      ]
    );

    return NextResponse.json(
      { success: true, leadId: result[0].id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error('[API/leads] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno. Intenta por WhatsApp.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const city = searchParams.get('city');
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const params: unknown[] = [];
  let paramIndex = 1;

  if (status) {
    conditions.push(`status = $${paramIndex++}`);
    params.push(status);
  }
  if (city) {
    conditions.push(`city = $${paramIndex++}`);
    params.push(city);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const leads = await query(
    `SELECT id, name, business_name, phone, city, service_interest,
            plan_selected, status, created_at
     FROM leads ${where}
     ORDER BY created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, limit, offset]
  );

  const [{ total }] = await query<{ total: string }>(
    `SELECT COUNT(*) as total FROM leads ${where}`,
    params
  );

  return NextResponse.json({
    leads,
    pagination: {
      page,
      limit,
      total: parseInt(total),
      pages: Math.ceil(parseInt(total) / limit),
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
