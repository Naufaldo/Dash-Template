<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore, t } from '$lib/stores/locale';
  import { themeStore } from '$lib/stores/theme';
  import { layoutStore } from '$lib/stores/layout';
  import { page } from '$app/stores';

  onMount(() => {
    localeStore.init();
    themeStore.init();
    layoutStore.init();
  });
</script>

<div class="app-layout">
  <header class="topbar">
    <div class="topbar__left">
      <a href="/" class="brand">
        <span class="brand__icon">⚡</span>
        <div>
          <span class="brand__title">{$t.brand}</span>
          <span class="brand__tagline">{$t.tagline}</span>
        </div>
      </a>

      <!-- Navigation Tabs -->
      <nav class="nav-tabs" aria-label="Main Navigation">
        <a href="/" class="nav-tab" class:nav-tab--active={$page.url.pathname === '/'}>
          📊 {$t.navDashboard}
        </a>
        <a href="/rhvac" class="nav-tab" class:nav-tab--active={$page.url.pathname.startsWith('/rhvac')}>
          ❄️ {$t.navRhvac}
        </a>
        <a href="/widgets" class="nav-tab" class:nav-tab--active={$page.url.pathname.startsWith('/widgets')}>
          🎛️ {$t.navWidgets}
        </a>
      </nav>
    </div>

    <div class="topbar__right">
      <span class="sim-badge" title="Telemetry generated automatically every 4s">
        <span class="sim-dot"></span>
        {$t.simBadge}
      </span>

      <!-- Language Switcher -->
      <button
        type="button"
        class="ctrl-btn"
        on:click={localeStore.toggle}
        aria-label="Switch Language"
        title="Toggle Indonesian / English"
      >
        <span class="ctrl-btn__icon">🌐</span>
        <span class="ctrl-btn__text">{$localeStore === 'id' ? 'ID' : 'EN'}</span>
      </button>

      <!-- Theme Switcher (Dark/Light) -->
      <button
        type="button"
        class="ctrl-btn"
        on:click={themeStore.toggle}
        aria-label="Toggle Theme"
        title="Toggle Dark / Light Mode"
      >
        <span class="ctrl-btn__icon">{$themeStore === 'dark' ? '🌙' : '☀️'}</span>
        <span class="ctrl-btn__text">{$themeStore === 'dark' ? 'DARK' : 'LIGHT'}</span>
      </button>
    </div>
  </header>

  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg-canvas);
    color: var(--color-text-primary);
  }

  .topbar {
    height: 56px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-md);
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: var(--shadow-sm);
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    text-decoration: none;
    color: inherit;
  }

  .brand__icon {
    font-size: 20px;
    color: var(--color-primary);
  }

  .brand__title {
    font-size: var(--font-md);
    font-weight: 800;
    display: block;
    line-height: 1.1;
  }

  .brand__tagline {
    font-size: 10px;
    color: var(--color-text-secondary);
    display: block;
  }

  .nav-tabs {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-tab {
    text-decoration: none;
    font-size: var(--font-xs);
    font-weight: 700;
    color: var(--color-text-secondary);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
  }

  .nav-tab:hover {
    color: var(--color-text-primary);
    background: var(--border-subtle);
  }

  .nav-tab--active {
    color: var(--color-primary);
    background: var(--color-primary-subtle);
  }

  .topbar__right {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .sim-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    font-size: var(--font-xs);
    font-weight: 600;
    padding: 4px 10px;
    border-radius: var(--radius-full);
    border: 1px solid var(--color-primary);
  }

  .sim-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }

  .ctrl-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    color: var(--color-text-primary);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: var(--font-xs);
    font-weight: 700;
    transition: background var(--transition-fast), border-color var(--transition-fast);
  }

  .ctrl-btn:hover {
    background: var(--border-subtle);
    border-color: var(--border-strong);
  }

  .main-content {
    flex: 1;
    padding: var(--space-md);
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .brand__tagline { display: none; }
    .sim-badge { display: none; }
    .topbar__left { gap: var(--space-sm); }
  }
</style>
