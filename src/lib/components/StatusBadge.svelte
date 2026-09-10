<script lang="ts">
  import type { DeviceStatus } from '$lib/types/iot';
  import { t } from '$lib/stores/locale';

  export let status: DeviceStatus;
  export let size: 'sm' | 'md' = 'md';

  $: label = $t.status[status] ?? status;
</script>

<span class="badge badge--{status}" class:badge--sm={size === 'sm'} aria-label="Status: {label}">
  {label}
</span>

<style>
  .badge--sm { font-size: 10px; padding: 1px 6px; }
</style>
