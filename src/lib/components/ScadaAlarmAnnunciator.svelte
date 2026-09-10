<script context="module" lang="ts">
  export interface AlarmItem {
    id: string;
    tag: string;
    label: string;
    state: 'active_unack' | 'active_ack' | 'cleared_unack' | 'normal';
    priority: 'low' | 'high' | 'critical';
  }
</script>

<script lang="ts">
  export let alarms: AlarmItem[] = [
    { id: 'alm-1', tag: 'A-101', label: 'HIGH COMPRESSOR TEMP', state: 'active_unack', priority: 'critical' },
    { id: 'alm-2', tag: 'A-102', label: 'SUCTION LOW PRESSURE', state: 'normal', priority: 'high' },
    { id: 'alm-3', tag: 'A-103', label: 'CONDENSER FAN 1 TRIP', state: 'active_ack', priority: 'high' },
    { id: 'alm-4', tag: 'A-104', label: 'EVAPORATOR DEFROST ERR', state: 'normal', priority: 'low' },
    { id: 'alm-5', tag: 'A-105', label: 'COLD ROOM HI-TEMP 20C', state: 'normal', priority: 'critical' },
    { id: 'alm-6', tag: 'A-106', label: 'RS485 COMM TIMEOUT', state: 'normal', priority: 'high' },
    { id: 'alm-7', tag: 'A-107', label: 'OIL LEVEL SWITCH LOW', state: 'normal', priority: 'critical' },
    { id: 'alm-8', tag: 'A-108', label: 'OVERLOAD RELAY TRIP', state: 'normal', priority: 'high' },
  ];

  let testMode = false;

  function ackAll() {
    alarms = alarms.map((a) => (a.state === 'active_unack' ? { ...a, state: 'active_ack' } : a));
  }

  function resetAll() {
    alarms = alarms.map((a) => (a.state === 'cleared_unack' || a.state === 'active_ack' ? { ...a, state: 'normal' } : a));
  }

  function toggleTest() {
    testMode = !testMode;
  }
</script>

<div class="annunciator-panel">
  <div class="annunciator-grid">
    {#each alarms as alarm}
      {@const isFlashing = testMode || alarm.state === 'active_unack'}
      {@const isSteady = !testMode && alarm.state === 'active_ack'}
      {@const isLit = isFlashing || isSteady}
      <div
        class="alarm-window"
        class:window--lit={isLit}
        class:window--flash={isFlashing}
        class:priority--critical={alarm.priority === 'critical'}
        class:priority--high={alarm.priority === 'high'}
      >
        <span class="alarm-tag">{alarm.tag}</span>
        <span class="alarm-text">{alarm.label}</span>
      </div>
    {/each}
  </div>

  <!-- ISA-18.1 Annunciator Pushbuttons -->
  <div class="annunciator-toolbar">
    <button type="button" class="annun-btn annun-btn--ack" on:click={ackAll}>ACK</button>
    <button type="button" class="annun-btn" on:click={resetAll}>RESET</button>
    <button type="button" class="annun-btn" class:annun-btn--active={testMode} on:click={toggleTest}>TEST</button>
  </div>
</div>

<style>
  .annunciator-panel {
    background: var(--bg-annunciator, #0f1217);
    border: 2px solid var(--border-default, #2e3440);
    border-radius: 6px;
    padding: 8px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.4);
  }

  .annunciator-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  @media (max-width: 640px) {
    .annunciator-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .alarm-window {
    background: var(--bg-annunciator-window, #171b22);
    border: 1px solid var(--border-subtle, #282f3d);
    border-radius: 3px;
    padding: 6px;
    min-height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s ease;
  }

  .alarm-tag {
    font-size: 8px;
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--text-muted, #8b949e);
    letter-spacing: 0.05em;
  }

  .alarm-text {
    font-size: 9px;
    font-weight: 700;
    line-height: 1.15;
    color: var(--text-secondary, #8b949e);
    text-transform: uppercase;
  }

  /* Lit & Flashing States */
  .window--lit {
    background: #330000;
    border-color: #ff3333;
  }
  .window--lit .alarm-tag { color: #ff9999; }
  .window--lit .alarm-text { color: #ffffff; text-shadow: 0 0 6px #ff3333; }

  .window--lit.priority--high {
    background: #332200;
    border-color: #ffaa00;
  }
  .window--lit.priority--high .alarm-tag { color: #ffe066; }
  .window--lit.priority--high .alarm-text { color: #ffffff; text-shadow: 0 0 6px #ffaa00; }

  .window--flash {
    animation: annun-flash 0.8s infinite alternate;
  }

  @keyframes annun-flash {
    0% { opacity: 0.25; }
    100% { opacity: 1; }
  }

  .annunciator-toolbar {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid var(--border-subtle, #1f2530);
  }

  .annun-btn {
    background: var(--bg-surface, #1a202c);
    border: 1px solid var(--border-default, #323b4b);
    color: var(--text-secondary, #a0aec0);
    font-size: 9px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-family: var(--font-mono);
    transition: all 0.15s ease;
  }

  .annun-btn:hover {
    background: var(--bg-overlay, #2d3748);
    color: var(--text-primary, #fff);
  }

  .annun-btn--ack {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
    color: var(--status-normal, #00e676);
  }

  .annun-btn--active {
    background: var(--status-warning);
    color: #000;
  }

  /* ═══ Light Theme Overrides ═══ */
  :global([data-theme="light"]) .alarm-window {
    background: #ffffff;
    border-color: #cbd5e1;
  }
  :global([data-theme="light"]) .alarm-tag {
    color: #64748b;
  }
  :global([data-theme="light"]) .alarm-text {
    color: #334155;
  }
  :global([data-theme="light"]) .window--lit {
    background: #fee2e2;
    border-color: #ef4444;
  }
  :global([data-theme="light"]) .window--lit .alarm-tag {
    color: #dc2626;
  }
  :global([data-theme="light"]) .window--lit .alarm-text {
    color: #991b1b;
    text-shadow: none;
  }
  :global([data-theme="light"]) .window--lit.priority--high {
    background: #fef3c7;
    border-color: #f59e0b;
  }
  :global([data-theme="light"]) .window--lit.priority--high .alarm-tag {
    color: #d97706;
  }
  :global([data-theme="light"]) .window--lit.priority--high .alarm-text {
    color: #92400e;
    text-shadow: none;
  }
  :global([data-theme="light"]) .annun-btn {
    background: #ffffff;
    border-color: #cbd5e1;
    color: #334155;
  }
  :global([data-theme="light"]) .annun-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
</style>
