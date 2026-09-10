import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type WidgetSize = 'sm' | 'md' | 'lg' | 'wide';

interface SizeMap {
  [widgetId: string]: WidgetSize;
}

function createLayoutStore() {
  const defaultSizes: SizeMap = {};
  const { subscribe, set, update } = writable<SizeMap>(defaultSizes);

  return {
    subscribe,
    init: () => {
      if (!browser) return;
      try {
        const saved = localStorage.getItem('scada_widget_sizes');
        if (saved) {
          set(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Failed to load widget sizes:', e);
      }
    },
    setSize: (widgetId: string, size: WidgetSize) => {
      update((map) => {
        const next = { ...map, [widgetId]: size };
        if (browser) {
          try {
            localStorage.setItem('scada_widget_sizes', JSON.stringify(next));
          } catch (e) {}
        }
        return next;
      });
    },
    resetSizes: () => {
      if (browser) {
        try {
          localStorage.removeItem('scada_widget_sizes');
        } catch (e) {}
      }
      set({});
    }
  };
}

export const layoutStore = createLayoutStore();
