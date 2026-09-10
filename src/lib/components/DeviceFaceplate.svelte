<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { DeviceTelemetry } from '$lib/types/iot';
  import { t } from '$lib/stores/locale';
  import StatusBadge from './StatusBadge.svelte';
  import ScadaGauge from './ScadaGauge.svelte';
  import ScadaPilotLed from './ScadaPilotLed.svelte';
  import ScadaSparkline from './ScadaSparkline.svelte';
  import GraphicBar from './GraphicBar.svelte';

  export let device: DeviceTelemetry;
  export let allowReorder: boolean = false;
  export let isFirst: boolean = false;
  export let isLast: boolean = false;
  export let viewMode: 'scada' | 'bars' = 'scada';

  const dispatch = createEventDispatcher<{
    inspect: DeviceTelemetry;
    moveLeft: DeviceTelemetry;
    moveRight: DeviceTelemetry;
  }>();
</script>

<div class="scada-faceplate scada-faceplate--{device.status}">
  <div class="scada-faceplate__header">
    {#if allowReorder}
      <div class="drag-handle" title={$t.dragHint}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <circle cx="5" cy="4" r="1.5" /><circle cx="11" cy="4" r="1.5" />
          <circle cx="5" cy="8" r="1.5" /><circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="12" r="1.5" /><circle cx="11" cy="12" r="1.5" />
        </svg>
      </div>
    {/if}

    <a href="/devices/{device.id}" class="tag-box">
      <div class="tag-row">
        <span class="device-name">{device.name}</span>
        <span class="tag-badge">{device.tag}</span>
      </div>
      <span class="location-name">{device.location} · {device.category}</span>
    </a>

    <StatusBadge status={device.status} />
  </div>

  {#if viewMode === 'scada'}
    <div class="scada-gauges-grid">
      <ScadaGauge
        label={device.primary.label}
        value={device.primary.value}
        unit={device.primary.unit}
        min={device.primary.min}
        max={device.primary.max}
        target={device.primary.target}
        alarmHigh={device.primary.alarmHigh}
        type="primary"
        size="sm"
      />
      <ScadaGauge
        label={device.secondary.label}
        value={device.secondary.value}
        unit={device.secondary.unit}
        min={device.secondary.min}
        max={device.secondary.max}
        alarmHigh={device.secondary.alarmHigh}
        type="secondary"
        size="sm"
      />
    </div>

    <div class="scada-submetrics-row">
      <div class="submetric-chips">
        <div class="submetric-chip">
          <span class="chip-lbl">{device.aux1.label}:</span>
          <span class="chip-val">{device.aux1.value} {device.aux1.unit}</span>
        </div>
        <div class="submetric-chip">
          <span class="chip-lbl">{device.aux2.label}:</span>
          <span class="chip-val">{device.aux2.value} {device.aux2.unit}</span>
        </div>
      </div>
      <div class="sparkline-wrap">
        <ScadaSparkline value={device.primary.value} unit={device.primary.unit} label="TREN" />
      </div>
    </div>

    <div class="scada-annunciator-strip">
      <ScadaPilotLed label={$t.pilotRun} state={device.relays.mainRun ? 'run' : 'off'} />
      <ScadaPilotLed label={$t.pilotAux} state={device.relays.auxRun ? 'run' : 'off'} />
      <ScadaPilotLed label={$t.pilotAlarm} state={device.relays.alarmActive ? 'warn' : 'off'} />
      <ScadaPilotLed label={$t.pilotComm} state={device.relays.commOk ? 'comm' : 'trip'} />
      <ScadaPilotLed label={$t.pilotSafety} state={device.relays.safetyOk ? 'run' : 'trip'} />
    </div>
  {:else}
    <div style="display:flex; flex-direction:column; gap:8px;">
      <GraphicBar
        label={device.primary.label}
        value={device.primary.value}
        unit={device.primary.unit}
        min={device.primary.min}
        max={device.primary.max}
        alarmHigh={device.primary.alarmHigh}
        type="primary"
      />
      <GraphicBar
        label={device.secondary.label}
        value={device.secondary.value}
        unit={device.secondary.unit}
        min={device.secondary.min}
        max={device.secondary.max}
        alarmHigh={device.secondary.alarmHigh}
        type="secondary"
      />
    </div>
  {/if}

  <div class="scada-faceplate__footer">
    <button type="button" class="action-btn" on:click={() => dispatch('inspect', device)}>
      🔍 {$t.quickMimic}
    </button>
    <div style="display:flex; align-items:center; gap:8px;">
      {#if allowReorder}
        <div class="arrows-group">
          <button type="button" class="arrow-btn" disabled={isFirst} on:click={() => dispatch('moveLeft', device)}>←</button>
          <button type="button" class="arrow-btn" disabled={isLast} on:click={() => dispatch('moveRight', device)}>→</button>
        </div>
      {/if}
      <a href="/devices/{device.id}" class="detail-link">{$t.detailLink}</a>
    </div>
  </div>
</div>

<style>
  .scada-faceplate {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: all var(--ease-default);
  }
  .scada-faceplate:hover { border-color: var(--border-strong); }
  .scada-faceplate--warning { border-color: var(--status-warning); }
  .scada-faceplate--critical { border-color: var(--status-critical); box-shadow: 0 0 0 1px var(--status-critical); }
  .scada-faceplate__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .drag-handle { color: var(--text-muted); cursor: grab; padding: 4px; display: flex; }
  .tag-box { display: flex; flex-direction: column; flex: 1; text-decoration: none; color: inherit; gap: 2px; }
  .tag-row { display: flex; align-items: center; gap: 6px; }
  .device-name { font-size: 14px; font-weight: 700; color: var(--text-primary); font-family: var(--font-mono); }
  .tag-badge { font-size: 10px; color: var(--text-muted); background: var(--bg-raised); padding: 1px 5px; border-radius: 3px; font-family: var(--font-mono); }
  .location-name { font-size: 11px; color: var(--text-secondary); }
  .scada-gauges-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .scada-submetrics-row {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 8px;
    align-items: center;
    background: var(--bg-app);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 6px 8px;
  }
  .submetric-chips { display: flex; flex-direction: column; gap: 4px; }
  .submetric-chip { display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); }
  .chip-lbl { color: var(--text-muted); font-size: 10px; }
  .chip-val { font-weight: 600; color: var(--text-primary); }
  .scada-annunciator-strip {
    display: flex;
    justify-content: space-around;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 6px 4px;
  }
  .scada-faceplate__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid var(--border-subtle);
  }
  .action-btn {
    font-size: 11px;
    font-weight: 600;
    padding: 5px 9px;
    border-radius: var(--radius-sm);
    background: var(--bg-raised);
    color: var(--text-primary);
    border: 1px solid var(--border-subtle);
    cursor: pointer;
  }
  .arrows-group { display: inline-flex; gap: 3px; }
  .arrow-btn {
    padding: 2px 7px;
    font-size: 11px;
    font-weight: bold;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    cursor: pointer;
  }
  .arrow-btn:disabled { opacity: 0.25; cursor: not-allowed; }
  .detail-link { font-size: 11px; color: var(--color-primary); text-decoration: none; font-weight: 600; }
</style>
