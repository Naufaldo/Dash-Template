<script lang="ts">
  export let tag: string = 'TIC-101';
  export let description: string = 'COLD STORAGE TEMPERATURE LOOP';
  export let pv: number = -18.2; // Process Variable
  export let sp: number = -20.0; // Setpoint
  export let mv: number = 64.0;  // Manipulated Variable (0-100% Output)
  export let unit: string = '°C';
  export let min: number = -30;
  export let max: number = 0;
  export let mode: 'AUTO' | 'MANUAL' | 'CAS' = 'AUTO';

  $: pvPercent = Math.max(0, Math.min(100, ((pv - min) / (max - min)) * 100));
  $: spPercent = Math.max(0, Math.min(100, ((sp - min) / (max - min)) * 100));
  $: deviation = pv - sp;
</script>

<div class="pid-faceplate">
  <div class="pid-header">
    <span class="pid-tag">{tag}</span>
    <div class="pid-mode-badge">{mode}</div>
  </div>
  <div class="pid-desc">{description}</div>

  <div class="pid-body">
    <!-- Dual bar: PV & SP -->
    <div class="pid-bars">
      <div class="bar-col">
        <span class="bar-label">PV</span>
        <div class="bar-track">
          <div class="bar-fill bar-fill--pv" style="height: {pvPercent}%;"></div>
          <!-- SP Notch Marker -->
          <div class="sp-notch" style="bottom: {spPercent}%;"></div>
        </div>
        <span class="bar-val">{pv.toFixed(1)}</span>
      </div>

      <div class="bar-col">
        <span class="bar-label">SP</span>
        <div class="bar-track">
          <div class="bar-fill bar-fill--sp" style="height: {spPercent}%;"></div>
        </div>
        <span class="bar-val">{sp.toFixed(1)}</span>
      </div>

      <!-- Output / MV bar (0-100%) -->
      <div class="bar-col">
        <span class="bar-label">MV%</span>
        <div class="bar-track">
          <div class="bar-fill bar-fill--mv" style="height: {mv}%;"></div>
        </div>
        <span class="bar-val">{mv.toFixed(0)}%</span>
      </div>
    </div>

    <!-- Metrics Summary -->
    <div class="pid-stats">
      <div class="stat-row">
        <span>DEV (PV-SP):</span>
        <strong class:stat-alert={Math.abs(deviation) > 2}>
          {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}{unit}
        </strong>
      </div>
      <div class="stat-row">
        <span>OUTPUT:</span>
        <strong>{mv.toFixed(0)} % MV</strong>
      </div>
    </div>
  </div>

  <!-- Mode Selector Controls -->
  <div class="pid-actions">
    <button
      type="button"
      class="pid-mode-btn"
      class:pid-mode-btn--active={mode === 'AUTO'}
      on:click={() => (mode = 'AUTO')}
    >AUTO</button>
    <button
      type="button"
      class="pid-mode-btn"
      class:pid-mode-btn--active={mode === 'MANUAL'}
      on:click={() => (mode = 'MANUAL')}
    >MAN</button>
    <button
      type="button"
      class="pid-mode-btn"
      class:pid-mode-btn--active={mode === 'CAS'}
      on:click={() => (mode = 'CAS')}
    >CAS</button>
  </div>
</div>

<style>
  .pid-faceplate {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    padding: var(--space-xs) var(--space-sm);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    font-family: var(--font-mono);
  }

  .pid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pid-tag {
    font-size: 11px;
    font-weight: 800;
    color: var(--color-primary);
  }

  .pid-mode-badge {
    font-size: 9px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 3px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    color: var(--color-text-primary);
  }

  .pid-desc {
    font-size: 9px;
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pid-body {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    padding: var(--space-xs) 0;
  }

  .pid-bars {
    display: flex;
    gap: 8px;
    flex: 1;
  }

  .bar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 3px;
  }

  .bar-label {
    font-size: 8px;
    font-weight: 700;
    color: var(--color-text-secondary);
  }

  .bar-track {
    width: 14px;
    height: 70px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .bar-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transition: height 0.4s ease;
  }

  .bar-fill--pv { background: var(--color-primary); }
  .bar-fill--sp { background: #3b82f6; opacity: 0.8; }
  .bar-fill--mv { background: #eab308; }

  .sp-notch {
    position: absolute;
    left: -2px;
    right: -2px;
    height: 2px;
    background: #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 4px rgba(255, 255, 255, 0.8);
    z-index: 2;
  }

  .bar-val {
    font-size: 9px;
    font-weight: 700;
    color: var(--color-text-primary);
    font-variant-numeric: tabular-nums;
  }

  .pid-stats {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 9px;
    color: var(--color-text-secondary);
    border-left: 1px solid var(--border-subtle);
    padding-left: var(--space-xs);
  }

  .stat-row {
    display: flex;
    flex-direction: column;
  }

  .stat-row strong {
    color: var(--color-text-primary);
  }

  .stat-alert {
    color: var(--status-warning) !important;
  }

  .pid-actions {
    display: flex;
    gap: 4px;
    border-top: 1px solid var(--border-subtle);
    padding-top: 4px;
  }

  .pid-mode-btn {
    flex: 1;
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    color: var(--color-text-secondary);
    font-size: 8px;
    font-weight: 700;
    padding: 3px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .pid-mode-btn:hover {
    background: var(--bg-overlay);
    color: var(--color-text-primary);
  }

  .pid-mode-btn--active {
    background: var(--color-primary);
    color: #fff;
    border-color: var(--color-primary);
  }
</style>
