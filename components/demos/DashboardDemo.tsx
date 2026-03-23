'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function DashboardDemo() {
  const [salesMultiplier, setSalesMultiplier] = useState(50);

  const ventasMes = Math.round(salesMultiplier * 180);
  const gastos = 4500;
  const utilidad = ventasMes - gastos;
  const utilidadPositive = utilidad >= 0;

  const barData = [
    { label: 'Lun', value: salesMultiplier * 1.2 },
    { label: 'Mar', value: salesMultiplier * 0.9 },
    { label: 'Mié', value: salesMultiplier * 1.5 },
    { label: 'Jue', value: salesMultiplier * 1.1 },
    { label: 'Vie', value: salesMultiplier * 1.8 },
    { label: 'Sáb', value: salesMultiplier * 2.2 },
    { label: 'Dom', value: salesMultiplier * 0.6 },
  ];
  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Slider control */}
      <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4">
        <label className="flex items-center justify-between text-sm text-zinc-600 mb-2">
          <span className="font-medium">Simulación de ventas diarias</span>
          <span className="font-semibold text-zinc-800">~{Math.round(salesMultiplier * 3.6)} ventas/día</span>
        </label>
        <input
          type="range"
          min={10}
          max={100}
          value={salesMultiplier}
          onChange={(e) => setSalesMultiplier(Number(e.target.value))}
          className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          key={`ventas-${ventasMes}`}
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          className="bg-white border border-zinc-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xs text-zinc-500 font-medium">Ventas del Mes</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900">
            S/ {ventasMes.toLocaleString('es-PE')}
          </p>
          <span className="text-xs text-emerald-600 flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> +12% vs mes anterior
          </span>
        </motion.div>

        <div className="bg-white border border-zinc-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-xs text-zinc-500 font-medium">Gastos Fijos</span>
          </div>
          <p className="text-2xl font-bold text-zinc-900">
            S/ {gastos.toLocaleString('es-PE')}
          </p>
          <span className="text-xs text-zinc-400 mt-1">Alquiler, servicios, personal</span>
        </div>

        <motion.div
          key={`utilidad-${utilidad}`}
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          className={`border rounded-xl p-4 ${utilidadPositive ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${utilidadPositive ? 'bg-emerald-100' : 'bg-red-100'}`}>
              {utilidadPositive
                ? <TrendingUp className="w-4 h-4 text-emerald-700" />
                : <TrendingDown className="w-4 h-4 text-red-600" />
              }
            </div>
            <span className="text-xs text-zinc-500 font-medium">Utilidad Neta</span>
          </div>
          <p className={`text-2xl font-bold ${utilidadPositive ? 'text-emerald-700' : 'text-red-600'}`}>
            S/ {utilidad.toLocaleString('es-PE')}
          </p>
          <span className={`text-xs mt-1 ${utilidadPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {utilidadPositive ? 'Tu negocio es rentable 🎉' : 'Necesitas más ventas'}
          </span>
        </motion.div>
      </div>

      {/* Bar chart */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-zinc-700 mb-4">Ventas de la semana</h4>
        <div className="flex items-end justify-between gap-3 h-36">
          {barData.map((bar, i) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-zinc-400 font-medium">
                S/{Math.round(bar.value * 36)}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(bar.value / maxBar) * 100}%` }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`w-full rounded-t-md ${i === 5 ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                style={{ minHeight: 4 }}
              />
              <span className="text-[10px] text-zinc-500">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
