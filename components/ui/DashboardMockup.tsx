'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DashboardMockup() {
  const [ventas, setVentas] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setVentas(Math.floor(eased * 1240));
      setTicket(Math.floor(eased * 62));
      setStock(Math.floor(eased * 48));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const barHeights = [40, 55, 35, 65, 50, 72, 60];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Gradient blob behind */}
      <div className="absolute -inset-8 bg-gradient-to-br from-emerald-200/15 to-emerald-400/10 rounded-3xl blur-2xl" />

      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden animate-float border border-[var(--border-default)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border-b border-[var(--border-default)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 ml-2">
            <div className="bg-white rounded-md px-3 py-1 text-xs text-zinc-400 border border-[var(--border-default)] max-w-[200px]">
              app.techmype.pe/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-800">Dashboard — Hoy</h4>
            <span className="text-xs text-zinc-400">Actualizado</span>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-50 rounded-lg p-3 text-center">
              <p className="text-xs text-zinc-500">Ventas</p>
              <p className="text-lg font-bold text-zinc-800">
                S/{ventas.toLocaleString()}
              </p>
            </div>
            <div className="bg-zinc-50 rounded-lg p-3 text-center">
              <p className="text-xs text-zinc-500">Ticket</p>
              <p className="text-lg font-bold text-zinc-800">S/ {ticket}</p>
            </div>
            <div className="bg-zinc-50 rounded-lg p-3 text-center">
              <p className="text-xs text-zinc-500">Stock</p>
              <p className="text-lg font-bold text-zinc-800">{stock} it.</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="flex items-end justify-between gap-2 h-20">
              {barHeights.map((height, i) => (
                <motion.div
                  key={days[i]}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-full rounded-t-sm ${
                      i === barHeights.length - 1 ? 'bg-emerald-500' : 'bg-zinc-300'
                    }`}
                    style={{ height: '100%' }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {days.map((d) => (
                <span key={d} className="text-[10px] text-zinc-400 flex-1 text-center">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Recent sales */}
          <div>
            <p className="text-xs font-medium text-zinc-600 mb-2">Últimas ventas:</p>
            <div className="space-y-1.5">
              {[
                { name: 'Pollo a la brasa ×2', price: 'S/ 44.00' },
                { name: 'Gaseosa 500ml ×3', price: 'S/ 15.00' },
                { name: 'Menú del día ×1', price: 'S/ 12.00' },
              ].map((sale) => (
                <div
                  key={sale.name}
                  className="flex items-center justify-between text-xs text-zinc-600"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {sale.name}
                  </span>
                  <span className="font-medium">{sale.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
