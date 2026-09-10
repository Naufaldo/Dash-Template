<script lang="ts">
  import type { Quality } from '$lib/types/iot';

  export let label: string;
  export let value: number | null;
  export let unit: string;
  export let quality: Quality = 'GOOD';
  export let decimals = 1;

  $: display = value !== null && quality === 'GOOD'
    ? value.toFixed(decimals)
    : null;
</script>

<div class="metric">
  <span class="metric__label">{label}</span>
  {#if display !== null}
    <span class="metric__value">
      {display}<span class="metric__unit">{unit}</span>
    </span>
  {:else}
    <span class="metric__value metric__value--error" title="Quality: {quality}">--</span>
  {/if}
</div>

<style>
  .metric {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .metric__label {
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .metric__value {
    font-size: var(--font-lg);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-primary);
  }
  .metric__value--error {
    color: var(--status-critical);
  }
  .metric__unit {
    font-size: var(--font-xs);
    font-weight: 400;
    color: var(--color-text-secondary);
    margin-left: var(--space-xs);
  }
</style>
