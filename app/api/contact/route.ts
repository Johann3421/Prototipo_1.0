import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(2000),
  leadId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const data = ContactSchema.parse(rawBody);

    await query(
      `INSERT INTO contact_messages (lead_id, subject, body)
       VALUES ($1, $2, $3)`,
      [data.leadId ?? null, data.subject ?? null, data.body]
    );

    return NextResponse.json(
      { success: true, message: 'Mensaje recibido' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error('[API/contact] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
