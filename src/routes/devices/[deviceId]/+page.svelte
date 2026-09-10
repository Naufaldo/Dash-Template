<script lang="ts">
  import { page } from '$app/stores';
  import { devicesStore } from '$lib/stores/devices';
  import { t } from '$lib/stores/locale';
  import ScadaGauge from '$lib/components/ScadaGauge.svelte';
  import SynopticMimic from '$lib/components/SynopticMimic.svelte';

  $: deviceId = $page.params.deviceId;
  $: device = $devicesStore.find(d => d.id === deviceId);
</script>

{#if device}
  <div class="device-detail-view">
    <div class="detail-header">
      <a href="/" class="back-link">← {$t.filterAll}</a>
      <h1 class="detail-title">{device.name} ({device.tag})</h1>
      <p class="detail-sub">{device.location} · {device.category}</p>
    </div>

    <div class="gauges-banner">
      <ScadaGauge
        label={device.primary.label}
        value={device.primary.value}
        unit={device.primary.unit}
        min={device.primary.min}
        max={device.primary.max}
        target={device.primary.target}
        alarmHigh={device.primary.alarmHigh}
        size="md"
        type="primary"
      />
      <ScadaGauge
        label={device.secondary.label}
        value={device.secondary.value}
        unit={device.secondary.unit}
        min={device.secondary.min}
        max={device.secondary.max}
        alarmHigh={device.secondary.alarmHigh}
        size="md"
        type="secondary"
      />
    </div>

    <div style="margin-top: 20px;">
      <h3 style="font-size: 15px; margin-bottom: 10px;">{$t.quickMimic}</h3>
      <SynopticMimic {device} />
    </div>
  </div>
{:else}
  <p>Perangkat tidak ditemukan. <a href="/">Kembali</a></p>
{/if}

<style>
  .device-detail-view { display: flex; flex-direction: column; gap: 16px; }
  .back-link { color: var(--color-primary); text-decoration: none; font-size: 12px; font-weight: 600; }
  .detail-title { font-size: 20px; font-weight: 700; margin: 4px 0; font-family: var(--font-mono); }
  .detail-sub { color: var(--text-muted); font-size: 12px; margin: 0; }
  .gauges-banner { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 10px; }
</style>
