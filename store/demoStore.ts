import { create } from 'zustand';

export type DemoId = 'pos' | 'dashboard' | 'catalog' | 'cashflow' | null;

interface DemoState {
  activeDemo: DemoId;
  lastTriedDemo: DemoId;
  openDemo: (id: DemoId) => void;
  closeDemo: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  activeDemo: null,
  lastTriedDemo: null,
  openDemo: (id) => set({ activeDemo: id, lastTriedDemo: id }),
  closeDemo: () => set({ activeDemo: null }),
}));
