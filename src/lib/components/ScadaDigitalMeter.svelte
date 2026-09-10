<script lang="ts">
  export let label: string = 'VOLTAGE L1-N';
  export let value: number = 220.4;
  export let unit: string = 'VAC';
  export let decimals: number = 1;
  export let highLimit: number = 245.0;
  export let lowLimit: number = 200.0;
  export let colorTheme: 'green' | 'amber' | 'red' | 'blue' = 'green';
  export let showPeak: boolean = true;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  let peakMin = value;
  let peakMax = value;

  $: if (value > peakMax) peakMax = value;
  $: if (value < peakMin) peakMin = value;

  $: isHigh = value >= highLimit;
  $: isLow = value <= lowLimit;

  $: ledColorClass = isHigh || isLow
    ? 'led--critical'
    : `led--${colorTheme}`;

  function resetPeak() {
    peakMin = value;
    peakMax = value;
  }
</script>

<div class="digital-meter digital-meter--{size}">
  <div class="meter-bezel">
    <!-- Corner mounting screws for authentic industrial panel feel -->
    <span class="bezel-screw screw--tl"></span>
    <span class="bezel-screw screw--tr"></span>
    <span class="bezel-screw screw--bl"></span>
    <span class="bezel-screw screw--br"></span>

    <div class="meter-screen">
      <div class="meter-header">
        <span class="meter-label">{label}</span>
        <div class="meter-flags">
          <span class="flag-led" class:flag-led--active={isHigh}>HI</span>
          <span class="flag-led" class:flag-led--active={!isHigh && !isLow}>OK</span>
          <span class="flag-led" class:flag-led--active={isLow}>LO</span>
        </div>
      </div>

      <div class="meter-readout {ledColorClass}">
        <span class="meter-digits">
          {value !== null ? value.toFixed(decimals) : '----'}
        </span>
        <span class="meter-unit">{unit}</span>
      </div>

      {#if showPeak}
        <div class="meter-footer">
          <span class="peak-item">MIN: <strong>{peakMin.toFixed(decimals)}</strong></span>
          <button type="button" class="peak-reset-btn" on:click={resetPeak} title="Reset Min/Max">RST</button>
          <span class="peak-item">MAX: <strong>{peakMax.toFixed(decimals)}</strong></span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .digital-meter {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }

  .meter-bezel {
    position: relative;
    background: linear-gradient(135deg, #2b2e36 0%, #15181e 100%);
    border: 2px solid #3c4250;
    border-radius: 8px;
    padding: 10px;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.5);
  }

  .bezel-screw {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #555b6a;
    box-shadow: inset 0 1px 1px #888, 0 1px 1px #000;
  }
  .screw--tl { top: 4px; left: 4px; }
  .screw--tr { top: 4px; right: 4px; }
  .screw--bl { bottom: 4px; left: 4px; }
  .screw--br { bottom: 4px; right: 4px; }

  .meter-screen {
    background: #090b0e;
    border: 1px solid #1a1e26;
    border-radius: 4px;
    padding: 8px 10px;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.8);
  }

  .meter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1a202c;
    padding-bottom: 4px;
    margin-bottom: 6px;
  }

  .meter-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #8fa0b5;
    text-transform: uppercase;
  }

  .meter-flags {
    display: flex;
    gap: 4px;
  }

  .flag-led {
    font-size: 8px;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 2px;
    background: #14171d;
    color: #444b58;
  }

  .flag-led--active {
    background: #003314;
    color: #00e676;
    box-shadow: 0 0 4px #00e676;
  }

  .meter-readout {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    font-family: var(--font-mono);
    gap: 6px;
    padding: 4px 0;
  }

  .meter-digits {
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  .meter-unit {
    font-size: 11px;
    font-weight: 600;
  }

  /* LED Color palettes */
  .led--green { color: #00ff66; text-shadow: 0 0 10px rgba(0,255,102,0.4); }
  .led--amber { color: #ffaa00; text-shadow: 0 0 10px rgba(255,170,0,0.4); }
  .led--red { color: #ff3333; text-shadow: 0 0 10px rgba(255,51,51,0.5); }
  .led--blue { color: #00ccff; text-shadow: 0 0 10px rgba(0,204,255,0.4); }
  .led--critical { color: #ff1744; text-shadow: 0 0 12px #ff1744; animation: flash-crit 1s infinite; }

  @keyframes flash-crit {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .meter-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #1a202c;
    padding-top: 4px;
    margin-top: 4px;
    font-size: 9px;
    color: #6a778b;
    font-family: var(--font-mono);
  }

  .peak-reset-btn {
    background: #1e2430;
    color: #8da1bc;
    border: 1px solid #2d3646;
    border-radius: 2px;
    font-size: 8px;
    font-weight: 700;
    padding: 1px 4px;
    cursor: pointer;
  }
  .peak-reset-btn:hover {
    background: #2b3445;
    color: #fff;
  }

  /* ═══ Light Theme Industrial Instrument Styling ═══ */
  :global([data-theme="light"]) .meter-bezel {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #94a3b8;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  :global([data-theme="light"]) .bezel-screw {
    background: #94a3b8;
    box-shadow: inset 0 1px 1px #ffffff, 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  :global([data-theme="light"]) .meter-screen {
    background: #0b0f19;
    border: 1px solid #1e293b;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
  }

  :global([data-theme="light"]) .meter-label {
    color: #94a3b8;
  }

  :global([data-theme="light"]) .meter-footer {
    color: #8fa0b5;
    border-top: 1px solid #1e293b;
  }

  :global([data-theme="light"]) .peak-reset-btn {
    background: #1e293b;
    color: #cbd5e1;
    border-color: #334155;
  }

  :global([data-theme="light"]) .peak-reset-btn:hover {
    background: #334155;
    color: #ffffff;
  }
</style>
