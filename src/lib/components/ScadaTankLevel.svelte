<script lang="ts">
  export let label: string = 'Tank 01';
  export let value: number = 65.5; // percentage or cubic
  export let unit: string = '%';
  export let maxCapacity: number = 100;
  export let lowAlarm: number = 20;
  export let lowLowAlarm: number = 10;
  export let highAlarm: number = 85;
  export let highHighAlarm: number = 95;
  export let fluidColor: string = 'var(--color-primary)';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  $: percent = Math.max(0, Math.min(100, (value / maxCapacity) * 100));

  $: isHighHigh = value >= highHighAlarm;
  $: isHigh = !isHighHigh && value >= highAlarm;
  $: isLowLow = value <= lowLowAlarm;
  $: isLow = !isLowLow && value <= lowAlarm;

  $: activeColor = isHighHigh || isLowLow
    ? 'var(--status-critical)'
    : isHigh || isLow
    ? 'var(--status-warning)'
    : fluidColor;

  $: fillHeight = (percent / 100) * 150; // out of 150px height
  $: fillY = 170 - fillHeight;
</script>

<div class="tank-gauge tank-gauge--{size}">
  <div class="tank-gauge__canvas">
    <svg viewBox="0 0 120 190" class="tank-svg" aria-label="{label}: {value}{unit}">
      <defs>
        <!-- Metallic tank gradient -->
        <linearGradient id="tankWall" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--border-strong)" stop-opacity="0.8" />
          <stop offset="25%" stop-color="var(--bg-canvas)" stop-opacity="0.2" />
          <stop offset="75%" stop-color="var(--bg-canvas)" stop-opacity="0.2" />
          <stop offset="100%" stop-color="var(--border-strong)" stop-opacity="0.8" />
        </linearGradient>

        <!-- Fluid gradient -->
        <linearGradient id="fluidGrad-{label}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color={activeColor} stop-opacity="0.9" />
          <stop offset="50%" stop-color={activeColor} stop-opacity="1" />
          <stop offset="100%" stop-color={activeColor} stop-opacity="0.75" />
        </linearGradient>
      </defs>

      <!-- Tank outline with rounded caps -->
      <rect x="25" y="20" width="70" height="150" rx="14" fill="url(#tankWall)" stroke="var(--border-strong)" stroke-width="2" />

      <!-- Fluid fill clipped inside tank -->
      <g clip-path="url(#tankClip-{label})">
        <clipPath id="tankClip-{label}">
          <rect x="26" y="21" width="68" height="148" rx="13" />
        </clipPath>
        
        <!-- Fluid body -->
        <rect
          x="26"
          y={fillY}
          width="68"
          height={fillHeight}
          fill="url(#fluidGrad-{label})"
          class="fluid-rect"
        />

        <!-- Animated fluid surface ripple line -->
        {#if percent > 2}
          <ellipse
            cx="60"
            cy={fillY}
            rx="34"
            ry="4"
            fill={activeColor}
            opacity="0.8"
          />
        {/if}
      </g>

      <!-- Level Tick Marks & Alarm Indicators -->
      <!-- High High (HH) -->
      <line x1="97" y1={170 - (highHighAlarm / 100) * 150} x2="108" y2={170 - (highHighAlarm / 100) * 150} stroke="var(--status-critical)" stroke-width="2" />
      <text x="110" y={173 - (highHighAlarm / 100) * 150} font-size="7" fill="var(--status-critical)" font-weight="700">HH</text>

      <!-- High (H) -->
      <line x1="97" y1={170 - (highAlarm / 100) * 150} x2="105" y2={170 - (highAlarm / 100) * 150} stroke="var(--status-warning)" stroke-width="1.5" />
      <text x="107" y={173 - (highAlarm / 100) * 150} font-size="7" fill="var(--status-warning)">H</text>

      <!-- Low (L) -->
      <line x1="97" y1={170 - (lowAlarm / 100) * 150} x2="105" y2={170 - (lowAlarm / 100) * 150} stroke="var(--status-warning)" stroke-width="1.5" />
      <text x="107" y={173 - (lowAlarm / 100) * 150} font-size="7" fill="var(--status-warning)">L</text>

      <!-- Low Low (LL) -->
      <line x1="97" y1={170 - (lowLowAlarm / 100) * 150} x2="108" y2={170 - (lowLowAlarm / 100) * 150} stroke="var(--status-critical)" stroke-width="2" />
      <text x="110" y={173 - (lowLowAlarm / 100) * 150} font-size="7" fill="var(--status-critical)" font-weight="700">LL</text>

      <!-- Scale ticks (0, 25, 50, 75, 100) on left -->
      <line x1="18" y1="20" x2="25" y2="20" stroke="var(--color-text-secondary)" stroke-width="1" />
      <text x="5" y="23" font-size="7" fill="var(--color-text-secondary)">100</text>

      <line x1="20" y1="57.5" x2="25" y2="57.5" stroke="var(--color-text-secondary)" stroke-width="0.8" opacity="0.6" />
      <line x1="18" y1="95" x2="25" y2="95" stroke="var(--color-text-secondary)" stroke-width="1" />
      <text x="8" y="98" font-size="7" fill="var(--color-text-secondary)">50</text>

      <line x1="20" y1="132.5" x2="25" y2="132.5" stroke="var(--color-text-secondary)" stroke-width="0.8" opacity="0.6" />
      <line x1="18" y1="170" x2="25" y2="170" stroke="var(--color-text-secondary)" stroke-width="1" />
      <text x="12" y="173" font-size="7" fill="var(--color-text-secondary)">0</text>
    </svg>
  </div>

  <div class="tank-gauge__info">
    <div class="tank-gauge__value" style="color: {activeColor}">
      {value.toFixed(1)}<span class="tank-gauge__unit">{unit}</span>
    </div>
    <div class="tank-gauge__percent">
      {percent.toFixed(0)}% Cap
    </div>
  </div>
</div>

<style>
  .tank-gauge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-xs);
  }

  .tank-gauge--sm .tank-svg { height: 110px; }
  .tank-gauge--md .tank-svg { height: 150px; }
  .tank-gauge--lg .tank-svg { height: 210px; }

  .tank-svg {
    width: auto;
    display: block;
    overflow: visible;
  }

  .fluid-rect {
    transition: y 0.5s ease, height 0.5s ease;
  }

  .tank-gauge__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tank-gauge__value {
    font-size: var(--font-xl);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .tank-gauge__unit {
    font-size: var(--font-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-left: 2px;
  }

  .tank-gauge__percent {
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }
</style>
