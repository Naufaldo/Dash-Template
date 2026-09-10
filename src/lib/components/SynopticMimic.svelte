<script lang="ts">
  import type { DeviceTelemetry } from '$lib/types/iot';
  export let device: DeviceTelemetry;
</script>

<div class="mimic-container">
  <svg viewBox="0 0 700 280" class="mimic-svg">
    <!-- Vessel 1 -->
    <rect x="50" y="80" width="100" height="120" rx="10" fill="var(--bg-surface-elevated)" stroke="var(--border-strong)" stroke-width="2" />
    <text x="100" y="145" fill="var(--text-secondary)" font-family="var(--font-mono)" font-size="12" text-anchor="middle">SUPPLY INLET</text>

    <!-- Pipe Feed -->
    <path d="M 150 140 L 300 140" fill="none" stroke="var(--color-primary)" stroke-width="4" stroke-dasharray={device.relays.mainRun ? "8 4" : "none"} class:flowing={device.relays.mainRun} />

    <!-- Pump / Equipment Mimic -->
    <circle cx="340" cy="140" r="35" fill="var(--bg-app)" stroke={device.relays.mainRun ? "var(--status-online)" : "var(--border-strong)"} stroke-width="3" />
    <polygon points="325,125 365,140 325,155" fill={device.relays.mainRun ? "var(--status-online)" : "var(--text-muted)"} />
    <text x="340" y="195" fill="var(--text-primary)" font-family="var(--font-mono)" font-size="13" font-weight="700" text-anchor="middle">{device.tag}</text>

    <!-- Pipe Discharge -->
    <path d="M 375 140 L 520 140" fill="none" stroke="var(--color-pressure)" stroke-width="4" stroke-dasharray={device.relays.mainRun ? "8 4" : "none"} class:flowing={device.relays.mainRun} />

    <!-- Vessel 2 / Destination -->
    <rect x="520" y="80" width="120" height="120" rx="10" fill="var(--bg-surface-elevated)" stroke="var(--border-strong)" stroke-width="2" />
    <text x="580" y="145" fill="var(--text-secondary)" font-family="var(--font-mono)" font-size="12" text-anchor="middle">PROCESS OUTLET</text>

    <!-- Live Telemetry Badges -->
    <g transform="translate(190, 70)">
      <rect width="105" height="34" rx="4" fill="var(--bg-app)" stroke="var(--border-strong)" />
      <text x="8" y="16" fill="var(--text-muted)" font-size="9" font-family="var(--font-mono)">{device.primary.label}</text>
      <text x="8" y="28" fill="var(--color-primary)" font-size="12" font-weight="700" font-family="var(--font-mono)">{device.primary.value} {device.primary.unit}</text>
    </g>

    <g transform="translate(410, 70)">
      <rect width="105" height="34" rx="4" fill="var(--bg-app)" stroke="var(--border-strong)" />
      <text x="8" y="16" fill="var(--text-muted)" font-size="9" font-family="var(--font-mono)">{device.secondary.label}</text>
      <text x="8" y="28" fill="var(--color-pressure)" font-size="12" font-weight="700" font-family="var(--font-mono)">{device.secondary.value} {device.secondary.unit}</text>
    </g>
  </svg>
</div>

<style>
  .mimic-container {
    background: var(--bg-app);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 16px;
  }
  .mimic-svg { width: 100%; height: auto; display: block; }
  .flowing { animation: flow 1s linear infinite; }
  @keyframes flow { to { stroke-dashoffset: -24; } }
</style>
