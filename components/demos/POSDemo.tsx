'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Receipt } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const catalog = [
  { id: 1, name: 'Pollo a la Brasa', price: 22.0 },
  { id: 2, name: 'Gaseosa 500ml', price: 5.0 },
  { id: 3, name: 'Menú del Día', price: 12.0 },
  { id: 4, name: 'Papa Rellena', price: 6.0 },
  { id: 5, name: 'Chicha Morada 1L', price: 8.0 },
  { id: 6, name: 'Pan con Chicharrón', price: 10.0 },
];

const IGV_RATE = 0.18;

export default function POSDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showTicket, setShowTicket] = useState(false);

  const addToCart = (product: (typeof catalog)[number]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowTicket(false);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const igv = subtotal * IGV_RATE;
  const total = subtotal + igv;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Catálogo */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Productos
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {catalog.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex items-center justify-between bg-zinc-50 hover:bg-emerald-50 border border-zinc-200 
                hover:border-emerald-200 rounded-xl p-3 text-left transition-all duration-150 group"
            >
              <div>
                <p className="text-sm font-medium text-zinc-800">{product.name}</p>
                <p className="text-xs text-zinc-500">S/ {product.price.toFixed(2)}</p>
              </div>
              <Plus className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Carrito + Ticket */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Carrito de venta
        </h3>

        {cart.length === 0 ? (
          <div className="bg-zinc-50 rounded-xl border border-dashed border-zinc-200 p-8 text-center">
            <p className="text-sm text-zinc-400">Haz clic en un producto para agregarlo</p>
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  layout
                  className="flex items-center justify-between bg-white border border-zinc-200 rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-zinc-100 text-zinc-600 w-6 h-6 flex items-center justify-center rounded">
                      {item.qty}
                    </span>
                    <span className="text-sm text-zinc-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-zinc-800">
                      S/ {(item.price * item.qty).toFixed(2)}
                    </span>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Quitar ${item.name}`}>
                      <Trash2 className="w-3.5 h-3.5 text-zinc-400 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Totales */}
        {cart.length > 0 && (
          <div className="border border-zinc-200 rounded-xl p-4 space-y-2 mb-4">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Subtotal</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-600">
              <span>IGV (18%)</span>
              <span>S/ {igv.toFixed(2)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-2 flex justify-between text-base font-bold text-zinc-900">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Botón generar ticket */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowTicket(true)}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 
              text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <Receipt className="w-4 h-4" />
            Generar Ticket de Venta
          </button>
        )}

        {/* Ticket visual */}
        <AnimatePresence>
          {showTicket && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-white border-2 border-dashed border-zinc-300 rounded-xl p-5 font-mono text-xs"
            >
              <div className="text-center mb-3">
                <p className="font-bold text-sm">🧾 TICKET DE VENTA</p>
                <p className="text-zinc-400">TechMYPE Demo POS</p>
                <p className="text-zinc-400">{new Date().toLocaleString('es-PE')}</p>
              </div>
              <div className="border-t border-dashed border-zinc-300 pt-2 space-y-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.qty}x {item.name}</span>
                    <span>S/ {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-zinc-300 mt-2 pt-2 space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>IGV 18%</span><span>S/ {igv.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-sm"><span>TOTAL</span><span>S/ {total.toFixed(2)}</span></div>
              </div>
              <p className="text-center text-zinc-400 mt-3">¡Gracias por su compra!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
