'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'ingreso' | 'egreso';
  description: string;
  amount: number;
}

const initialTransactions: Transaction[] = [
  { id: 1, type: 'egreso', description: 'Alquiler de local', amount: 800 },
  { id: 2, type: 'ingreso', description: 'Ventas del lunes', amount: 450 },
  { id: 3, type: 'egreso', description: 'Compra de mercadería', amount: 320 },
  { id: 4, type: 'ingreso', description: 'Ventas del martes', amount: 380 },
  { id: 5, type: 'egreso', description: 'Servicio de luz', amount: 150 },
];

export default function CashFlowDemo() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState<'ingreso' | 'egreso'>('ingreso');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const totalIngresos = transactions
    .filter((t) => t.type === 'ingreso')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalEgresos = transactions
    .filter((t) => t.type === 'egreso')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIngresos - totalEgresos;

  const addTransaction = () => {
    const amount = parseFloat(newAmount);
    if (!newDesc.trim() || isNaN(amount) || amount <= 0) return;
    setTransactions((prev) => [
      { id: Date.now(), type: newType, description: newDesc.trim(), amount },
      ...prev,
    ]);
    setNewDesc('');
    setNewAmount('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-xs text-emerald-600 font-medium mb-1">Ingresos</p>
          <p className="text-xl font-bold text-emerald-700">S/ {totalIngresos.toLocaleString('es-PE')}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-xs text-red-500 font-medium mb-1">Egresos</p>
          <p className="text-xl font-bold text-red-600">S/ {totalEgresos.toLocaleString('es-PE')}</p>
        </div>
        <div className={`border rounded-xl p-4 text-center ${balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
          <p className="text-xs text-zinc-500 font-medium mb-1">Balance</p>
          <p className={`text-xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-600'}`}>
            S/ {balance.toLocaleString('es-PE')}
          </p>
        </div>
      </div>

      {/* Add button / Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-dashed border-zinc-300 
            hover:border-emerald-400 text-zinc-500 hover:text-emerald-600 text-sm font-medium py-3 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar movimiento
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3"
        >
          {/* Type toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setNewType('ingreso')}
              className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                newType === 'ingreso' ? 'bg-emerald-600 text-white' : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              Ingreso
            </button>
            <button
              onClick={() => setNewType('egreso')}
              className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                newType === 'egreso' ? 'bg-red-500 text-white' : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              Egreso
            </button>
          </div>
          <input
            type="text"
            placeholder="Descripción (ej: Venta de productos)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full text-sm bg-white border border-zinc-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
          />
          <input
            type="number"
            placeholder="Monto en S/"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            min="0"
            step="0.01"
            className="w-full text-sm bg-white border border-zinc-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 text-sm text-zinc-500 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={addTransaction}
              className="flex-1 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 py-2 rounded-lg transition-colors"
            >
              Registrar
            </button>
          </div>
        </motion.div>
      )}

      {/* Transaction list */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Movimientos</h4>
        <AnimatePresence mode="popLayout">
          {transactions.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              layout
              className="flex items-center justify-between bg-white border border-zinc-200 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {t.type === 'ingreso' ? (
                  <ArrowDownCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ArrowUpCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-zinc-700">{t.description}</p>
                  <p className="text-[11px] text-zinc-400 capitalize">{t.type}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${t.type === 'ingreso' ? 'text-emerald-600' : 'text-red-500'}`}>
                {t.type === 'ingreso' ? '+' : '-'} S/ {t.amount.toFixed(2)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
