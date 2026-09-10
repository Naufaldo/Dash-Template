<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/stores/locale';
  import { devicesStore } from '$lib/stores/devices';
  import type { DeviceTelemetry } from '$lib/types/iot';
  import DeviceFaceplate from '$lib/components/DeviceFaceplate.svelte';
  import SynopticMimic from '$lib/components/SynopticMimic.svelte';

  let customOrder: string[] = [];
  let filterMode: string = 'all';
  let sortMode: 'custom' | 'alarm' | 'val_high' = 'custom';
  let viewMode: 'scada' | 'bars' = 'scada';
  let inspectedDevice: DeviceTelemetry | null = null;

  onMount(() => {
    try {
      const savedOrder = localStorage.getItem('template_device_order');
      if (savedOrder) customOrder = JSON.parse(savedOrder);
      const savedView = localStorage.getItem('template_view_mode') as 'scada' | 'bars' | null;
      if (savedView) viewMode = savedView;
    } catch (e) {}
  });

  function setViewMode(mode: 'scada' | 'bars') {
    viewMode = mode;
    try { localStorage.setItem('template_view_mode', mode); } catch (e) {}
  }

  function saveOrder() {
    try { localStorage.setItem('template_device_order', JSON.stringify(customOrder)); } catch (e) {}
  }

  function resetOrder() {
    customOrder = $devicesStore.map(d => d.id);
    sortMode = 'custom';
    filterMode = 'all';
    try { localStorage.removeItem('template_device_order'); } catch (e) {}
  }

  $: displayDevices = (() => {
    let list = [...$devicesStore];
    if (sortMode === 'custom' && customOrder.length > 0) {
      const map = new Map(list.map(d => [d.id, d]));
      const ordered: DeviceTelemetry[] = [];
      for (const id of customOrder) {
        const item = map.get(id);
        if (item) { ordered.push(item); map.delete(id); }
      }
      for (const remaining of map.values()) ordered.push(remaining);
      list = ordered;
    } else if (sortMode === 'alarm') {
      const rank: Record<string, number> = { critical: 0, warning: 1, offline: 2, normal: 3 };
      list.sort((a, b) => rank[a.status] - rank[b.status]);
    } else if (sortMode === 'val_high') {
      list.sort((a, b) => (b.primary.value ?? 0) - (a.primary.value ?? 0));
    }

    if (filterMode === 'attention') {
      return list.filter(d => d.status === 'warning' || d.status === 'critical');
    }
    return list;
  })();

  function moveDevice(deviceId: string, dir: -1 | 1) {
    let list = customOrder.length > 0 ? [...customOrder] : $devicesStore.map(d => d.id);
    const idx = list.indexOf(deviceId);
    if (idx === -1) return;
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    list.splice(idx, 1);
    list.splice(targetIdx, 0, deviceId);
    customOrder = list;
    sortMode = 'custom';
    saveOrder();
  }

  $: activeCount = $devicesStore.filter(d => d.relays.mainRun).length;
  $: warnCount = $devicesStore.filter(d => d.status === 'warning' || d.status === 'critical').length;
</script>

<svelte:window on:keydown={(e) => { if (e.key === 'Escape') inspectedDevice = null; }} />

<!-- SCADA Master Plant Banner -->
<div class="scada-master-banner">
  <div class="banner-title-col">
    <span class="beacon"></span>
    <div>
      <span class="banner-title">{$t.masterBanner}</span>
      <span class="banner-sub">Modbus RTU · MQTT Telemetry Engine · Real-Time 4s Loop</span>
    </div>
  </div>

  <div class="banner-chips">
    <div class="banner-chip">
      <span class="chip-dot chip-dot--run"></span>
      <span class="chip-lbl">{$t.activeNodes}:</span>
      <span class="chip-val">{activeCount} / {$devicesStore.length}</span>
    </div>
    <div class="banner-chip">
      <span class="chip-dot chip-dot--warn"></span>
      <span class="chip-lbl">{$t.warningNodes}:</span>
      <span class="chip-val">{warnCount}</span>
    </div>
  </div>
</div>

<!-- Controls Bar -->
<div class="controls-card">
  <div class="controls-top">
    <h2 class="section-title">{$t.sectionDevices}</h2>
    <div class="controls-actions">
      <div class="view-toggle">
        <button type="button" class="toggle-btn" class:toggle-btn--active={viewMode === 'scada'} on:click={() => setViewMode('scada')}>
          {$t.viewModeScada}
        </button>
        <button type="button" class="toggle-btn" class:toggle-btn--active={viewMode === 'bars'} on:click={() => setViewMode('bars')}>
          {$t.viewModeBars}
        </button>
      </div>

      <select bind:value={sortMode} class="select-box" aria-label="Sort Devices">
        <option value="custom">{$t.sortCustom}</option>
        <option value="alarm">{$t.sortAlarms}</option>
        <option value="val_high">{$t.sortValHigh}</option>
      </select>

      <button type="button" class="action-btn" on:click={resetOrder}>{$t.resetOrder}</button>
    </div>
  </div>

  <div class="filters-row">
    <button type="button" class="filter-pill" class:filter-pill--active={filterMode === 'all'} on:click={() => filterMode = 'all'}>
      {$t.filterAll} ({$devicesStore.length})
    </button>
    <button type="button" class="filter-pill" class:filter-pill--active={filterMode === 'attention'} on:click={() => filterMode = 'attention'}>
      {$t.filterAttention} ({warnCount})
    </button>
  </div>
</div>

<!-- Devices Grid -->
<div class="card-grid">
  {#each displayDevices as device, index (device.id)}
    <DeviceFaceplate
      {device}
      {viewMode}
      allowReorder={sortMode === 'custom'}
      isFirst={index === 0}
      isLast={index === displayDevices.length - 1}
      on:inspect={() => inspectedDevice = device}
      on:moveLeft={() => moveDevice(device.id, -1)}
      on:moveRight={() => moveDevice(device.id, 1)}
    />
  {/each}
</div>

<!-- Quick Synoptic Mimic Modal -->
{#if inspectedDevice}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
  <div class="modal-backdrop" on:click={() => inspectedDevice = null} role="presentation">
    <div class="modal-card" on:click|stopPropagation role="dialog" aria-modal="true" tabindex="-1">
      <div class="modal-header">
        <h3 style="margin: 0; font-size: 16px;">{$t.quickMimic} — {inspectedDevice.name}</h3>
        <button type="button" class="close-btn" on:click={() => inspectedDevice = null} aria-label={$t.closeModal}>✕</button>
      </div>
      <div class="modal-body">
        <SynopticMimic device={inspectedDevice} />
      </div>
    </div>
  </div>
{/if}

<style>
  .scada-master-banner {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 12px 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .banner-title-col { display: flex; align-items: center; gap: 12px; }
  .beacon { width: 10px; height: 10px; border-radius: 50%; background: var(--status-online); box-shadow: 0 0 8px var(--status-online); }
  .banner-title { font-size: 14px; font-weight: 700; font-family: var(--font-mono); color: var(--text-primary); display: block; }
  .banner-sub { font-size: 11px; font-family: var(--font-mono); color: var(--text-muted); display: block; }
  .banner-chips { display: flex; gap: 8px; }
  .banner-chip { display: flex; align-items: center; gap: 6px; background: var(--bg-raised); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 11px; font-family: var(--font-mono); }
  .chip-dot { width: 6px; height: 6px; border-radius: 50%; }
  .chip-dot--run { background: var(--status-online); }
  .chip-dot--warn { background: var(--status-warning); }
  .chip-lbl { color: var(--text-muted); }
  .chip-val { font-weight: 700; color: var(--text-primary); }

  .controls-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 14px 16px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .controls-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .section-title { font-size: 15px; font-weight: 600; margin: 0; }
  .controls-actions { display: flex; align-items: center; gap: 8px; }
  .view-toggle { display: inline-flex; background: var(--bg-raised); padding: 2px; border-radius: var(--radius-sm); }
  .toggle-btn { padding: 4px 10px; font-size: 11px; font-weight: 600; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-radius: 4px; }
  .toggle-btn--active { background: var(--bg-surface); color: var(--color-primary); }
  .select-box { background: var(--bg-raised); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 12px; padding: 5px 8px; border-radius: var(--radius-sm); }
  .action-btn { background: var(--bg-raised); border: 1px solid var(--border-subtle); color: var(--text-primary); font-size: 12px; padding: 5px 10px; border-radius: var(--radius-sm); cursor: pointer; }
  .filters-row { display: flex; gap: 8px; }
  .filter-pill { font-size: 12px; padding: 4px 12px; border-radius: 20px; background: var(--bg-raised); border: 1px solid var(--border-subtle); color: var(--text-secondary); cursor: pointer; }
  .filter-pill--active { background: var(--color-primary); color: #fff; font-weight: 600; }

  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); width: 90%; max-width: 800px; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid var(--border-subtle); }
  .close-btn { background: transparent; border: none; color: var(--text-muted); font-size: 16px; cursor: pointer; }
  .modal-body { padding: 16px; }
</style>
