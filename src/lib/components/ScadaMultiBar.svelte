<script context="module" lang="ts">
  export interface ChannelData {
    label: string;
    value: number;
    unit: string;
    max: number;
    color?: string;
  }
</script>

<script lang="ts">
  export let title: string = '3-PHASE CURRENT DRAW';
  export let channels: ChannelData[] = [
    { label: 'L1 (R)', value: 18.4, unit: 'A', max: 30, color: '#ff4444' },
    { label: 'L2 (S)', value: 17.9, unit: 'A', max: 30, color: '#ffbb00' },
    { label: 'L3 (T)', value: 18.8, unit: 'A', max: 30, color: '#3388ff' }
  ];
</script>

<div class="multi-bar">
  <div class="multi-bar__title">{title}</div>
  <div class="multi-bar__list">
    {#each channels as ch}
      {@const pct = Math.max(0, Math.min(100, (ch.value / ch.max) * 100))}
      <div class="channel-row">
        <span class="channel-label">{ch.label}</span>
        <div class="channel-track">
          <div
            class="channel-fill"
            style="width: {pct}%; background-color: {ch.color || 'var(--color-primary)'};"
          ></div>
        </div>
        <span class="channel-value">{ch.value.toFixed(1)} {ch.unit}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .multi-bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .multi-bar__title {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-secondary);
    letter-spacing: 0.05em;
  }

  .multi-bar__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .channel-row {
    display: grid;
    grid-template-columns: 48px 1fr 52px;
    align-items: center;
    gap: 8px;
    font-size: 10px;
  }

  .channel-label {
    color: var(--color-text-secondary);
    font-weight: 600;
  }

  .channel-track {
    height: 10px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    border-radius: 2px;
    overflow: hidden;
  }

  .channel-fill {
    height: 100%;
    transition: width 0.4s ease;
  }

  .channel-value {
    font-family: var(--font-mono);
    font-weight: 700;
    color: var(--color-text-primary);
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
</style>
