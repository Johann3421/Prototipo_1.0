import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function authGuard(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value;
  return token === process.env.ADMIN_SECRET && !!token;
}

export async function GET(request: NextRequest) {
  if (!authGuard(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [totalLeads, leadsByStatus, leadsBySource, eventsByType, recentLeads, rawEvents] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ['estado'], _count: { estado: true } }),
      prisma.lead.groupBy({ by: ['origen'], _count: { origen: true } }),
      prisma.eventLog.groupBy({ by: ['eventType'], _count: { eventType: true } }),
      prisma.lead.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nombreContacto: true,
          nombreNegocio: true,
          telefonoWhatsApp: true,
          servicioInteres: true,
          estado: true,
          createdAt: true,
        },
      }),
      prisma.$queryRaw<Array<{ day: Date; eventType: string; count: bigint }>>`
        SELECT
          DATE("createdAt") as day,
          "eventType",
          COUNT(*)::int as count
        FROM "EventLog"
        WHERE "createdAt" >= NOW() - INTERVAL '30 days'
        GROUP BY DATE("createdAt"), "eventType"
        ORDER BY day ASC
      `,
    ]);

  // Serialize dates for JSON
  const eventsOverTime = rawEvents.map((e) => ({
    day: e.day instanceof Date ? e.day.toISOString().split('T')[0] : String(e.day),
    eventType: e.eventType,
    count: Number(e.count),
  }));

  return NextResponse.json({
    totalLeads,
    leadsByStatus: leadsByStatus.map((r) => ({ estado: r.estado, count: r._count.estado })),
    leadsBySource: leadsBySource.map((r) => ({ origen: r.origen, count: r._count.origen })),
    eventsByType: eventsByType.map((r) => ({ eventType: r.eventType, count: r._count.eventType })),
    recentLeads: recentLeads.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    })),
    eventsOverTime,
  });
}
