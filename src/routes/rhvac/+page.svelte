<script lang="ts">
  import RhvacProcessMimic from '$lib/components/RhvacProcessMimic.svelte';
  import ScadaPIDFaceplate from '$lib/components/ScadaPIDFaceplate.svelte';
  import ScadaDigitalMeter from '$lib/components/ScadaDigitalMeter.svelte';
  import ScadaTankLevel from '$lib/components/ScadaTankLevel.svelte';
  import ScadaAlarmAnnunciator from '$lib/components/ScadaAlarmAnnunciator.svelte';
  import ScadaRotarySwitch from '$lib/components/ScadaRotarySwitch.svelte';
  import WidgetContainer from '$lib/components/WidgetContainer.svelte';
  import { t } from '$lib/stores/locale';
  import { onMount } from 'svelte';

  let roomTemp = -18.4;
  let roomSp = -20.0;
  let suctionP = 2.1;
  let suctionT = -12.2;
  let dischargeP = 15.6;
  let dischargeT = 74.2;
  let liquidT = 36.8;
  let condensingT = 42.0;
  let evaporatingT = -22.0;
  let compRunning = true;
  let receiverLevel = 68.0; // % liquid in receiver

  // Real-time jitter for living mimic
  onMount(() => {
    const timer = setInterval(() => {
      roomTemp = -18.4 + (Math.random() * 0.8 - 0.4);
      suctionP = 2.1 + (Math.random() * 0.1 - 0.05);
      dischargeP = 15.6 + (Math.random() * 0.4 - 0.2);
      dischargeT = 74.2 + (Math.random() * 1.0 - 0.5);
      receiverLevel = Math.max(30, Math.min(95, receiverLevel + (Math.random() * 1.0 - 0.5)));
    }, 3000);

    return () => clearInterval(timer);
  });
</script>

<svelte:head>
  <title>{$t.rhvac.title} - {$t.brand}</title>
</svelte:head>

<div class="rhvac-page">
  <header class="page-banner">
    <div>
      <h1 class="page-title">❄️ {$t.rhvac.title}</h1>
      <p class="page-subtitle">{$t.rhvac.subtitle}</p>
    </div>
    <div class="banner-actions">
      <ScadaRotarySwitch
        label="PLANT OPERATION"
        position="auto"
        size="sm"
      />
    </div>
  </header>

  <!-- Master Process Mimic Canvas -->
  <section class="mimic-section">
    <RhvacProcessMimic
      dischargePressure={dischargeP}
      dischargeTemp={dischargeT}
      condensingTemp={condensingT}
      liquidTemp={liquidT}
      suctionPressure={suctionP}
      suctionTemp={suctionT}
      evaporatingTemp={evaporatingT}
      {roomTemp}
      roomSetpoint={roomSp}
      compressorState={compRunning}
      condenserFanState={true}
      evaporatorFanState={true}
      mode="cooling"
    />
  </section>

  <!-- Associated Engineering Control & Telemetry Grid -->
  <section class="grid-section">
    <WidgetContainer id="rhvac-pid" title="TEMPERATURE CONTROLLER LOOP" subtitle="TIC-201" defaultSize="md">
      <ScadaPIDFaceplate
        tag="TIC-201"
        description="Cold Storage Evaporator Valve Loop"
        pv={roomTemp}
        sp={roomSp}
        mv={68.0}
        unit="°C"
        min={-30}
        max={0}
      />
    </WidgetContainer>

    <WidgetContainer id="rhvac-meter-discharge" title="COMPRESSOR DISCHARGE" subtitle="PI-101" defaultSize="md">
      <ScadaDigitalMeter
        label="DISCHARGE PRESSURE"
        value={dischargeP}
        unit="bar"
        highLimit={22.0}
        lowLimit={10.0}
        colorTheme="amber"
      />
    </WidgetContainer>

    <WidgetContainer id="rhvac-receiver" title="LIQUID RECEIVER VESSEL" subtitle="LT-102" defaultSize="md">
      <ScadaTankLevel
        label="Liquid Receiver"
        value={receiverLevel}
        unit="%"
        fluidColor="#ff9100"
        highAlarm={85}
        highHighAlarm={92}
        lowAlarm={25}
        lowLowAlarm={15}
      />
    </WidgetContainer>

    <WidgetContainer id="rhvac-annun" title="SAFETY ALARM MATRIX" subtitle="ISA-18.1 Panel" defaultSize="wide">
      <ScadaAlarmAnnunciator />
    </WidgetContainer>
  </section>
</div>

<style>
  .rhvac-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .page-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    box-shadow: var(--shadow-card);
    gap: var(--space-md);
  }

  .page-title {
    font-size: var(--font-xl);
    font-weight: 800;
    color: var(--color-text-primary);
    margin: 0;
  }

  .page-subtitle {
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    margin: var(--space-xs) 0 0 0;
  }

  .mimic-section {
    width: 100%;
  }

  .grid-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-md);
  }
</style>
