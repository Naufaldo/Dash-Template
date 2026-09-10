<script lang="ts">
  export let dischargePressure: number = 15.4; // bar
  export let dischargeTemp: number = 72.8;     // °C
  export let condensingTemp: number = 42.0;    // °C
  export let liquidTemp: number = 36.5;        // °C
  export let suctionPressure: number = 2.1;    // bar
  export let suctionTemp: number = -12.4;      // °C
  export let evaporatingTemp: number = -22.0;  // °C
  export let roomTemp: number = -18.5;         // °C
  export let roomSetpoint: number = -20.0;     // °C
  export let compressorState: boolean = true;
  export let condenserFanState: boolean = true;
  export let evaporatorFanState: boolean = true;
  export let defrostHeaterState: boolean = false;
  export let mode: 'cooling' | 'defrost' | 'pump_down' | 'standby' = 'cooling';

  // Derived calculations
  $: subcooling = Math.max(0, condensingTemp - liquidTemp);
  $: superheat = Math.max(0, suctionTemp - evaporatingTemp);
</script>

<div class="rhvac-mimic">
  <div class="rhvac-header">
    <div class="rhvac-title-group">
      <span class="rhvac-badge">RHVAC P&ID</span>
      <h4>Refrigeration & Heat Transfer Cycle</h4>
    </div>
    <div class="rhvac-modes">
      <span class="mode-pill mode-pill--{mode}">MODE: {mode.toUpperCase()}</span>
    </div>
  </div>

  <svg viewBox="0 0 800 480" class="mimic-svg">
    <defs>
      <!-- Gradients for piping flow -->
      <linearGradient id="dischargeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff3d00" />
        <stop offset="100%" stop-color="#ff6d00" />
      </linearGradient>

      <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ff9100" />
        <stop offset="100%" stop-color="#ffab00" />
      </linearGradient>

      <linearGradient id="suctionGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00b0ff" />
        <stop offset="100%" stop-color="#00e5ff" />
      </linearGradient>
    </defs>

    <!-- Background Enclosures -->
    <!-- Outdoor CDU Enclosure -->
    <rect x="30" y="40" width="320" height="400" rx="8" fill="var(--bg-canvas)" stroke="var(--border-subtle)" stroke-dasharray="4,4" />
    <text x="45" y="65" font-size="11" font-weight="700" fill="var(--color-text-secondary)">OUTDOOR CONDENSING UNIT (CDU)</text>

    <!-- Cold Room Enclosure -->
    <rect x="440" y="40" width="330" height="400" rx="8" fill="var(--bg-canvas)" stroke="var(--color-primary)" stroke-width="1.5" />
    <text x="455" y="65" font-size="11" font-weight="700" fill="var(--color-primary)">INSULATED COLD ROOM ENCLOSURE</text>

    <!-- ================= PIPING PATHS ================= -->
    <!-- 1. Discharge Line (Compressor -> Condenser) -->
    <path
      d="M 170 330 L 170 120 L 220 120"
      fill="none"
      stroke="url(#dischargeGrad)"
      stroke-width="5"
      stroke-linecap="round"
      class="pipe-flow"
      class:pipe-active={compressorState}
    />

    <!-- 2. Liquid Line (Condenser -> Receiver -> Filter Drier -> TXV) -->
    <path
      d="M 280 180 L 280 230 L 280 280 L 410 280 L 410 210 L 490 210"
      fill="none"
      stroke="url(#liquidGrad)"
      stroke-width="4"
      stroke-linecap="round"
      class="pipe-flow"
      class:pipe-active={compressorState}
    />

    <!-- 3. Expansion to Evaporator Line -->
    <path
      d="M 520 210 L 560 210"
      fill="none"
      stroke="#00e5ff"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- 4. Suction Line (Evaporator -> Accumulator -> Compressor) -->
    <path
      d="M 640 250 L 640 400 L 110 400 L 110 350 L 130 350"
      fill="none"
      stroke="url(#suctionGrad)"
      stroke-width="6"
      stroke-linecap="round"
      class="pipe-flow"
      class:pipe-active={compressorState}
    />

    <!-- ================= EQUIPMENT NODES ================= -->

    <!-- COMPRESSOR -->
    <g transform="translate(130, 310)">
      <circle cx="28" cy="28" r="26" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2.5" />
      <path d="M 18 28 Q 28 14 38 28 T 58 28" fill="none" stroke="var(--color-primary)" stroke-width="2" />
      <text x="28" y="24" text-anchor="middle" font-size="10" font-weight="800" fill="var(--color-text-primary)">COMP</text>
      <text x="28" y="38" text-anchor="middle" font-size="8" font-weight="700" fill={compressorState ? 'var(--status-normal)' : 'var(--status-offline)'}>
        {compressorState ? 'RUNNING' : 'STOPPED'}
      </text>
    </g>

    <!-- CONDENSER COIL -->
    <g transform="translate(220, 95)">
      <rect x="0" y="0" width="70" height="70" rx="4" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5" />
      <path d="M 10 15 H 60 M 10 25 H 60 M 10 35 H 60 M 10 45 H 60 M 10 55 H 60" stroke="#ff5722" stroke-width="2" stroke-dasharray="3,2" />
      <!-- Condenser Fan -->
      <circle cx="35" cy="35" r="16" fill="none" stroke={condenserFanState ? "var(--status-normal)" : "var(--color-text-secondary)"} stroke-width="1.5" class:fan-active={condenserFanState} />
      <text x="35" y="38" text-anchor="middle" font-size="8" font-weight="700" fill="var(--color-text-primary)">COND</text>
    </g>

    <!-- LIQUID RECEIVER -->
    <g transform="translate(265, 230)">
      <rect x="0" y="0" width="30" height="40" rx="8" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5" />
      <text x="15" y="24" text-anchor="middle" font-size="7" font-weight="700" fill="var(--color-text-secondary)">REC</text>
    </g>

    <!-- FILTER DRIER -->
    <g transform="translate(320, 270)">
      <polygon points="0,10 20,0 20,20" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5" />
      <polygon points="40,10 20,0 20,20" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5" />
      <text x="20" y="28" text-anchor="middle" font-size="7" fill="var(--color-text-secondary)">DRIER</text>
    </g>

    <!-- EXPANSION VALVE (TXV) -->
    <g transform="translate(490, 195)">
      <polygon points="0,0 30,30 30,0 0,30" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2" />
      <text x="15" y="42" text-anchor="middle" font-size="8" font-weight="800" fill="var(--color-text-primary)">TXV</text>
    </g>

    <!-- EVAPORATOR COIL -->
    <g transform="translate(560, 175)">
      <rect x="0" y="0" width="80" height="90" rx="4" fill="var(--bg-surface)" stroke="var(--color-primary)" stroke-width="2" />
      <path d="M 12 20 H 68 M 12 35 H 68 M 12 50 H 68 M 12 65 H 68 M 12 80 H 68" stroke="#00b0ff" stroke-width="2.5" />
      <!-- Evap Fans -->
      <circle cx="25" cy="45" r="14" fill="none" stroke={evaporatorFanState ? "var(--color-primary)" : "var(--color-text-secondary)"} stroke-width="1.5" class:fan-active={evaporatorFanState} />
      <circle cx="55" cy="45" r="14" fill="none" stroke={evaporatorFanState ? "var(--color-primary)" : "var(--color-text-secondary)"} stroke-width="1.5" class:fan-active={evaporatorFanState} />
      <text x="40" y="48" text-anchor="middle" font-size="9" font-weight="800" fill="var(--color-text-primary)">EVAP</text>
      {#if defrostHeaterState}
        <rect x="5" y="80" width="70" height="6" fill="#ff3d00" rx="2" class="heater-glow" />
      {/if}
    </g>

    <!-- SUCTION ACCUMULATOR -->
    <g transform="translate(90, 310)">
      <rect x="0" y="0" width="24" height="42" rx="6" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5" />
      <text x="12" y="24" text-anchor="middle" font-size="7" font-weight="700" fill="var(--color-text-secondary)">ACC</text>
    </g>

    <!-- ================= TELEMETRY CALLOUT BADGES ================= -->

    <!-- 1. Discharge Callout -->
    <g transform="translate(195, 55)">
      <rect x="0" y="0" width="105" height="34" rx="4" fill="var(--bg-surface)" stroke="#ff3d00" stroke-width="1" />
      <text x="6" y="14" font-size="8" font-weight="700" fill="#ff3d00">DISCHARGE (P_d / T_d)</text>
      <text x="6" y="28" font-size="11" font-weight="800" font-family="var(--font-mono)" fill="var(--color-text-primary)">
        {dischargePressure.toFixed(1)} bar | {dischargeTemp.toFixed(1)}°C
      </text>
    </g>

    <!-- 2. Subcooling Callout -->
    <g transform="translate(300, 175)">
      <rect x="0" y="0" width="95" height="34" rx="4" fill="var(--bg-surface)" stroke="#ff9100" stroke-width="1" />
      <text x="6" y="14" font-size="8" font-weight="700" fill="#ff9100">SUBCOOLING (SC)</text>
      <text x="6" y="28" font-size="11" font-weight="800" font-family="var(--font-mono)" fill="var(--color-text-primary)">
        {subcooling.toFixed(1)} K ({liquidTemp.toFixed(1)}°C)
      </text>
    </g>

    <!-- 3. Suction Callout -->
    <g transform="translate(230, 410)">
      <rect x="0" y="0" width="105" height="34" rx="4" fill="var(--bg-surface)" stroke="#00b0ff" stroke-width="1" />
      <text x="6" y="14" font-size="8" font-weight="700" fill="#00b0ff">SUCTION (P_s / T_s)</text>
      <text x="6" y="28" font-size="11" font-weight="800" font-family="var(--font-mono)" fill="var(--color-text-primary)">
        {suctionPressure.toFixed(1)} bar | {suctionTemp.toFixed(1)}°C
      </text>
    </g>

    <!-- 4. Superheat Callout -->
    <g transform="translate(530, 310)">
      <rect x="0" y="0" width="95" height="34" rx="4" fill="var(--bg-surface)" stroke="#00e5ff" stroke-width="1" />
      <text x="6" y="14" font-size="8" font-weight="700" fill="#00e5ff">SUPERHEAT (SH)</text>
      <text x="6" y="28" font-size="11" font-weight="800" font-family="var(--font-mono)" fill="var(--color-text-primary)">
        {superheat.toFixed(1)} K (T_e: {evaporatingTemp.toFixed(1)}°C)
      </text>
    </g>

    <!-- 5. Cold Room Temperature Callout -->
    <g transform="translate(650, 110)">
      <rect x="0" y="0" width="105" height="42" rx="4" fill="var(--bg-surface)" stroke="var(--color-primary)" stroke-width="1.5" />
      <text x="8" y="15" font-size="8" font-weight="700" fill="var(--color-primary)">ROOM TEMP / SETPOINT</text>
      <text x="8" y="32" font-size="14" font-weight="800" font-family="var(--font-mono)" fill="var(--color-text-primary)">
        {roomTemp.toFixed(1)}°C <tspan font-size="10" fill="var(--color-text-secondary)">/ {roomSetpoint.toFixed(1)}°C</tspan>
      </text>
    </g>
  </svg>
</div>

<style>
  .rhvac-mimic {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-sm);
    box-shadow: var(--shadow-card);
  }

  .rhvac-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xs);
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: var(--space-xs);
  }

  .rhvac-title-group {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .rhvac-badge {
    background: var(--color-primary);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }

  .rhvac-title-group h4 {
    margin: 0;
    font-size: var(--font-md);
    color: var(--color-text-primary);
  }

  .mode-pill {
    font-size: 10px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: var(--font-mono);
  }
  .mode-pill--cooling { background: #003314; color: #00e676; border: 1px solid #00a844; }
  .mode-pill--defrost { background: #331a00; color: #ffab00; border: 1px solid #e69500; }
  .mode-pill--standby { background: #1a202c; color: #a0aec0; border: 1px solid #4a5568; }

  .mimic-svg {
    width: 100%;
    height: auto;
    display: block;
    max-height: 520px;
  }

  .pipe-flow {
    stroke-dasharray: 8, 8;
  }

  .pipe-active {
    animation: flow-anim 1.5s linear infinite;
  }

  .fan-active {
    stroke-dasharray: 4, 4;
    animation: spin-anim 1s linear infinite;
    transform-origin: center;
  }

  .heater-glow {
    filter: drop-shadow(0 0 6px #ff3d00);
    animation: pulse 1s infinite alternate;
  }

  @keyframes spin-anim {
    to { transform: rotate(360deg); }
  }

  @keyframes flow-anim {
    from { stroke-dashoffset: 32; }
    to { stroke-dashoffset: 0; }
  }
</style>
