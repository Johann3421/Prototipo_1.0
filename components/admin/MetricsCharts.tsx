'use client';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export type LeadStatus = 'NUEVO' | 'CONTACTADO' | 'EN_NEGOCIACION' | 'CERRADO_GANADO' | 'CERRADO_PERDIDO';
export type EventType = 'DEMO_CLICK' | 'WHATSAPP_CLICK' | 'PRICING_VIEW' | 'FORM_SUBMIT' | 'PAGE_VIEW';

interface MetricsChartsProps {
  leadsByStatus: Array<{ estado: LeadStatus; count: number }>;
  leadsBySource: Array<{ origen: string; count: number }>;
  eventsByType: Array<{ eventType: EventType; count: number }>;
  eventsOverTime: Array<{ day: string; eventType: string; count: number }>;
  recentLeads: Array<{
    id: string;
    nombreContacto: string;
    nombreNegocio: string;
    telefonoWhatsApp: string;
    servicioInteres: string;
    estado: LeadStatus;
    createdAt: string;
  }>;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  NUEVO: 'Nuevo',
  CONTACTADO: 'Contactado',
  EN_NEGOCIACION: 'En negociación',
  CERRADO_GANADO: 'Ganado ✓',
  CERRADO_PERDIDO: 'Perdido',
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  NUEVO: '#6366f1',
  CONTACTADO: '#f59e0b',
  EN_NEGOCIACION: '#3b82f6',
  CERRADO_GANADO: '#10b981',
  CERRADO_PERDIDO: '#ef4444',
};

const EVENT_COLORS: Record<string, string> = {
  DEMO_CLICK: '#6366f1',
  WHATSAPP_CLICK: '#25D366',
  PRICING_VIEW: '#f59e0b',
  FORM_SUBMIT: '#3b82f6',
  PAGE_VIEW: '#a1a1aa',
};

export default function MetricsCharts({
  leadsByStatus,
  leadsBySource,
  eventsByType,
  eventsOverTime,
  recentLeads,
}: MetricsChartsProps) {
  // Pivot eventsOverTime for LineChart: [{day, DEMO_CLICK, WHATSAPP_CLICK}]
  const allDays = Array.from(new Set(eventsOverTime.map((e) => e.day))).sort();
  const lineData = allDays.map((day) => {
    const dayEvents = eventsOverTime.filter((e) => e.day === day);
    return {
      day: day.substring(5), // MM-DD format
      DEMO_CLICK: dayEvents.find((e) => e.eventType === 'DEMO_CLICK')?.count ?? 0,
      WHATSAPP_CLICK: dayEvents.find((e) => e.eventType === 'WHATSAPP_CLICK')?.count ?? 0,
    };
  });

  // Prepare pie data with labels
  const pieData = leadsByStatus.map((item) => ({
    name: STATUS_LABELS[item.estado] ?? item.estado,
    value: item.count,
    fill: STATUS_COLORS[item.estado] ?? '#a1a1aa',
  }));

  return (
    <div className="space-y-8">
      {/* Row 1: Bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events by type */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-700 mb-4">Eventos por tipo (total)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={eventsByType.map((e) => ({ name: e.eventType.replace('_', ' '), count: e.count, fill: EVENT_COLORS[e.eventType] ?? '#a1a1aa' }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {eventsByType.map((e) => (
                  <Cell key={e.eventType} fill={EVENT_COLORS[e.eventType] ?? '#a1a1aa'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by source */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-700 mb-4">Leads por fuente de tráfico</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadsBySource.map((s) => ({ name: s.origen, count: s.count }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Line + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events trend last 30 days */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-700 mb-4">Actividad — últimos 30 días</h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="DEMO_CLICK" stroke="#6366f1" dot={false} strokeWidth={2} name="Demo Clicks" />
                <Line type="monotone" dataKey="WHATSAPP_CLICK" stroke="#25D366" dot={false} strokeWidth={2} name="WhatsApp Clicks" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-zinc-400 text-center py-16">Sin datos en los últimos 30 días aún.</p>
          )}
        </div>

        {/* Leads by status (pie) */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-700 mb-4">Estado de leads</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [val, name]} />
                <Legend iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-zinc-400 text-center py-16">Sin leads aún.</p>
          )}
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h3 className="text-sm font-semibold text-zinc-700">Leads recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Contacto</th>
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Negocio</th>
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">WhatsApp</th>
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Servicio</th>
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Estado</th>
                <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-400 text-sm">
                    No hay leads aún. ¡Los formularios están listos para capturarlos!
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-zinc-800">{lead.nombreContacto}</td>
                    <td className="px-6 py-3 text-zinc-600">{lead.nombreNegocio}</td>
                    <td className="px-6 py-3">
                      <a href={`https://wa.me/${lead.telefonoWhatsApp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                        {lead.telefonoWhatsApp}
                      </a>
                    </td>
                    <td className="px-6 py-3 text-zinc-600 capitalize">{lead.servicioInteres.replace('_', ' ')}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium`}
                        style={{ backgroundColor: STATUS_COLORS[lead.estado] + '20', color: STATUS_COLORS[lead.estado] }}>
                        {STATUS_LABELS[lead.estado] ?? lead.estado}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString('es-PE')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
