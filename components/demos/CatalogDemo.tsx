'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

const products: Product[] = [
  { id: 1, name: 'Polo Algodón Premium', price: 45, category: 'Ropa', emoji: '👕' },
  { id: 2, name: 'Zapatillas Running', price: 189, category: 'Calzado', emoji: '👟' },
  { id: 3, name: 'Mochila Escolar', price: 65, category: 'Accesorios', emoji: '🎒' },
  { id: 4, name: 'Gorra Deportiva', price: 25, category: 'Accesorios', emoji: '🧢' },
  { id: 5, name: 'Casaca Impermeable', price: 120, category: 'Ropa', emoji: '🧥' },
  { id: 6, name: 'Short Deportivo', price: 35, category: 'Ropa', emoji: '🩳' },
];

export default function CatalogDemo() {
  const [selected, setSelected] = useState<number[]>([]);
  const [sent, setSent] = useState(false);

  const toggleProduct = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setSent(false);
  };

  const selectedProducts = products.filter((p) => selected.includes(p.id));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleSend = () => {
    setSent(true);
  };

  return (
    <div className="space-y-6">
      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {products.map((product) => {
          const isSelected = selected.includes(product.id);
          return (
            <motion.button
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
            >
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.span>
              )}
              <span className="text-2xl">{product.emoji}</span>
              <p className="text-sm font-medium text-zinc-800 mt-2">{product.name}</p>
              <span className="text-[11px] text-zinc-400">{product.category}</span>
              <p className="text-base font-bold text-zinc-900 mt-1">S/ {product.price.toFixed(2)}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Pedido */}
      <AnimatePresence>
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white border border-zinc-200 rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-semibold text-zinc-700">
                Tu pedido ({selectedProducts.length} {selectedProducts.length === 1 ? 'producto' : 'productos'})
              </h4>
            </div>

            <div className="space-y-2 mb-4">
              {selectedProducts.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span className="text-zinc-600">{p.emoji} {p.name}</span>
                  <span className="font-medium text-zinc-800">S/ {p.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-zinc-200 pt-2 flex justify-between font-bold text-zinc-900">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>

            {!sent ? (
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSend}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] 
                  text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir por WhatsApp
              </a>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-3 bg-emerald-50 rounded-xl border border-emerald-200"
              >
                <p className="text-sm font-medium text-emerald-700">✅ ¡Pedido enviado a WhatsApp!</p>
                <p className="text-xs text-emerald-600 mt-1">Así de fácil recibirías pedidos de tus clientes</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
