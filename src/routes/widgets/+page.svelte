<script lang="ts">
  import ScadaGauge from '$lib/components/ScadaGauge.svelte';
  import ScadaPilotLed from '$lib/components/ScadaPilotLed.svelte';
  import ScadaSparkline from '$lib/components/ScadaSparkline.svelte';
  import GraphicBar from '$lib/components/GraphicBar.svelte';
  import ScadaTankLevel from '$lib/components/ScadaTankLevel.svelte';
  import ScadaDigitalMeter from '$lib/components/ScadaDigitalMeter.svelte';
  import ScadaRotarySwitch from '$lib/components/ScadaRotarySwitch.svelte';
  import ScadaAlarmAnnunciator from '$lib/components/ScadaAlarmAnnunciator.svelte';
  import ScadaPIDFaceplate from '$lib/components/ScadaPIDFaceplate.svelte';
  import ScadaMultiBar from '$lib/components/ScadaMultiBar.svelte';
  import WidgetContainer from '$lib/components/WidgetContainer.svelte';
  import { t } from '$lib/stores/locale';

  let testValue = 68.4;
  let switchState: 'hand' | 'off' | 'auto' = 'auto';
</script>

<svelte:head>
  <title>{$t.navWidgets} - {$t.brand}</title>
</svelte:head>

<div class="widgets-page">
  <header class="catalog-header">
    <div>
      <h1 class="catalog-title">🎛️ SCADA & Industrial IoT Widget Catalog</h1>
      <p class="catalog-subtitle">
        Standard industrial monitoring components compliant with Dark & Light themes and interactive user-resizability (S / M / W / L).
      </p>
    </div>
  </header>

  <div class="catalog-grid">
    <!-- 1. Radial Arc Gauge -->
    <WidgetContainer id="cat-gauge" title="RADIAL ARC GAUGE (240°)" subtitle="ScadaGauge.svelte" defaultSize="md">
      <ScadaGauge
        label="Process Temperature"
        value={-18.4}
        unit="°C"
        min={-30}
        max={0}
        target={-20.0}
        alarmHigh={-15.0}
        alarmLow={-25.0}
        size="md"
      />
    </WidgetContainer>

    <!-- 2. Tank Fluid Level -->
    <WidgetContainer id="cat-tank" title="VERTICAL TANK LEVEL" subtitle="ScadaTankLevel.svelte" defaultSize="md">
      <ScadaTankLevel
        label="Storage Tank 01"
        value={testValue}
        unit="%"
        highAlarm={80}
        highHighAlarm={90}
        lowAlarm={20}
        lowLowAlarm={10}
      />
    </WidgetContainer>

    <!-- 3. Digital Panel Meter -->
    <WidgetContainer id="cat-meter" title="DIGITAL PANEL METER" subtitle="ScadaDigitalMeter.svelte" defaultSize="md">
      <ScadaDigitalMeter
        label="LINE VOLTAGE L1-N"
        value={221.8}
        unit="VAC"
        highLimit={240.0}
        lowLimit={200.0}
        colorTheme="green"
      />
    </WidgetContainer>

    <!-- 4. Rotary Switch -->
    <WidgetContainer id="cat-switch" title="INDUSTRIAL ROTARY SWITCH" subtitle="ScadaRotarySwitch.svelte" defaultSize="sm">
      <ScadaRotarySwitch
        label="FAN CONTROL MODE"
        bind:position={switchState}
      />
    </WidgetContainer>

    <!-- 5. Pilot Annunciator Lamps -->
    <WidgetContainer id="cat-pilots" title="PILOT ANNUNCIATOR LAMPS" subtitle="ScadaPilotLed.svelte" defaultSize="md">
      <div class="pilots-showcase">
        <ScadaPilotLed label="RUN" state="run" size="md" />
        <ScadaPilotLed label="AUX" state="aux" size="md" />
        <ScadaPilotLed label="WARN" state="warn" size="md" />
        <ScadaPilotLed label="TRIP" state="trip" size="md" pulse={true} />
        <ScadaPilotLed label="COMM" state="comm" size="md" />
        <ScadaPilotLed label="OFF" state="off" size="md" />
      </div>
    </WidgetContainer>

    <!-- 6. PID Loop Faceplate -->
    <WidgetContainer id="cat-pid" title="PID CONTROLLER LOOP" subtitle="ScadaPIDFaceplate.svelte" defaultSize="md">
      <ScadaPIDFaceplate
        tag="FIC-301"
        description="Chilled Water Flow Control Loop"
        pv={124.5}
        sp={120.0}
        mv={55.0}
        unit="m³/h"
        min={0}
        max={200}
      />
    </WidgetContainer>

    <!-- 7. Multi-Channel Bar -->
    <WidgetContainer id="cat-multibar" title="MULTI-CHANNEL BAR" subtitle="ScadaMultiBar.svelte" defaultSize="md">
      <ScadaMultiBar />
    </WidgetContainer>

    <!-- 8. Sparkline Rolling Trend -->
    <WidgetContainer id="cat-sparkline" title="MINI SPARKLINE TREND" subtitle="ScadaSparkline.svelte" defaultSize="md">
      <ScadaSparkline
        points={[-18.2, -18.3, -18.5, -18.4, -18.9, -18.7, -18.4, -18.1, -18.3, -18.5]}
        unit="°C"
        height={50}
      />
    </WidgetContainer>

    <!-- 9. Full-width ISA-18.1 Alarm Panel -->
    <WidgetContainer id="cat-annun" title="ISA-18.1 ALARM ANNUNCIATOR" subtitle="ScadaAlarmAnnunciator.svelte" defaultSize="wide">
      <ScadaAlarmAnnunciator />
    </WidgetContainer>
  </div>
</div>

<style>
  .widgets-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .catalog-header {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    box-shadow: var(--shadow-card);
  }

  .catalog-title {
    margin: 0;
    font-size: var(--font-xl);
    font-weight: 800;
    color: var(--color-text-primary);
  }

  .catalog-subtitle {
    margin: var(--space-xs) 0 0 0;
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-md);
  }

  .pilots-showcase {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-sm) 0;
  }
</style>
