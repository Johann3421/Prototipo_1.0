'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { DemoId } from '@/store/demoStore';
import { useDemoStore } from '@/store/demoStore';
import { trackEvent } from '@/lib/tracking';

interface DemoCardProps {
  id: DemoId;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  cta: string;
  index: number;
}

export default function DemoCard({
  id,
  icon: Icon,
  iconColor,
  iconBg,
  badge,
  badgeColor,
  title,
  description,
  preview,
  cta,
  index,
}: DemoCardProps) {
  const openDemo = useDemoStore((s) => s.openDemo);

  function handleOpen() {
    trackEvent('DEMO_CLICK', id ?? 'unknown');
    openDemo(id);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-white border border-[var(--border-default)] rounded-2xl p-6 
        hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1.5">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{description}</p>

      {/* Mini-Preview */}
      <div className="flex-1 bg-zinc-50 rounded-xl border border-zinc-100 p-4 mb-5 min-h-[120px]">
        {preview}
      </div>

      {/* CTA */}
      <button
        onClick={handleOpen}
        aria-label={`Abrir demo: ${title}`}
        className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 
          text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors duration-200"
      >
        {cta}
        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
      </button>
    </motion.article>
  );
}
