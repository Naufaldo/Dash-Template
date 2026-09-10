<script lang="ts">
  export let label: string;
  export let state: 'run' | 'aux' | 'warn' | 'trip' | 'comm' | 'off' = 'off';
  export let size: 'sm' | 'md' = 'sm';
  export let tooltip: string = '';
  export let pulse: boolean = false;

  $: colorMap = {
    run: {
      core: '#10b981',
      glow: 'rgba(16, 185, 129, 0.45)',
      ring: '#059669',
      statusText: 'RUN'
    },
    aux: {
      core: '#2563eb',
      glow: 'rgba(37, 99, 235, 0.5)',
      ring: '#1d4ed8',
      statusText: 'AUX'
    },
    warn: {
      core: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.45)',
      ring: '#d97706',
      statusText: 'WARN'
    },
    trip: {
      core: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.6)',
      ring: '#dc2626',
      statusText: 'TRIP'
    },
    comm: {
      core: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.45)',
      ring: '#0891b2',
      statusText: 'COMM'
    },
    off: {
      core: '#334155',
      glow: 'none',
      ring: '#1e293b',
      statusText: 'OFF'
    }
  };

  $: activeColor = colorMap[state] || colorMap.off;
</script>

<div
  class="scada-pilot scada-pilot--{size} scada-pilot--{state}"
  title={tooltip || `${label}: ${activeColor.statusText}`}
  role="status"
  aria-label="${label} is ${activeColor.statusText}"
>
  <div class="scada-pilot__lamp">
    <svg viewBox="0 0 24 24" class="scada-pilot__svg" aria-hidden="true">
      <defs>
        <!-- Bezel metallic gradient -->
        <linearGradient id="pilot-bezel-{state}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--border-strong, #475569)" />
          <stop offset="50%" stop-color="var(--border-subtle, #1e293b)" />
          <stop offset="100%" stop-color="var(--border-strong, #334155)" />
        </linearGradient>

        <!-- Lens reflection gradient -->
        <radialGradient id="pilot-jewel-{state}" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
          <stop offset="35%" stop-color={activeColor.core} stop-opacity="0.9" />
          <stop offset="100%" stop-color={activeColor.ring} />
        </radialGradient>
      </defs>

      <!-- Outer Bezel Ring -->
      <circle cx="12" cy="12" r="11" fill="url(#pilot-bezel-{state})" stroke="var(--border-default, #30363d)" stroke-width="1" />

      <!-- Inner Recess -->
      <circle cx="12" cy="12" r="8.5" fill="var(--bg-app, #0b0f19)" />

      <!-- Jewel Lens with Glow -->
      <circle
        cx="12"
        cy="12"
        r="7"
        fill="url(#pilot-jewel-{state})"
        class="pilot-lens"
        class:pilot-lens--pulse={pulse || state === 'trip'}
        style="filter: {state !== 'off' ? `drop-shadow(0 0 4px ${activeColor.glow})` : 'none'};"
      />
    </svg>
  </div>

  <span class="scada-pilot__label">{label}</span>
</div>

<style>
  .scada-pilot {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    user-select: none;
  }

  .scada-pilot__lamp {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scada-pilot--sm .scada-pilot__svg {
    width: 18px;
    height: 18px;
  }

  .scada-pilot--md .scada-pilot__svg {
    width: 24px;
    height: 24px;
  }

  .scada-pilot__label {
    font-size: 9px;
    font-weight: 700;
    font-family: var(--font-mono, monospace);
    color: var(--text-secondary, #94a3b8);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
    white-space: nowrap;
  }

  .scada-pilot--run .scada-pilot__label { color: var(--status-online, #10b981); }
  .scada-pilot--aux .scada-pilot__label { color: #3b82f6; }
  .scada-pilot--warn .scada-pilot__label { color: var(--status-warning, #f59e0b); }
  .scada-pilot--trip .scada-pilot__label { color: var(--status-critical, #ef4444); }
  .scada-pilot--comm .scada-pilot__label { color: #06b6d4; }

  /* Pulsing animation */
  .pilot-lens--pulse {
    animation: pilot-blink 1s ease-in-out infinite;
  }

  @keyframes pilot-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
</style>
