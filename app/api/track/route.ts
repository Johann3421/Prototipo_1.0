import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const TrackSchema = z.object({
  eventType: z.enum(['DEMO_CLICK', 'WHATSAPP_CLICK', 'PRICING_VIEW', 'FORM_SUBMIT', 'PAGE_VIEW']),
  target: z.string().min(1).max(100),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  // Respond immediately — fire-and-forget pattern
  const responsePromise = NextResponse.json({ ok: true }, { status: 200 });

  try {
    const body = await request.json();
    const data = TrackSchema.parse(body);

    // Insert without blocking the response
    prisma.eventLog
      .create({
        data: {
          eventType: data.eventType,
          target: data.target,
          metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : undefined,
        },
      })
      .catch((err: unknown) => console.error('[track] DB error:', err));
  } catch {
    // Validation errors are silently ignored — analytics must never return 500
  }

  return responsePromise;
}
