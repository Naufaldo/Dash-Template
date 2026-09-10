<script lang="ts">
  import { onMount } from 'svelte';

  export let value: number | null = null;
  export let points: number[] = [];
  export let unit: string = '°C';
  export let label: string = 'Trend';
  export let maxPoints: number = 14;
  export let color: string = 'var(--color-primary, #00c853)';
  export let height: number = 32;

  let history: number[] = [];

  $: if (points && points.length > 0) {
    history = points;
  }

  onMount(() => {
    if (history.length === 0 && value !== null) {
      const base = value;
      history = Array.from({ length: maxPoints }, (_, i) => {
        const offset = (Math.sin(i / 2) * 0.15) - 0.05;
        return Number((base + offset).toFixed(2));
      });
    }
  });

  $: if (points.length === 0 && value !== null) {
    if (history.length === 0) {
      history = [value];
    } else {
      const last = history[history.length - 1];
      if (last !== value) {
        history = [...history.slice(-(maxPoints - 1)), value];
      }
    }
  }

  const width = 120;
  const padding = 3;

  $: minVal = history.length > 0 ? Math.min(...history) : 0;
  $: maxVal = history.length > 0 ? Math.max(...history) : 1;
  $: range = maxVal - minVal > 0.01 ? maxVal - minVal : 1;

  $: svgPoints = history.map((val, idx) => {
    const x = padding + (idx / Math.max(history.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  $: linePath = svgPoints.length > 0
    ? svgPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    : '';

  $: areaPath = svgPoints.length > 0
    ? `${linePath} L ${svgPoints[svgPoints.length - 1].x} ${height} L ${svgPoints[0].x} ${height} Z`
    : '';

  $: trendDelta = history.length >= 3
    ? history[history.length - 1] - history[history.length - 3]
    : 0;

  $: trendIcon = Math.abs(trendDelta) < 0.05
    ? '→'
    : trendDelta > 0 ? '↑' : '↓';
</script>

<div class="scada-sparkline">
  <div class="scada-sparkline__top">
    <span class="scada-sparkline__label">{label}</span>
    <div class="scada-sparkline__stats">
      <span class="scada-sparkline__trend" title="Delta: {trendDelta > 0 ? '+' : ''}{trendDelta.toFixed(2)}{unit}">
        {trendIcon}
      </span>
      <span class="scada-sparkline__bounds">
        {minVal.toFixed(1)}~{maxVal.toFixed(1)}{unit}
      </span>
    </div>
  </div>

  <svg viewBox="0 0 {width} {height}" class="scada-sparkline__svg">
    <defs>
      <linearGradient id="sparkline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color={color} stop-opacity="0.25" />
        <stop offset="100%" stop-color={color} stop-opacity="0.0" />
      </linearGradient>
    </defs>

    {#if areaPath}
      <path d={areaPath} fill="url(#sparkline-grad)" />
    {/if}

    {#if linePath}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/if}

    {#if svgPoints.length > 0}
      {@const last = svgPoints[svgPoints.length - 1]}
      <circle cx={last.x} cy={last.y} r="2.5" fill={color} stroke="var(--bg-canvas, #0f172a)" stroke-width="1" />
    {/if}
  </svg>
</div>

<style>
  .scada-sparkline {
    background: var(--bg-canvas, #0b0f19);
    border: 1px solid var(--border-subtle, #1e293b);
    border-radius: var(--radius-sm, 6px);
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .scada-sparkline__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9px;
  }

  .scada-sparkline__label {
    font-family: var(--font-mono, monospace);
    font-weight: 600;
    color: var(--color-text-secondary, #64748b);
    text-transform: uppercase;
  }

  .scada-sparkline__stats {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-mono, monospace);
  }

  .scada-sparkline__trend {
    font-weight: 700;
    color: var(--color-primary, #00c853);
  }

  .scada-sparkline__bounds {
    font-size: 8px;
    color: var(--color-text-secondary, #64748b);
  }

  .scada-sparkline__svg {
    width: 100%;
    height: 24px;
    display: block;
    overflow: visible;
  }
</style>
