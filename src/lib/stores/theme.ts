import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

function createThemeStore() {
  const initialTheme: Theme = typeof window !== 'undefined'
    ? ((localStorage.getItem('theme') as Theme) || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'))
    : 'dark';

  const { subscribe, set, update } = writable<Theme>(initialTheme);

  function applyTheme(theme: Theme) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    set(theme);
  }

  function toggle() {
    update((curr) => {
      const next: Theme = curr === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }

  function init() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      const theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      applyTheme(theme);
    }
  }

  return {
    subscribe,
    set: applyTheme,
    toggle,
    init,
  };
}

export const themeStore = createThemeStore();
