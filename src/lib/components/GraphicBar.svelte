<script lang="ts">
  export let label: string;
  export let value: number | null;
  export let unit: string;
  export let min: number;
  export let max: number;
  export let target: number | null | undefined = null;
  export let alarmHigh: number | null | undefined = null;
  export let alarmLow: number | null | undefined = null;
  export let size: 'sm' | 'md' = 'md';
  export let type: 'primary' | 'secondary' | 'temp' | 'pressure' | string = 'primary';
  export let decimals: number = 1;

  $: displayValue = value !== null ? value.toFixed(decimals) : null;

  $: percentage = value !== null
    ? Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
    : 0;

  $: targetPos = target !== null && target !== undefined
    ? Math.max(0, Math.min(100, ((target - min) / (max - min)) * 100))
    : null;

  $: alarmHighPos = alarmHigh !== null && alarmHigh !== undefined
    ? Math.max(0, Math.min(100, ((alarmHigh - min) / (max - min)) * 100))
    : null;

  $: alarmLowPos = alarmLow !== null && alarmLow !== undefined
    ? Math.max(0, Math.min(100, ((alarmLow - min) / (max - min)) * 100))
    : null;

  $: isCritical = (alarmHigh != null && value != null && value >= alarmHigh) ||
                  (alarmLow != null && value != null && value <= alarmLow);

  $: isWarning = !isCritical && (
    (alarmHigh != null && value != null && value >= alarmHigh - 1.0) ||
    (alarmLow != null && value != null && value <= alarmLow + 0.3)
  );

  $: barColor = isCritical
    ? 'var(--status-critical)'
    : isWarning
      ? 'var(--status-warning)'
      : type === 'pressure'
        ? 'var(--color-pressure)'
        : 'var(--color-temp)';
</script>

<div class="graphic-bar graphic-bar--{size}" role="region" aria-label="{label}: {displayValue ?? '—'} {unit}">
  <!-- Header with Label and Monospace Value -->
  <div class="graphic-bar__header">
    <span class="graphic-bar__label">{label}</span>
    <span class="graphic-bar__value" class:graphic-bar__value--warn={isWarning} class:graphic-bar__value--crit={isCritical}>
      {#if displayValue !== null}
        {displayValue}<span class="graphic-bar__unit">{unit}</span>
      {:else}
        <span style="color:var(--text-muted)">—</span>
      {/if}
    </span>
  </div>

  <!-- Progress Bar Track -->
  <div class="graphic-bar__track" class:graphic-bar__track--sm={size === 'sm'}>
    <!-- Filled Portion -->
    <div
      class="graphic-bar__fill"
      style="width: {percentage}%; background-color: {barColor};"
      aria-hidden="true"
    ></div>

    <!-- Target Marker -->
    {#if targetPos !== null}
      <div
        class="graphic-bar__marker graphic-bar__marker--target"
        style="left: {targetPos}%;"
        title="Target: {target} {unit}"
        aria-hidden="true"
      ></div>
    {/if}

    <!-- Alarm High Marker -->
    {#if alarmHighPos !== null}
      <div
        class="graphic-bar__marker graphic-bar__marker--alarm"
        style="left: {alarmHighPos}%;"
        title="High Limit: {alarmHigh} {unit}"
        aria-hidden="true"
      ></div>
    {/if}

    <!-- Alarm Low Marker -->
    {#if alarmLowPos !== null}
      <div
        class="graphic-bar__marker graphic-bar__marker--alarm"
        style="left: {alarmLowPos}%;"
        title="Low Limit: {alarmLow} {unit}"
        aria-hidden="true"
      ></div>
    {/if}
  </div>

  <!-- Scale Ticks (Medium Size Only) -->
  {#if size === 'md'}
    <div class="graphic-bar__scale" aria-hidden="true">
      <span>{min} {unit}</span>
      {#if target != null}
        <span style="color:var(--text-secondary)">Target {target} {unit}</span>
      {:else if alarmHigh != null}
        <span style="color:var(--status-warning)">Limit {alarmHigh} {unit}</span>
      {/if}
      <span>{max} {unit}</span>
    </div>
  {/if}
</div>

<style>
  .graphic-bar {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  .graphic-bar--sm {
    gap: 3px;
  }

  .graphic-bar__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .graphic-bar__label {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .graphic-bar__value {
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }
  .graphic-bar--sm .graphic-bar__value {
    font-size: 13px;
  }
  .graphic-bar__value--warn {
    color: var(--status-warning);
  }
  .graphic-bar__value--crit {
    color: var(--status-critical);
  }

  .graphic-bar__unit {
    font-size: 11px;
    font-weight: 400;
    color: var(--text-secondary);
    margin-left: 2px;
  }

  .graphic-bar__track {
    position: relative;
    width: 100%;
    height: 10px;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    border-radius: 5px;
    overflow: hidden;
  }
  .graphic-bar__track--sm {
    height: 6px;
    border-radius: 3px;
  }

  .graphic-bar__fill {
    height: 100%;
    border-radius: 4px;
    transition: width 350ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms ease;
  }

  .graphic-bar__marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    z-index: 2;
    transform: translateX(-50%);
  }
  .graphic-bar__marker--target {
    background-color: var(--text-primary);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  .graphic-bar__marker--alarm {
    background-color: var(--status-critical);
    box-shadow: 0 0 2px rgba(220, 38, 38, 0.5);
  }

  .graphic-bar__scale {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--text-muted);
    padding: 0 1px;
  }
</style>
