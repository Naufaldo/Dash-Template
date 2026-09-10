<script lang="ts">
  import type { Quality } from '$lib/types/iot';

  export let label: string = '';
  export let value: number | null = null;
  export let unit: string = '°C';
  export let min: number = -30;
  export let max: number = 0;
  export let target: number | null = null; // Setpoint (SP) marker
  export let alarmHigh: number | null = null; // High warning / trip threshold
  export let alarmLow: number | null = null; // Low warning / trip threshold
  export let quality: Quality = 'GOOD';
  export let decimals: number = 1;
  export let size: 'sm' | 'md' = 'sm';
  export let type: 'primary' | 'secondary' | 'temp' | 'pressure' | string = 'primary';

  // Geometry parameters for 240° sweep arc
  const cx = 70;
  const cy = 65;
  const r = 46;
  const startAngle = 150; // degrees, bottom-left
  const sweepAngle = 240; // degrees total sweep

  function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
  }

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = degToRad(angleInDegrees);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }

  function describeArc(centerX: number, centerY: number, radius: number, startDeg: number, endDeg: number) {
    if (endDeg - startDeg >= 360) {
      endDeg = startDeg + 359.99;
    }
    const start = polarToCartesian(centerX, centerY, radius, endDeg);
    const end = polarToCartesian(centerX, centerY, radius, startDeg);
    const largeArcFlag = endDeg - startDeg <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  }

  function clamp(val: number, minimum: number, maximum: number) {
    return Math.min(Math.max(val, minimum), maximum);
  }

  $: valClamped = value !== null ? clamp(value, min, max) : min;
  $: fraction = (max - min) > 0 ? (valClamped - min) / (max - min) : 0;
  $: currentAngle = startAngle + fraction * sweepAngle;

  // Setpoint angle
  $: targetAngle = target !== null
    ? startAngle + (clamp(target, min, max) - min) / (max - min) * sweepAngle
    : null;

  // Alarm angle
  $: alarmHighAngle = alarmHigh !== null
    ? startAngle + (clamp(alarmHigh, min, max) - min) / (max - min) * sweepAngle
    : null;

  // Formatted display
  $: displayValue = value !== null && quality === 'GOOD'
    ? value.toFixed(decimals)
    : '—';

  // State evaluation
  $: isWarning = (alarmHigh !== null && value !== null && value >= alarmHigh) ||
                (alarmLow !== null && value !== null && value <= alarmLow);

  $: primaryColor = isWarning
    ? 'var(--status-warning, #f59e0b)'
    : type === 'temp'
      ? 'var(--color-temp, #38bdf8)'
      : 'var(--color-pressure, #a78bfa)';

  // Needle coordinates
  $: needleLength = r - 6;
  $: needleTip = polarToCartesian(cx, cy, needleLength, currentAngle);
  $: needleBaseLeft = polarToCartesian(cx, cy, 5, currentAngle + 90);
  $: needleBaseRight = polarToCartesian(cx, cy, 5, currentAngle - 90);
  $: needleTail = polarToCartesian(cx, cy, 8, currentAngle + 180);

  // Min & Max scale legend positions
  $: pMin = polarToCartesian(cx, cy, r - 12, startAngle);
  $: pMax = polarToCartesian(cx, cy, r - 12, startAngle + sweepAngle);
</script>

<div class="scada-gauge scada-gauge--{size} scada-gauge--{type}" class:scada-gauge--warning={isWarning}>
  <div class="scada-gauge__header">
    <span class="scada-gauge__label">{label}</span>
    {#if target !== null}
      <span class="scada-gauge__sp-tag" title="Target Setpoint: {target}{unit}">
        SP: {target > 0 ? `+${target}` : target}{unit}
      </span>
    {/if}
  </div>

  <div class="scada-gauge__canvas-wrap">
    <svg
      viewBox="0 0 140 120"
      class="scada-gauge__svg"
      role="img"
      aria-label="{label}: {displayValue} {unit}"
    >
      <defs>
        <!-- Metallic / Dark Bezel Gradient -->
        <linearGradient id="bezel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--border-subtle, #334155)" stop-opacity="0.8" />
          <stop offset="100%" stop-color="var(--bg-app, #0f172a)" stop-opacity="0.9" />
        </linearGradient>

        <!-- Active Arc Gradient -->
        <linearGradient id="gauge-arc-grad-{type}" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color={type === 'temp' ? '#0284c7' : '#7c3aed'} />
          <stop offset="100%" stop-color={primaryColor} />
        </linearGradient>
      </defs>

      <!-- Background Bezel Dial Ring -->
      <circle cx={cx} cy={cy} r={r + 10} class="gauge-dial-bg" />

      <!-- Background Track Arc -->
      <path
        d={describeArc(cx, cy, r, startAngle, startAngle + sweepAngle)}
        class="gauge-track-bg"
      />

      <!-- Alarm / Warning High Sector (if applicable) -->
      {#if alarmHighAngle !== null && alarmHighAngle < startAngle + sweepAngle}
        <path
          d={describeArc(cx, cy, r, alarmHighAngle, startAngle + sweepAngle)}
          class="gauge-alarm-zone"
        />
      {/if}

      <!-- Active Filled Progress Arc -->
      {#if value !== null && quality === 'GOOD' && currentAngle > startAngle}
        <path
          d={describeArc(cx, cy, r, startAngle, currentAngle)}
          stroke="url(#gauge-arc-grad-{type})"
          class="gauge-progress-arc"
        />
      {/if}

      <!-- Scale Graduation Ticks (5 major ticks) -->
      {#each [0, 0.25, 0.5, 0.75, 1] as tickFrac}
        {@const tickAngle = startAngle + tickFrac * sweepAngle}
        {@const pOuter = polarToCartesian(cx, cy, r + 5, tickAngle)}
        {@const pInner = polarToCartesian(cx, cy, r - 3, tickAngle)}
        <line
          x1={pInner.x}
          y1={pInner.y}
          x2={pOuter.x}
          y2={pOuter.y}
          class="gauge-tick"
        />
      {/each}

      <!-- Setpoint SP Marker (Notch) -->
      {#if targetAngle !== null}
        {@const spOuter = polarToCartesian(cx, cy, r + 8, targetAngle)}
        {@const spInner = polarToCartesian(cx, cy, r - 7, targetAngle)}
        <line
          x1={spInner.x}
          y1={spInner.y}
          x2={spOuter.x}
          y2={spOuter.y}
          class="gauge-sp-marker"
        >
          <title>Setpoint SP: {target}{unit}</title>
        </line>
      {/if}

      <!-- Needle Pointer -->
      {#if value !== null && quality === 'GOOD'}
        <polygon
          points="{needleTip.x},{needleTip.y} {needleBaseRight.x},{needleBaseRight.y} {needleTail.x},{needleTail.y} {needleBaseLeft.x},{needleBaseLeft.y}"
          class="gauge-needle"
          style="fill: {primaryColor};"
        />
      {/if}

      <!-- Center Bezel Pivot Cap -->
      <circle cx={cx} cy={cy} r="6.5" class="gauge-center-bezel" />
      <circle cx={cx} cy={cy} r="3" class="gauge-center-cap" style="fill: {primaryColor};" />

      <!-- Min & Max Scale Legends -->
      <text x={pMin.x} y={pMin.y + 4} class="gauge-scale-text" text-anchor="middle">{min}</text>
      <text x={pMax.x} y={pMax.y + 4} class="gauge-scale-text" text-anchor="middle">{max}</text>
    </svg>

    <!-- Digital Process Value (PV) High-Contrast Readout -->
    <div class="scada-gauge__digital-readout">
      <span class="scada-gauge__pv-val" style="color: {primaryColor};">
        {displayValue}
      </span>
      <span class="scada-gauge__unit">{unit}</span>
    </div>
  </div>
</div>

<style>
  .scada-gauge {
    background: var(--bg-surface-elevated, #1e293b);
    border: 1px solid var(--border-subtle, #334155);
    border-radius: var(--radius-md, 8px);
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    user-select: none;
    transition: border-color var(--ease-default, 150ms ease);
  }
  .scada-gauge:hover {
    border-color: var(--border-strong, #475569);
  }
  .scada-gauge--warning {
    border-color: var(--status-warning, #f59e0b);
    background: var(--status-warning-subtle, rgba(245, 158, 11, 0.05));
  }

  .scada-gauge__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
    font-size: 11px;
    gap: 4px;
  }

  .scada-gauge__label {
    font-weight: 600;
    color: var(--text-secondary, #94a3b8);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .scada-gauge__sp-tag {
    font-family: var(--font-mono, monospace);
    font-size: 10px;
    font-weight: 600;
    color: var(--color-primary, #38bdf8);
    background: var(--color-primary-subtle, rgba(56, 189, 248, 0.12));
    padding: 1px 5px;
    border-radius: 4px;
    border: 1px solid var(--border-subtle, #334155);
  }

  .scada-gauge__canvas-wrap {
    width: 100%;
    max-width: 150px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scada-gauge__svg {
    width: 100%;
    height: auto;
    display: block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
  }

  /* SVG Internal Styles */
  .gauge-dial-bg {
    fill: var(--bg-app, #0b0f19);
    stroke: var(--border-subtle, #1e293b);
    stroke-width: 1.5;
  }

  .gauge-track-bg {
    fill: none;
    stroke: var(--border-strong, #334155);
    stroke-width: 7;
    stroke-linecap: round;
    opacity: 0.6;
  }

  .gauge-alarm-zone {
    fill: none;
    stroke: var(--status-critical, #ef4444);
    stroke-width: 7;
    stroke-linecap: round;
    opacity: 0.85;
  }

  .gauge-progress-arc {
    fill: none;
    stroke-width: 7;
    stroke-linecap: round;
    transition: stroke-dasharray 350ms ease, stroke 200ms ease;
  }

  .gauge-tick {
    stroke: var(--text-muted, #64748b);
    stroke-width: 1.5;
    stroke-linecap: round;
  }

  .gauge-sp-marker {
    stroke: #10b981; /* Emerald green Setpoint Notch */
    stroke-width: 2.5;
    stroke-linecap: round;
    filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.8));
  }

  .gauge-needle {
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
    transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .gauge-center-bezel {
    fill: var(--bg-surface-elevated, #1e293b);
    stroke: var(--border-strong, #475569);
    stroke-width: 1.5;
  }

  .gauge-center-cap {
    transition: fill 200ms ease;
  }

  .gauge-scale-text {
    font-family: var(--font-mono, monospace);
    font-size: 8px;
    font-weight: 600;
    fill: var(--text-muted, #64748b);
  }

  /* Digital Readout below needle pivot */
  .scada-gauge__digital-readout {
    position: absolute;
    bottom: 2px;
    display: flex;
    align-items: baseline;
    gap: 3px;
    background: var(--bg-app, #0b0f19);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid var(--border-subtle, #334155);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .scada-gauge__pv-val {
    font-family: var(--font-mono, monospace);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .scada-gauge__unit {
    font-family: var(--font-mono, monospace);
    font-size: 10px;
    font-weight: 500;
    color: var(--text-secondary, #94a3b8);
  }

  /* Medium size variant */
  .scada-gauge--md .scada-gauge__canvas-wrap {
    max-width: 190px;
  }
  .scada-gauge--md .scada-gauge__pv-val {
    font-size: 18px;
  }
  .scada-gauge--md .scada-gauge__unit {
    font-size: 11px;
  }
</style>
