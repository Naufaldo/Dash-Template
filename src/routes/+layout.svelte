<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import { themeStore } from '$lib/stores/theme';
  import { localeStore, t } from '$lib/stores/locale';
  import { devicesStore } from '$lib/stores/devices';

  onMount(() => {
    themeStore.init();
    localeStore.init();
    devicesStore.initSimulation();
  });
</script>

<svelte:head>
  <title>{$t.brand} — {$t.tagline}</title>
</svelte:head>

<div class="scada-app">
  <header class="scada-topbar">
    <div class="topbar-left">
      <a href="/" class="brand-link">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
          <circle cx="16" cy="16" r="14" stroke="var(--color-primary)" stroke-width="2.5" />
          <circle cx="16" cy="16" r="5" fill="var(--status-online)" />
        </svg>
        <span class="brand-text">{$t.brand}</span>
      </a>
      <span class="sim-badge">{$t.simBadge}</span>
    </div>

    <div class="topbar-right">
      <button type="button" class="topbar-btn" on:click={themeStore.toggle} title="Toggle Dark/Light Mode">
        ☀️/🌙
      </button>
      <button type="button" class="topbar-btn" on:click={localeStore.toggle} title="Toggle Bahasa / English">
        🌐 {$localeStore.toUpperCase()}
      </button>
    </div>
  </header>

  <main class="scada-main">
    <slot />
  </main>
</div>

<style>
  .scada-app { min-height: 100vh; display: flex; flex-direction: column; }
  .scada-topbar {
    height: 52px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .brand-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; }
  .brand-text { font-weight: 700; font-size: 15px; font-family: var(--font-mono); }
  .sim-badge {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--color-primary);
    background: var(--color-primary-subtle);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid var(--border-subtle);
  }
  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .topbar-btn {
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    border-radius: var(--radius-sm);
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .scada-main { flex: 1; padding: 20px; max-width: 1400px; width: 100%; margin: 0 auto; }
</style>
