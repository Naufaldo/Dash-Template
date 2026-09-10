<script lang="ts">
  import { layoutStore, type WidgetSize } from '$lib/stores/layout';
  import { t } from '$lib/stores/locale';

  export let id: string;
  export let title: string = '';
  export let subtitle: string = '';
  export let defaultSize: WidgetSize = 'md';
  export let status: 'normal' | 'warning' | 'critical' | 'offline' = 'normal';

  $: currentSize = $layoutStore[id] || defaultSize;

  function setSize(size: WidgetSize) {
    layoutStore.setSize(id, size);
  }
</script>

<div
  class="widget-card widget-card--{currentSize} status-border--{status}"
  id="widget-{id}"
  data-size={currentSize}
>
  <header class="widget-card__header">
    <div class="widget-card__title-group">
      <span class="status-indicator status-indicator--{status}"></span>
      <div>
        <h3 class="widget-card__title">{title}</h3>
        {#if subtitle}
          <span class="widget-card__subtitle">{subtitle}</span>
        {/if}
      </div>
    </div>

    <!-- Size selector controls -->
    <div class="size-controls" role="group" aria-label="Resize Widget">
      <button
        type="button"
        class="size-btn"
        class:size-btn--active={currentSize === 'sm'}
        on:click={() => setSize('sm')}
        title="Compact (1x1)"
      >S</button>
      <button
        type="button"
        class="size-btn"
        class:size-btn--active={currentSize === 'md'}
        on:click={() => setSize('md')}
        title="Standard (1x1)"
      >M</button>
      <button
        type="button"
        class="size-btn"
        class:size-btn--active={currentSize === 'wide'}
        on:click={() => setSize('wide')}
        title="Wide (2x1)"
      >W</button>
      <button
        type="button"
        class="size-btn"
        class:size-btn--active={currentSize === 'lg'}
        on:click={() => setSize('lg')}
        title="Large (2x2)"
      >L</button>
    </div>
  </header>

  <div class="widget-card__body">
    <slot {currentSize} />
  </div>
</div>

<style>
  .widget-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
    container-type: inline-size;
  }

  .widget-card:hover {
    border-color: var(--border-strong);
  }

  .status-border--warning {
    border-left: 3px solid var(--status-warning);
  }
  .status-border--critical {
    border-left: 3px solid var(--status-critical);
  }
  .status-border--normal {
    border-left: 3px solid var(--status-normal);
  }
  .status-border--offline {
    border-left: 3px solid var(--status-offline);
  }

  /* Grid span modifiers */
  :global(.widget-card--sm) {
    grid-column: span 1;
    min-height: 180px;
  }
  :global(.widget-card--md) {
    grid-column: span 1;
    min-height: 240px;
  }
  :global(.widget-card--wide) {
    grid-column: span 2;
    min-height: 240px;
  }
  :global(.widget-card--lg) {
    grid-column: span 2;
    min-height: 380px;
  }

  @media (max-width: 768px) {
    :global(.widget-card--wide),
    :global(.widget-card--lg) {
      grid-column: span 1;
    }
  }

  .widget-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-sm);
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-card-header);
    gap: var(--space-xs);
  }

  .widget-card__title-group {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .status-indicator--normal { background: var(--status-normal); box-shadow: 0 0 6px var(--status-normal); }
  .status-indicator--warning { background: var(--status-warning); box-shadow: 0 0 6px var(--status-warning); }
  .status-indicator--critical { background: var(--status-critical); box-shadow: 0 0 6px var(--status-critical); animation: pulse-crit 1.2s infinite; }
  .status-indicator--offline { background: var(--status-offline); }

  @keyframes pulse-crit {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .widget-card__title {
    font-size: var(--font-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .widget-card__subtitle {
    font-size: 10px;
    color: var(--color-text-secondary);
    display: block;
  }

  .size-controls {
    display: inline-flex;
    background: var(--bg-canvas);
    border-radius: var(--radius-sm);
    padding: 1px;
    border: 1px solid var(--border-subtle);
    gap: 1px;
  }

  .size-btn {
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    font-size: 9px;
    font-weight: 700;
    padding: 2px 5px;
    border-radius: 2px;
    cursor: pointer;
    line-height: 1;
    transition: all 0.15s ease;
  }

  .size-btn:hover {
    color: var(--color-text-primary);
    background: var(--border-subtle);
  }

  .size-btn--active {
    background: var(--color-primary);
    color: #ffffff;
  }

  .widget-card__body {
    flex: 1;
    padding: var(--space-sm);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
</style>
