'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useDemoStore, type DemoId } from '@/store/demoStore';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

import POSDemo from '@/components/demos/POSDemo';
import DashboardDemo from '@/components/demos/DashboardDemo';
import CatalogDemo from '@/components/demos/CatalogDemo';
import CashFlowDemo from '@/components/demos/CashFlowDemo';

const demoComponents: Record<Exclude<DemoId, null>, React.ComponentType> = {
  pos: POSDemo,
  dashboard: DashboardDemo,
  catalog: CatalogDemo,
  cashflow: CashFlowDemo,
};

const demoTitles: Record<Exclude<DemoId, null>, string> = {
  pos: 'Gestión de Ventas Express',
  dashboard: 'Panel de Control de Negocio',
  catalog: 'Catálogo Digital WhatsApp',
  cashflow: 'Gestor de Flujo de Caja',
};

export default function DemoModal() {
  const activeDemo = useDemoStore((s) => s.activeDemo);
  const closeDemo = useDemoStore((s) => s.closeDemo);

  useEffect(() => {
    if (activeDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeDemo]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDemo();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeDemo]);

  const DemoComponent = activeDemo ? demoComponents[activeDemo] : null;
  const title = activeDemo ? demoTitles[activeDemo] : '';

  return (
    <AnimatePresence>
      {activeDemo && DemoComponent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeDemo(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`Demo: ${title}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)]">
              <div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Demo interactiva
                </span>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-1">{title}</h2>
              </div>
              <button
                onClick={closeDemo}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Cerrar demo"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <DemoComponent />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-default)] bg-zinc-50">
              <button
                onClick={closeDemo}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Cerrar demo
              </button>
              <a
                href={buildWhatsAppUrl(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Me interesa este sistema
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
