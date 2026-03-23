import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import MetricsCharts from '@/components/admin/MetricsCharts';

async function getMetrics() {
  const [totalLeads, totalEvents, leadsByStatus, leadsBySource, eventsByType, recentLeads, rawEvents] =
    await Promise.all([
      prisma.lead.count(),
      prisma.eventLog.count(),
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

  type EventGroup = { eventType: string; _count: { eventType: number } };
  const typedEventsByType = eventsByType as EventGroup[];
  const demoClicks = typedEventsByType.find((e) => e.eventType === 'DEMO_CLICK')?._count.eventType ?? 0;
  const waClicks = typedEventsByType.find((e) => e.eventType === 'WHATSAPP_CLICK')?._count.eventType ?? 0;

  return {
    totalLeads,
    totalEvents,
    demoClicks,
    waClicks,
    leadsByStatus: leadsByStatus.map((r) => ({ estado: r.estado, count: r._count.estado })),
    leadsBySource: leadsBySource.map((r) => ({ origen: r.origen, count: r._count.origen })),
    eventsByType: eventsByType.map((r) => ({ eventType: r.eventType, count: r._count.eventType })),
    recentLeads: recentLeads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })),
    eventsOverTime: rawEvents.map((e) => ({
      day: e.day instanceof Date ? e.day.toISOString().split('T')[0] : String(e.day),
      eventType: e.eventType,
      count: Number(e.count),
    })),
  };
}

async function handleLogout() {
  'use server';
  const cookieStore = cookies();
  cookieStore.delete('admin_token');
  redirect('/admin/login');
}

export default async function AdminDashboard() {
  // Defense-in-depth auth check (middleware is primary guard)
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login');
  }

  const metrics = await getMetrics();

  const kpiCards = [
    { label: 'Total Leads', value: metrics.totalLeads, icon: '👥', color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Demo Clicks', value: metrics.demoClicks, icon: '🖥️', color: 'bg-violet-50 text-violet-700' },
    { label: 'WhatsApp Clicks', value: metrics.waClicks, icon: '💬', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Total Eventos', value: metrics.totalEvents, icon: '📊', color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              T
            </span>
            <div>
              <h1 className="text-sm font-bold text-zinc-900">TechMYPE Admin</h1>
              <p className="text-xs text-zinc-400">Panel de métricas y CRM</p>
            </div>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="text-xs text-zinc-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Cerrar sesión →
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg mb-3 ${kpi.color}`}>
                {kpi.icon}
              </div>
              <p className="text-3xl font-bold text-zinc-900">{kpi.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <MetricsCharts
          leadsByStatus={metrics.leadsByStatus as Parameters<typeof MetricsCharts>[0]['leadsByStatus']}
          leadsBySource={metrics.leadsBySource}
          eventsByType={metrics.eventsByType as Parameters<typeof MetricsCharts>[0]['eventsByType']}
          eventsOverTime={metrics.eventsOverTime}
          recentLeads={metrics.recentLeads as Parameters<typeof MetricsCharts>[0]['recentLeads']}
        />
      </main>
    </div>
  );
}
