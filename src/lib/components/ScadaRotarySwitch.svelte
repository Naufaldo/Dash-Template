<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string = 'SELECTOR MODE';
  export let position: 'hand' | 'off' | 'auto' = 'auto';
  export let disabled: boolean = false;
  export let size: 'sm' | 'md' = 'md';

  const dispatch = createEventDispatcher();

  $: rotationAngle = position === 'hand'
    ? -45
    : position === 'auto'
    ? 45
    : 0;

  function selectPos(pos: 'hand' | 'off' | 'auto') {
    if (disabled) return;
    position = pos;
    dispatch('change', { position });
  }
</script>

<div class="rotary-switch rotary-switch--{size}" class:rotary-switch--disabled={disabled}>
  <span class="rotary-label">{label}</span>

  <div class="switch-assembly">
    <!-- Position indicators -->
    <button
      type="button"
      class="pos-tag pos-tag--hand"
      class:pos-tag--active={position === 'hand'}
      on:click={() => selectPos('hand')}
      {disabled}
    >HAND</button>

    <button
      type="button"
      class="pos-tag pos-tag--off"
      class:pos-tag--active={position === 'off'}
      on:click={() => selectPos('off')}
      {disabled}
    >OFF</button>

    <button
      type="button"
      class="pos-tag pos-tag--auto"
      class:pos-tag--active={position === 'auto'}
      on:click={() => selectPos('auto')}
      {disabled}
    >AUTO</button>

    <!-- Rotary knob dial -->
    <button
      type="button"
      class="knob-bezel"
      on:click={() => {
        if (position === 'hand') selectPos('off');
        else if (position === 'off') selectPos('auto');
        else selectPos('hand');
      }}
      
      
      aria-label="{label}: {position}"
    >
      <div
        class="knob-handle"
        style="transform: rotate({rotationAngle}deg);"
      >
        <span class="knob-pointer"></span>
      </div>
    </button>
  </div>

  <div class="switch-status-text">
    STATE: <strong>{position.toUpperCase()}</strong>
  </div>
</div>

<style>
  .rotary-switch {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-xs);
    user-select: none;
  }

  .rotary-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-xs);
  }

  .switch-assembly {
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pos-tag {
    position: absolute;
    font-size: 9px;
    font-weight: 700;
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  .pos-tag--hand { top: 6px; left: 6px; }
  .pos-tag--off  { top: 2px; left: 50%; transform: translateX(-50%); }
  .pos-tag--auto { top: 6px; right: 6px; }

  .pos-tag--active {
    color: var(--color-primary);
    text-shadow: 0 0 6px var(--color-primary);
    font-weight: 800;
  }

  .knob-bezel {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(145deg, #323742 0%, #171a21 100%);
    border: 3px solid #4a5163;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 3px rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 14px;
  }

  .knob-handle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: radial-gradient(circle, #252a33 40%, #14171d 100%);
    position: relative;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.6);
  }

  .knob-pointer {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 14px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 4px rgba(255,255,255,0.8);
  }

  .switch-status-text {
    font-size: 10px;
    color: var(--color-text-secondary);
    margin-top: var(--space-xs);
    font-family: var(--font-mono);
  }

  .rotary-switch--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  /* ═══ Light Theme Styling ═══ */
  :global([data-theme="light"]) .knob-bezel {
    background: linear-gradient(145deg, #f8fafc 0%, #cbd5e1 100%);
    border: 3px solid #94a3b8;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12), inset 0 2px 3px rgba(255, 255, 255, 0.9);
  }

  :global([data-theme="light"]) .knob-handle {
    background: radial-gradient(circle, #e2e8f0 40%, #cbd5e1 100%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  :global([data-theme="light"]) .knob-pointer {
    background: #0f172a;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }

  :global([data-theme="light"]) .pos-tag--active {
    color: var(--color-primary);
    text-shadow: none;
    font-weight: 800;
  }
</style>
