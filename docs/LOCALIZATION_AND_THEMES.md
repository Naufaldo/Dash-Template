# Localization (i18n) & Theming Guide

---

## 1. Adding a New Language

Translations are defined in `src/lib/stores/locale.ts`.

To add a new language (e.g., Japanese `ja` or German `de`):
1. Add the locale code to `Locale` type:
   ```typescript
   export type Locale = 'id' | 'en' | 'ja';
   ```
2. Add translation entries:
   ```typescript
   export const translations = {
     id: { ... },
     en: { ... },
     ja: {
       brand: 'SCADA IoT ダッシュボード',
       masterBanner: '中央監視制御センター',
       ...
     }
   };
   ```
3. Use anywhere in Svelte templates:
   ```svelte
   <script>
     import { t } from '$lib/stores/locale';
   </script>
   <h1>{$t.masterBanner}</h1>
   ```

---

## 2. Customizing Theme Colors

Colors are configured as CSS custom properties in `src/app.css`:

```css
:root[data-theme='dark'] {
  --bg-canvas: #0c0e12;
  --bg-surface: #141820;
  --color-primary: #00e676;
}

:root[data-theme='light'] {
  --bg-canvas: #f4f6f9;
  --bg-surface: #ffffff;
  --color-primary: #00a844;
}
```
To change corporate branding colors, modify `--color-primary` and `--color-primary-rgb`.
