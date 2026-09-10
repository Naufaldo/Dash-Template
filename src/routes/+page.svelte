<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { t } from '$lib/stores/locale';
  import ScadaGauge from '$lib/components/ScadaGauge.svelte';
  import ScadaTankLevel from '$lib/components/ScadaTankLevel.svelte';
  import ScadaPilotLed from '$lib/components/ScadaPilotLed.svelte';
  import ScadaRotarySwitch from '$lib/components/ScadaRotarySwitch.svelte';
  import ScadaDigitalMeter from '$lib/components/ScadaDigitalMeter.svelte';
  import ScadaSparkline from '$lib/components/ScadaSparkline.svelte';

  // --- Fast First-Paint Flag ---
  let isMounted = false;

  // --- Terminal Command Box ---
  let activePackageMgr: 'pnpm' | 'npm' | 'docker' = 'pnpm';
  let copyFeedback: string = '';

  const commands = {
    pnpm: 'git clone https://github.com/Naufaldo/Dash-Template.git && cd Dash-Template && pnpm install && pnpm dev',
    npm: 'git clone https://github.com/Naufaldo/Dash-Template.git && cd Dash-Template && npm install && npm run dev',
    docker: 'docker compose up -d --build'
  };

  async function copyCommand(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      copyFeedback = $t.landing.copySuccess;
      setTimeout(() => { copyFeedback = ''; }, 2500);
    } catch (e) {
      copyFeedback = 'OK';
      setTimeout(() => { copyFeedback = ''; }, 2500);
    }
  }

  // --- Interactive Demo Workbench State ---
  let demoTemp: number = -18.4;
  let demoTarget: number = -20.0;
  let demoTankLevel: number = 68.0;
  let demoSwitchState: 'hand' | 'off' | 'auto' = 'auto';
  let activePreset: 'normal' | 'warning' | 'trip' | 'offline' = 'normal';

  // Pilot LED states
  let pilotRun: boolean = true;
  let pilotAux: boolean = true;
  let pilotAlarm: boolean = false;
  let pilotComm: boolean = true;
  let pilotSafety: boolean = false;

  // Sparkline history
  let demoHistory: number[] = [-18.6, -18.5, -18.3, -18.5, -18.4, -18.2, -18.4, -18.5, -18.3, -18.4];

  function applyPreset(preset: 'normal' | 'warning' | 'trip' | 'offline') {
    activePreset = preset;
    if (preset === 'normal') {
      demoTemp = -18.4;
      demoTarget = -20.0;
      demoTankLevel = 68.0;
      demoSwitchState = 'auto';
      pilotRun = true;
      pilotAux = true;
      pilotAlarm = false;
      pilotComm = true;
      pilotSafety = false;
      demoHistory = [-19.0, -18.8, -18.6, -18.5, -18.4, -18.5, -18.4];
    } else if (preset === 'warning') {
      demoTemp = -14.2;
      demoTarget = -20.0;
      demoTankLevel = 84.0;
      demoSwitchState = 'auto';
      pilotRun = true;
      pilotAux = false;
      pilotAlarm = true;
      pilotComm = true;
      pilotSafety = false;
      demoHistory = [-17.5, -16.8, -15.9, -15.1, -14.5, -14.2];
    } else if (preset === 'trip') {
      demoTemp = -8.5;
      demoTarget = -20.0;
      demoTankLevel = 94.0;
      demoSwitchState = 'off';
      pilotRun = false;
      pilotAux = false;
      pilotAlarm = true;
      pilotComm = true;
      pilotSafety = true;
      demoHistory = [-15.0, -13.2, -11.0, -9.5, -8.5];
    } else if (preset === 'offline') {
      demoTemp = -18.4;
      demoTarget = -20.0;
      demoTankLevel = 0.0;
      demoSwitchState = 'hand';
      pilotRun = false;
      pilotAux = false;
      pilotAlarm = false;
      pilotComm = false;
      pilotSafety = false;
      demoHistory = [0, 0, 0, 0];
    }
  }

  // --- Documentation Tabs State ---
  let activeDocTab: 'quickstart' | 'arch' | 'hardware' | 'widgets' | 'rhvac' | 'theming' = 'quickstart';
  let snippetCopied: string = '';

  async function copySnippet(key: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      snippetCopied = key;
      setTimeout(() => { snippetCopied = ''; }, 2000);
    } catch (e) {}
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<svelte:head>
  <title>{$t.brand} - {$t.tagline}</title>
  <meta name="description" content="Production-Ready Industrial SCADA, HMI, and IoT Telemetry starter template engineered with SvelteKit 2, Svelte 5, and pure SVG with zero charting bloat." />
</svelte:head>

<div class="landing-page">
  <!-- ========================================================================= -->
  <!-- 1. HERO SECTION (LARGE, BOLD, INSTANT LIGHTWEIGHT LOAD) -->
  <!-- ========================================================================= -->
  <header class="hero-section">
    <div class="hero-badge">
      <span class="pulse-indicator"></span>
      <span class="hero-badge__text">{$t.landing.badge}</span>
    </div>

    <h1 class="hero-title">
      {$t.landing.heroTitle}
    </h1>

    <p class="hero-subtitle">
      {$t.landing.heroSubtitle}
    </p>

    <!-- Prominent Action CTAs -->
    <div class="hero-actions">
      <a href="{base}/dashboard" class="btn btn--primary">
        📊 {$t.landing.btnDashboard}
      </a>
      <a href="#demo" class="btn btn--secondary">
        🎛️ {$t.landing.btnDemo}
      </a>
      <a href="#docs" class="btn btn--tertiary">
        📖 {$t.landing.btnDocs}
      </a>
    </div>

    <!-- 1-Click Quickstart Command Box -->
    <div class="terminal-card">
      <div class="terminal-card__header">
        <div class="terminal-tabs">
          <button
            type="button"
            class="terminal-tab"
            class:terminal-tab--active={activePackageMgr === 'pnpm'}
            on:click={() => activePackageMgr = 'pnpm'}
          >
            pnpm
          </button>
          <button
            type="button"
            class="terminal-tab"
            class:terminal-tab--active={activePackageMgr === 'npm'}
            on:click={() => activePackageMgr = 'npm'}
          >
            npm
          </button>
          <button
            type="button"
            class="terminal-tab"
            class:terminal-tab--active={activePackageMgr === 'docker'}
            on:click={() => activePackageMgr = 'docker'}
          >
            Docker Compose
          </button>
        </div>

        <button
          type="button"
          class="copy-btn"
          on:click={() => copyCommand(commands[activePackageMgr])}
          aria-label="Copy Command"
          title="Copy command to clipboard"
        >
          {copyFeedback ? `✓ ${copyFeedback}` : '📋 Copy'}
        </button>
      </div>

      <div class="terminal-body">
        <span class="terminal-prompt">$</span>
        <code class="terminal-code">{commands[activePackageMgr]}</code>
      </div>
    </div>

    <!-- Live Telemetry Health Strip -->
    <div class="telemetry-strip">
      <div class="telemetry-item">
        <div class="telemetry-item__header">
          <span class="status-dot status-dot--online"></span>
          <span class="telemetry-item__label">{$t.landing.telemetryStrip.activeNodes}</span>
        </div>
        <div class="telemetry-item__value">{$t.landing.telemetryStrip.activeVal}</div>
      </div>

      <div class="telemetry-item">
        <div class="telemetry-item__header">
          <span class="status-dot status-dot--comm"></span>
          <span class="telemetry-item__label">{$t.landing.telemetryStrip.commBus}</span>
        </div>
        <div class="telemetry-item__value">{$t.landing.telemetryStrip.commVal}</div>
      </div>

      <div class="telemetry-item">
        <div class="telemetry-item__header">
          <span class="status-dot status-dot--loop"></span>
          <span class="telemetry-item__label">{$t.landing.telemetryStrip.scanRate}</span>
        </div>
        <div class="telemetry-item__value">{$t.landing.telemetryStrip.scanVal}</div>
      </div>

      <div class="telemetry-item">
        <div class="telemetry-item__header">
          <span class="status-dot status-dot--safe"></span>
          <span class="telemetry-item__label">{$t.landing.telemetryStrip.alarms}</span>
        </div>
        <div class="telemetry-item__value">{$t.landing.telemetryStrip.alarmsVal}</div>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- 2. "MENJELASKAN" — FEATURES & ENGINEERING HIGHLIGHTS -->
  <!-- ========================================================================= -->
  <section class="section-container" id="features">
    <div class="section-header">
      <div class="section-tag">ENGINEERING HIGHLIGHTS</div>
      <h2 class="section-heading">{$t.landing.whyTitle}</h2>
      <p class="section-sub">{$t.landing.whySubtitle}</p>
    </div>

    <div class="features-grid">
      {#each $t.landing.features as feat}
        <div class="feature-card">
          <div class="feature-card__tag">{feat.tag}</div>
          <h3 class="feature-card__title">{feat.title}</h3>
          <p class="feature-card__desc">{feat.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. TOPOLOGI SISTEM & ALIRAN TELEMETRI (ARCHIFY PILLAR) -->
  <!-- ========================================================================= -->
  <section class="section-container" id="architecture">
    <div class="section-header">
      <div class="section-tag">GROUNDED TOPOLOGY</div>
      <h2 class="section-heading">{$t.landing.archTitle}</h2>
      <p class="section-sub">{$t.landing.archSubtitle}</p>
    </div>

    <div class="arch-container">
      <div class="arch-layer">
        <div class="arch-layer__badge">LAYER 1 · FIELD & EDGE</div>
        <h4 class="arch-layer__title">Field Instrumentation & PLCs</h4>
        <p class="arch-layer__desc">
          Sensor RTD PT100, Pressure Transmitters (4-20mA), Flow Meters, Kompresor CDU, dan Modbus PLC (Siemens S7, Schneider M221).
        </p>
        <div class="arch-chips">
          <span class="arch-chip">Modbus RTU / RS485</span>
          <span class="arch-chip">Current Loop 4-20mA</span>
          <span class="arch-chip">Dry Contact Relays</span>
        </div>
      </div>

      <div class="arch-arrow">▼</div>

      <div class="arch-layer">
        <div class="arch-layer__badge">LAYER 2 · TRANSPORT & BROKER</div>
        <h4 class="arch-layer__title">Communication & Protocol Gateway</h4>
        <p class="arch-layer__desc">
          Pengiriman telemetri berkecepatan tinggi via MQTT Sparkplug B Broker (Mosquitto/EMQX) atau WebSocket stream bi-directional.
        </p>
        <div class="arch-chips">
          <span class="arch-chip">MQTT (QoS 1)</span>
          <span class="arch-chip">Sparkplug B Payloads</span>
          <span class="arch-chip">Native WebSockets</span>
        </div>
      </div>

      <div class="arch-arrow">▼</div>

      <div class="arch-layer">
        <div class="arch-layer__badge">LAYER 3 · INGESTION & STATE STORE</div>
        <h4 class="arch-layer__title">Decoupled Reactive Store Layer</h4>
        <p class="arch-layer__desc">
          Store terisolasi <code>$lib/stores/devices.ts</code> yang menjaga state telemetri secara reaktif, anti-jitter, dan mendukung simulation fallback loop.
        </p>
        <div class="arch-chips">
          <span class="arch-chip">Writable&lt;DeviceTelemetry[]&gt;</span>
          <span class="arch-chip">Derived Map Indexing</span>
          <span class="arch-chip">4000ms Jitter Engine</span>
        </div>
      </div>

      <div class="arch-arrow">▼</div>

      <div class="arch-layer arch-layer--active">
        <div class="arch-layer__badge">LAYER 4 · OPERATOR SURFACE</div>
        <h4 class="arch-layer__title">SCADA & Industrial Presentation UI</h4>
        <p class="arch-layer__desc">
          Komponen visual 100% SVG berkecepatan 60 FPS: 240° Radial Gauges, Level Tangki, ISA-18.1 Annunciators, Mimic RHVAC, dan Faceplate Detail.
        </p>
        <div class="arch-chips">
          <span class="arch-chip">ScadaGauge</span>
          <span class="arch-chip">ScadaTankLevel</span>
          <span class="arch-chip">ScadaPilotLed</span>
          <span class="arch-chip">SynopticMimic</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 4. "DEMONYA" — INTERACTIVE DEMO WORKBENCH -->
  <!-- ========================================================================= -->
  <section class="section-container" id="demo">
    <div class="section-header">
      <div class="section-tag">LIVE TESTBENCH</div>
      <h2 class="section-heading">{$t.landing.demoTitle}</h2>
      <p class="section-sub">{$t.landing.demoSubtitle}</p>
    </div>

    <!-- Presets Bar -->
    <div class="presets-card">
      <span class="presets-label">{$t.landing.presetsTitle}:</span>
      <div class="presets-buttons">
        <button
          type="button"
          class="preset-btn"
          class:preset-btn--active={activePreset === 'normal'}
          on:click={() => applyPreset('normal')}
        >
          🟢 {$t.landing.presetNormal}
        </button>
        <button
          type="button"
          class="preset-btn"
          class:preset-btn--active={activePreset === 'warning'}
          on:click={() => applyPreset('warning')}
        >
          🟡 {$t.landing.presetWarning}
        </button>
        <button
          type="button"
          class="preset-btn"
          class:preset-btn--active={activePreset === 'trip'}
          on:click={() => applyPreset('trip')}
        >
          🔴 {$t.landing.presetTrip}
        </button>
        <button
          type="button"
          class="preset-btn"
          class:preset-btn--active={activePreset === 'offline'}
          on:click={() => applyPreset('offline')}
        >
          ⚪ {$t.landing.presetOffline}
        </button>
      </div>
    </div>

    <!-- Live Workbench Grid (Rendered cleanly when mounted) -->
    <div class="workbench-grid">
      <!-- Left: Interactive Parameter Controls -->
      <div class="workbench-controls">
        <h3 class="panel-title">🎛️ {$t.landing.controlsTitle}</h3>

        <!-- Temperature Slider (PV) -->
        <div class="control-group">
          <div class="control-label-row">
            <span class="control-label-text">{$t.landing.tempLabel}</span>
            <span class="control-val">{demoTemp} °C</span>
          </div>
          <input
            type="range"
            min="-30"
            max="10"
            step="0.2"
            bind:value={demoTemp}
            class="range-slider"
            aria-label="Process Temperature Slider"
          />
        </div>

        <!-- Setpoint Slider (SP) -->
        <div class="control-group">
          <div class="control-label-row">
            <span class="control-label-text">{$t.landing.spLabel}</span>
            <span class="control-val">{demoTarget} °C</span>
          </div>
          <input
            type="range"
            min="-30"
            max="0"
            step="0.5"
            bind:value={demoTarget}
            class="range-slider range-slider--sp"
            aria-label="Setpoint Slider"
          />
        </div>

        <!-- Tank Level Slider -->
        <div class="control-group">
          <div class="control-label-row">
            <span class="control-label-text">{$t.landing.tankLabel}</span>
            <span class="control-val">{demoTankLevel}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={demoTankLevel}
            class="range-slider"
            aria-label="Fluid Tank Level Slider"
          />
        </div>

        <!-- Rotary Switch Mode -->
        <div class="control-group">
          <div class="control-label-row">
            <span class="control-label-text">{$t.landing.switchLabel}</span>
            <span class="control-val">{demoSwitchState.toUpperCase()}</span>
          </div>
          <div class="switch-button-group">
            <button
              type="button"
              class="switch-btn"
              class:switch-btn--active={demoSwitchState === 'hand'}
              on:click={() => demoSwitchState = 'hand'}
            >
              {$t.landing.switchHand}
            </button>
            <button
              type="button"
              class="switch-btn"
              class:switch-btn--active={demoSwitchState === 'off'}
              on:click={() => demoSwitchState = 'off'}
            >
              {$t.landing.switchOff}
            </button>
            <button
              type="button"
              class="switch-btn"
              class:switch-btn--active={demoSwitchState === 'auto'}
              on:click={() => demoSwitchState = 'auto'}
            >
              {$t.landing.switchAuto}
            </button>
          </div>
        </div>

        <!-- Pilot LED Toggles -->
        <div class="control-group">
          <div class="control-label-row">
            <span class="control-label-text">{$t.landing.pilotsTitle}</span>
          </div>
          <div class="pilot-toggles">
            <label class="toggle-pill">
              <input type="checkbox" bind:checked={pilotRun} />
              <span>RUN</span>
            </label>
            <label class="toggle-pill">
              <input type="checkbox" bind:checked={pilotAux} />
              <span>AUX</span>
            </label>
            <label class="toggle-pill">
              <input type="checkbox" bind:checked={pilotAlarm} />
              <span>ALARM</span>
            </label>
            <label class="toggle-pill">
              <input type="checkbox" bind:checked={pilotComm} />
              <span>COMM</span>
            </label>
            <label class="toggle-pill">
              <input type="checkbox" bind:checked={pilotSafety} />
              <span>SAFETY</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right: Live SCADA Reactivity Display -->
      <div class="workbench-display">
        <h3 class="panel-title">⚡ REAL-TIME REACTIVE INSTRUMENTS</h3>

        <div class="instruments-grid">
          <!-- Live Gauge -->
          <div class="instrument-card">
            <div class="instrument-tag">240° RADIAL GAUGE</div>
            <ScadaGauge
              label="Evaporator Temp"
              value={demoTemp}
              unit="°C"
              min={-30}
              max={10}
              target={demoTarget}
              alarmHigh={-15.0}
              alarmLow={-26.0}
              size="md"
            />
          </div>

          <!-- Live Tank Level -->
          <div class="instrument-card">
            <div class="instrument-tag">CYLINDRICAL TANK LEVEL</div>
            <ScadaTankLevel
              label="Liquid Receiver"
              value={demoTankLevel}
              unit="%"
              highAlarm={80}
              highHighAlarm={90}
              lowAlarm={20}
              lowLowAlarm={10}
            />
          </div>

          <!-- Digital Meter & Sparkline -->
          <div class="instrument-card instrument-card--stack">
            <div>
              <div class="instrument-tag">DIGITAL VAC METER</div>
              <ScadaDigitalMeter
                label="MAIN BUS L1-N"
                value={demoSwitchState === 'off' ? 0.0 : 220.4}
                unit="VAC"
                highLimit={242.0}
                lowLimit={198.0}
                colorTheme="blue"
              />
            </div>

            <div style="margin-top: 18px;">
              <div class="instrument-tag">ROLLING SPARKLINE (10-PT)</div>
              <ScadaSparkline points={demoHistory} unit="°C" height={44} />
            </div>
          </div>

          <!-- Rotary Switch & Pilot LED Annunciators -->
          <div class="instrument-card instrument-card--stack">
            <div>
              <div class="instrument-tag">ROTARY 3-POS SELECTOR</div>
              <div style="display: flex; justify-content: center; padding: 10px 0;">
                <ScadaRotarySwitch
                  position={demoSwitchState}
                  on:change={(e) => demoSwitchState = e.detail.position}
                />
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div class="instrument-tag">JEWEL PILOT LAMPS</div>
              <div class="pilot-row">
                <ScadaPilotLed label="RUN" state={pilotRun ? 'run' : 'off'} />
                <ScadaPilotLed label="AUX" state={pilotAux ? 'aux' : 'off'} />
                <ScadaPilotLed label="ALARM" state={pilotAlarm ? 'warn' : 'off'} pulse={pilotAlarm} />
                <ScadaPilotLed label="COMM" state={pilotComm ? 'comm' : 'off'} />
                <ScadaPilotLed label="SAFE" state={pilotSafety ? 'trip' : 'off'} pulse={pilotSafety} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Launch Cards -->
    <div class="launch-cards-grid">
      <a href="{base}/dashboard" class="launch-card">
        <div class="launch-card__icon">📊</div>
        <div class="launch-card__content">
          <h4 class="launch-card__title">Master SCADA Dashboard →</h4>
          <p class="launch-card__desc">{$t.landing.launchDashboardDesc}</p>
        </div>
      </a>

      <a href="{base}/rhvac" class="launch-card">
        <div class="launch-card__icon">❄️</div>
        <div class="launch-card__content">
          <h4 class="launch-card__title">RHVAC P&ID Refrigeration System →</h4>
          <p class="launch-card__desc">{$t.landing.launchRhvacDesc}</p>
        </div>
      </a>

      <a href="{base}/widgets" class="launch-card">
        <div class="launch-card__icon">🎛️</div>
        <div class="launch-card__content">
          <h4 class="launch-card__title">Complete Widget Reference Catalog →</h4>
          <p class="launch-card__desc">{$t.landing.launchWidgetsDesc}</p>
        </div>
      </a>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. "DOKUMENTASI" — ENGINEERING DOCUMENTATION HUB -->
  <!-- ========================================================================= -->
  <section class="section-container" id="docs">
    <div class="section-header">
      <div class="section-tag">ENGINEERING MANUAL</div>
      <h2 class="section-heading">{$t.landing.docsTitle}</h2>
      <p class="section-sub">{$t.landing.docsSubtitle}</p>
    </div>

    <div class="docs-hub">
      <!-- Tabs Nav -->
      <div class="docs-tabs" role="tablist">
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'quickstart'}
          on:click={() => activeDocTab = 'quickstart'}
        >
          🚀 {$t.landing.tabQuickstart}
        </button>
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'arch'}
          on:click={() => activeDocTab = 'arch'}
        >
          🏛️ {$t.landing.tabArch}
        </button>
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'hardware'}
          on:click={() => activeDocTab = 'hardware'}
        >
          🔌 {$t.landing.tabHardware}
        </button>
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'widgets'}
          on:click={() => activeDocTab = 'widgets'}
        >
          🎛️ {$t.landing.tabWidgets}
        </button>
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'rhvac'}
          on:click={() => activeDocTab = 'rhvac'}
        >
          ❄️ {$t.landing.tabRhvac}
        </button>
        <button
          type="button"
          class="docs-tab"
          class:docs-tab--active={activeDocTab === 'theming'}
          on:click={() => activeDocTab = 'theming'}
        >
          🎨 {$t.landing.tabTheming}
        </button>
      </div>

      <!-- Tab Content Display -->
      <div class="docs-content">
        <!-- 1. QUICKSTART -->
        {#if activeDocTab === 'quickstart'}
          <div class="doc-panel">
            <h3 class="doc-title">Panduan Mulai Cepat (Quick Start Guide)</h3>
            <p class="doc-lead">
              Dash-Template dibangun di atas SvelteKit 2 + Svelte 5 dengan dukungan TypeScript dan Vite 6.
            </p>

            <h4 class="doc-sub">1. Prasyarat Sistem</h4>
            <ul class="doc-list">
              <li>Node.js 18.x atau versi LTS yang lebih baru.</li>
              <li>Manajer paket <code>pnpm</code> (direkomendasikan) atau <code>npm</code>.</li>
              <li>Docker & Docker Compose (opsional untuk deployment server produksi).</li>
            </ul>

            <h4 class="doc-sub">2. Kloning & Jalankan Server Lokal</h4>
            <div class="code-box">
              <div class="code-box__header">
                <span>BASH TERMINAL</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('quickstart', 'git clone https://github.com/Naufaldo/Dash-Template.git my-scada\ncd my-scada\npnpm install\npnpm dev')}
                >
                  {snippetCopied === 'quickstart' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>git clone https://github.com/Naufaldo/Dash-Template.git my-scada
cd my-scada
pnpm install
pnpm dev</code></pre>
            </div>
            <p class="doc-note">Aplikasi akan berjalan secara instan pada <code>http://localhost:5173</code>.</p>

            <h4 class="doc-sub">3. Deployment Produksi dengan Docker</h4>
            <div class="code-box">
              <div class="code-box__header">
                <span>DOCKER COMPOSE</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('docker', 'docker compose up -d --build')}
                >
                  {snippetCopied === 'docker' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>docker compose up -d --build</code></pre>
            </div>
            <p class="doc-note">Dashboard produksi siap diakses pada port <code>3000</code>.</p>
          </div>

        <!-- 2. ARCHITECTURE -->
        {:else if activeDocTab === 'arch'}
          <div class="doc-panel">
            <h3 class="doc-title">Arsitektur Store & Telemetri Reaktif</h3>
            <p class="doc-lead">
              Aliran data mengikuti paradigma unidirectional state management terisolasi di <code>$lib/stores/devices.ts</code>.
            </p>

            <h4 class="doc-sub">Kontrak Tipe Telemetri (<code>$lib/types/iot.ts</code>)</h4>
            <div class="code-box">
              <div class="code-box__header">
                <span>TYPESCRIPT INTERFACE</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('types', 'export interface DeviceTelemetry {\n  id: string;\n  name: string;\n  tag: string;\n  category: string;\n  location: string;\n  status: "normal" | "warning" | "critical" | "offline";\n  primary: SensorMetric;\n  secondary: SensorMetric;\n  relays: RelayState;\n}')}
                >
                  {snippetCopied === 'types' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>export interface DeviceTelemetry &#123;
  id: string;
  name: string;
  tag: string;
  category: string;
  location: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  primary: SensorMetric;
  secondary: SensorMetric;
  relays: RelayState;
&#125;

export interface SensorMetric &#123;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  target?: number;      // Setpoint (SP)
  alarmHigh?: number;   // Batas atas alarm
  alarmLow?: number;    // Batas bawah alarm
  quality: 'GOOD' | 'BAD' | 'STALE';
  history: number[];    // Riwayat 14-point untuk sparkline
&#125;</code></pre>
            </div>

            <h4 class="doc-sub">Mesin Simulasi Jitter Bawaan</h4>
            <p class="doc-text">
              Di lingkungan pengembangan, fungsi <code>initMockSimulationEngine()</code> menghasilkan fluktuasi telemetri acak setiap 4.000 ms agar operator dapat memverifikasi responsivitas antarmuka tanpa hardware riil.
            </p>
          </div>

        <!-- 3. HARDWARE INTEGRATION -->
        {:else if activeDocTab === 'hardware'}
          <div class="doc-panel">
            <h3 class="doc-title">Integrasi Perangkat Keras & Protokol Industri</h3>
            <p class="doc-lead">
              Cara menghubungkan Dash-Template ke PLC, Inverter, dan Sensor Industri nyata.
            </p>

            <h4 class="doc-sub">A. Integrasi MQTT Broker (Mosquitto / EMQX)</h4>
            <p class="doc-text">
              Cukup gantikan pemanggilan simulasi di <code>$lib/stores/devices.ts</code> dengan koneksi klien MQTT:
            </p>
            <div class="code-box">
              <div class="code-box__header">
                <span>TYPESCRIPT / MQTT CLIENT</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('mqtt', 'import mqtt from "mqtt";\n\nconst client = mqtt.connect("ws://broker.factory-edge.local:8083/mqtt");\nclient.on("connect", () => {\n  client.subscribe("factory/scada/+/telemetry");\n});\nclient.on("message", (topic, payload) => {\n  const data = JSON.parse(payload.toString());\n  devicesStore.updateDevice(data.id, data);\n});')}
                >
                  {snippetCopied === 'mqtt' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>import mqtt from 'mqtt';

const client = mqtt.connect('ws://broker.factory-edge.local:8083/mqtt');

client.on('connect', () => &#123;
  client.subscribe('factory/scada/+/telemetry');
&#125;);

client.on('message', (topic, payload) => &#123;
  const data = JSON.parse(payload.toString());
  devicesStore.updateDevice(data.id, data);
&#125;);</code></pre>
            </div>

            <h4 class="doc-sub">B. Modbus RTU / RS485 via Node-RED Bridge</h4>
            <p class="doc-text">
              Gunakan Node-RED atau gateway Python di edge IPC untuk membaca register Modbus RTU (Holding Registers 40001 - 40010) lalu pancarkan via WebSocket server lokal ke port browser.
            </p>
          </div>

        <!-- 4. WIDGET API & SNIPPETS -->
        {:else if activeDocTab === 'widgets'}
          <div class="doc-panel">
            <h3 class="doc-title">Katalog API Widget & Snippet Kode Svelte 5</h3>
            <p class="doc-lead">
              Komponen siap pakai tanpa dependensi eksternal. Langsung impor dan gunakan dalam template Anda.
            </p>

            <h4 class="doc-sub">1. Radial Arc Gauge 240° (<code>ScadaGauge.svelte</code>)</h4>
            <div class="code-box">
              <div class="code-box__header">
                <span>SVELTE COMPONENT USAGE</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('gauge', '<script>\n  import ScadaGauge from "$lib/components/ScadaGauge.svelte";\n<\/script>\n\n<ScadaGauge\n  label="Suhu Evaporator"\n  value={-18.4}\n  unit="°C"\n  min={-30}\n  max={10}\n  target={-20.0}\n  alarmHigh={-15.0}\n  alarmLow={-26.0}\n  size="md"\n/>')}
                >
                  {snippetCopied === 'gauge' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>&lt;script&gt;
  import ScadaGauge from '$lib/components/ScadaGauge.svelte';
&lt;/script&gt;

&lt;ScadaGauge
  label="Suhu Evaporator"
  value=&#123;-18.4&#125;
  unit="°C"
  min=&#123;-30&#125;
  max=&#123;10&#125;
  target=&#123;-20.0&#125;
  alarmHigh=&#123;-15.0&#125;
  alarmLow=&#123;-26.0&#125;
  size="md"
/&gt;</code></pre>
            </div>

            <h4 class="doc-sub">2. Level Tangki Silindris Vertikal (<code>ScadaTankLevel.svelte</code>)</h4>
            <div class="code-box">
              <div class="code-box__header">
                <span>SVELTE COMPONENT USAGE</span>
                <button
                  type="button"
                  class="code-copy-btn"
                  on:click={() => copySnippet('tank', '<ScadaTankLevel\n  label="Liquid Receiver"\n  value={68.0}\n  unit="%"\n  highAlarm={80}\n  highHighAlarm={90}\n  lowAlarm={20}\n  lowLowAlarm={10}\n/>')}
                >
                  {snippetCopied === 'tank' ? '✓ Tersalin' : 'Salin Kode'}
                </button>
              </div>
              <pre><code>&lt;ScadaTankLevel
  label="Liquid Receiver"
  value=&#123;68.0&#125;
  unit="%"
  highAlarm=&#123;80&#125;
  highHighAlarm=&#123;90&#125;
  lowAlarm=&#123;20&#125;
  lowLowAlarm=&#123;10&#125;
/&gt;</code></pre>
            </div>
          </div>

        <!-- 5. RHVAC ENGINEERING -->
        {:else if activeDocTab === 'rhvac'}
          <div class="doc-panel">
            <h3 class="doc-title">Panduan Rekayasa Refrigerasi & RHVAC</h3>
            <p class="doc-lead">
              Metrik termodinamika dan diagram P&ID terintegrasi untuk sistem pendingin komersial & industri.
            </p>

            <h4 class="doc-sub">Kalkulasi Termodinamika Real-Time</h4>
            <div class="calc-grid">
              <div class="calc-card">
                <div class="calc-formula">Superheat (SH) = T_suction - T_evap_sat</div>
                <p class="calc-desc">
                  Mencegah cairan refrigeran masuk ke kompresor (liquid slugging). Rentang operasi optimal: <strong>5.0 K s/d 8.0 K</strong>.
                </p>
              </div>
              <div class="calc-card">
                <div class="calc-formula">Subcooling (SC) = T_cond_sat - T_liquid</div>
                <p class="calc-desc">
                  Memastikan 100% cairan murni masuk ke katup ekspansi (TXV) tanpa gelembung gas (flash gas). Rentang optimal: <strong>3.0 K s/d 6.0 K</strong>.
                </p>
              </div>
            </div>
          </div>

        <!-- 6. THEMING & DESIGN -->
        {:else if activeDocTab === 'theming'}
          <div class="doc-panel">
            <h3 class="doc-title">Kustomisasi Desain & Kontrak Token CSS</h3>
            <p class="doc-lead">
              Semua warna, tipografi, dan kontras diatur melalui variabel CSS di <code>src/app.css</code> dan mematuhi dokumen <code>DESIGN.md</code>.
            </p>

            <h4 class="doc-sub">Token Warna Status Annunciator Utama</h4>
            <div class="tokens-table-wrap">
              <table class="tokens-table">
                <thead>
                  <tr>
                    <th>Token Variabel</th>
                    <th>Dark Mode</th>
                    <th>Light Mode</th>
                    <th>Arti Operasional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>--status-normal</code></td>
                    <td><span class="color-badge" style="background: #00e676;"></span> #00e676</td>
                    <td><span class="color-badge" style="background: #00a844;"></span> #00a844</td>
                    <td>Berjalan optimal, relay ON, kondisi aman</td>
                  </tr>
                  <tr>
                    <td><code>--status-warning</code></td>
                    <td><span class="color-badge" style="background: #ffab00;"></span> #ffab00</td>
                    <td><span class="color-badge" style="background: #e69500;"></span> #e69500</td>
                    <td>Mendekati batas setpoint, perhatian teknisi</td>
                  </tr>
                  <tr>
                    <td><code>--status-critical</code></td>
                    <td><span class="color-badge" style="background: #ff3d00;"></span> #ff3d00</td>
                    <td><span class="color-badge" style="background: #d50000;"></span> #d50000</td>
                    <td>Batas trip terlampaui, pemutus trip aktif</td>
                  </tr>
                  <tr>
                    <td><code>--status-comm</code></td>
                    <td><span class="color-badge" style="background: #00e5ff;"></span> #00e5ff</td>
                    <td><span class="color-badge" style="background: #0091ea;"></span> #0091ea</td>
                    <td>Aktivitas paket RS485 / MQTT TX/RX</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 6. INDUSTRIAL FOOTER -->
  <!-- ========================================================================= -->
  <footer class="landing-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <span class="brand-bolt">⚡</span>
        <div>
          <span class="footer-brand__name">Dash-Template</span>
          <span class="footer-brand__desc">Open Source Industrial SCADA & IoT Telemetry Starter Kit</span>
        </div>
      </div>

      <div class="footer-links">
        <a href="{base}/dashboard">Dashboard Utama</a>
        <a href="{base}/rhvac">Desain RHVAC</a>
        <a href="{base}/widgets">Katalog Widget</a>
        <a href="#docs">Dokumentasi</a>
        <a href="https://github.com/Naufaldo/Dash-Template" target="_blank" rel="noreferrer">GitHub Repository</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span>MIT Open Source License · Engineered with SvelteKit 2 & Svelte 5</span>
      <span>Zero Charting Bloat · Industrial ISA-18.1 Compliance</span>
    </div>
  </footer>
</div>

<style>
  /* =========================================================================
     GLOBAL PAGE LAYOUT & ENLARGED TYPOGRAPHY SCALING
     ========================================================================= */
  .landing-page {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 16px 0 64px 0;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-primary);
  }

  /* 1. HERO SECTION */
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 56px 28px 48px 28px;
    background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-canvas) 100%);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--color-primary-subtle);
    border: 1.5px solid var(--color-primary);
    border-radius: var(--radius-full);
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 800;
    color: var(--color-primary);
    font-family: var(--font-mono);
    margin-bottom: 24px;
    letter-spacing: 0.04em;
  }

  .pulse-indicator {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--color-primary);
    box-shadow: 0 0 10px var(--color-primary);
  }

  .hero-title {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 900;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin: 0 0 20px 0;
    max-width: 980px;
    color: var(--color-text-primary);
  }

  .hero-subtitle {
    font-size: clamp(17px, 2.2vw, 21px);
    color: var(--color-text-secondary);
    line-height: 1.65;
    max-width: 860px;
    margin: 0 0 32px 0;
  }

  /* CTA Buttons (Bigger, High-Contrast, Easy to Click) */
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 36px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 800;
    padding: 14px 28px;
    border-radius: 6px;
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
    line-height: 1.2;
  }

  .btn--primary {
    background: var(--color-primary);
    color: #0c0e12;
    border: 1px solid var(--color-primary);
  }
  .btn--primary:hover {
    filter: brightness(1.15);
    box-shadow: 0 0 20px var(--color-primary-subtle);
  }

  .btn--secondary {
    background: var(--bg-surface-elevated);
    color: var(--color-text-primary);
    border: 1px solid var(--border-strong);
  }
  .btn--secondary:hover {
    background: var(--border-subtle);
    border-color: var(--color-primary);
  }

  .btn--tertiary {
    background: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--border-subtle);
  }
  .btn--tertiary:hover {
    background: var(--border-subtle);
    border-color: var(--border-strong);
  }

  /* Terminal Command Box */
  .terminal-card {
    width: 100%;
    max-width: 860px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-bottom: 32px;
    box-shadow: var(--shadow-md);
  }

  .terminal-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-surface);
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .terminal-tabs {
    display: flex;
    gap: 8px;
  }

  .terminal-tab {
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .terminal-tab--active {
    background: var(--bg-surface-elevated);
    color: var(--color-primary);
  }

  .copy-btn {
    background: var(--bg-surface-elevated);
    border: 1px solid var(--border-subtle);
    color: var(--color-text-primary);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .copy-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .terminal-body {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    font-family: var(--font-mono);
  }

  .terminal-prompt {
    color: var(--color-primary);
    font-weight: 900;
    font-size: 16px;
  }

  .terminal-code {
    color: var(--color-text-primary);
    font-size: 14px;
    white-space: nowrap;
    line-height: 1.4;
  }

  /* Telemetry Health Strip (Larger, Tabular Numbers) */
  .telemetry-strip {
    width: 100%;
    max-width: 1060px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 14px;
  }

  .telemetry-item {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .telemetry-item__header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .status-dot--online { background: var(--status-normal); box-shadow: 0 0 8px var(--status-normal); }
  .status-dot--comm { background: var(--status-comm); box-shadow: 0 0 8px var(--status-comm); }
  .status-dot--loop { background: var(--status-aux); box-shadow: 0 0 8px var(--status-aux); }
  .status-dot--safe { background: var(--status-normal); }

  .telemetry-item__label {
    font-size: 13px;
    color: var(--color-text-secondary);
    font-weight: 700;
  }

  .telemetry-item__value {
    font-size: 15px;
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--color-text-primary);
  }

  /* SECTION WRAPPERS */
  .section-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
    scroll-margin-top: 80px;
  }

  .section-header {
    text-align: center;
    max-width: 860px;
    margin: 0 auto;
  }

  .section-tag {
    font-size: 13px;
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--color-primary);
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .section-heading {
    font-size: clamp(26px, 3.8vw, 38px);
    font-weight: 900;
    margin: 0 0 12px 0;
    color: var(--color-text-primary);
    letter-spacing: -0.015em;
  }

  .section-sub {
    font-size: 17px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  /* 2. FEATURES GRID (ENLARGED CARDS & CRISP TEXT) */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }

  .feature-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 24px;
    transition: transform var(--transition-fast), border-color var(--transition-fast);
  }
  .feature-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }

  .feature-card__tag {
    font-size: 12px;
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--color-primary);
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }

  .feature-card__title {
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 10px 0;
    color: var(--color-text-primary);
    line-height: 1.3;
  }

  .feature-card__desc {
    font-size: 15px;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin: 0;
  }

  /* 3. ARCHITECTURE PIPELINE */
  .arch-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 980px;
    margin: 0 auto;
    width: 100%;
  }

  .arch-layer {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 20px 24px;
    position: relative;
    transition: all var(--transition-fast);
  }
  .arch-layer--active {
    border-color: var(--color-primary);
    background: var(--bg-surface-elevated);
  }

  .arch-layer__badge {
    font-size: 12px;
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--color-primary);
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }

  .arch-layer__title {
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 8px 0;
    color: var(--color-text-primary);
  }

  .arch-layer__desc {
    font-size: 15px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0 0 14px 0;
  }

  .arch-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .arch-chip {
    font-size: 13px;
    font-family: var(--font-mono);
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
  }

  .arch-arrow {
    text-align: center;
    font-size: 18px;
    color: var(--color-primary);
    line-height: 1;
  }

  /* 4. DEMO WORKBENCH */
  .presets-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 16px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
  }

  .presets-label {
    font-size: 14px;
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--color-text-secondary);
  }

  .presets-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .preset-btn {
    background: var(--bg-surface-elevated);
    border: 1px solid var(--border-subtle);
    color: var(--color-text-primary);
    font-size: 14px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .preset-btn:hover {
    border-color: var(--border-strong);
  }
  .preset-btn--active {
    background: var(--color-primary-subtle);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .workbench-grid {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 22px;
  }

  @media (max-width: 960px) {
    .workbench-grid {
      grid-template-columns: 1fr;
    }
  }

  .workbench-controls {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .panel-title {
    font-size: 14px;
    font-family: var(--font-mono);
    font-weight: 900;
    color: var(--color-primary);
    margin: 0;
    letter-spacing: 0.05em;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .control-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .control-label-text {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-secondary);
  }

  .control-val {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 16px;
    color: var(--color-text-primary);
  }

  .range-slider {
    width: 100%;
    height: 6px;
    accent-color: var(--color-primary);
    cursor: pointer;
  }
  .range-slider--sp {
    accent-color: var(--status-comm);
  }

  .switch-button-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
    background: var(--bg-canvas);
    padding: 4px;
    border-radius: var(--radius-sm);
  }

  .switch-btn {
    background: transparent;
    border: none;
    font-size: 12px;
    font-weight: 700;
    font-family: var(--font-mono);
    color: var(--color-text-secondary);
    padding: 8px 4px;
    border-radius: 4px;
    cursor: pointer;
  }
  .switch-btn--active {
    background: var(--bg-surface-elevated);
    color: var(--color-primary);
  }

  .pilot-toggles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .toggle-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-family: var(--font-mono);
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--color-text-primary);
  }
  .toggle-pill input {
    accent-color: var(--color-primary);
  }

  .workbench-display {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .instruments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 18px;
  }

  .instrument-card {
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .instrument-card--stack {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }

  .instrument-tag {
    font-size: 11px;
    font-family: var(--font-mono);
    font-weight: 800;
    color: var(--color-text-secondary);
    margin-bottom: 10px;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .pilot-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 6px 0;
  }

  /* Launch cards */
  .launch-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 18px;
  }

  .launch-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: 20px;
    text-decoration: none;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: all var(--transition-fast);
  }
  .launch-card:hover {
    border-color: var(--color-primary);
    background: var(--bg-surface-elevated);
    transform: translateY(-2px);
  }

  .launch-card__icon {
    font-size: 32px;
  }

  .launch-card__title {
    font-size: 18px;
    font-weight: 800;
    margin: 0 0 6px 0;
    color: var(--color-primary);
  }

  .launch-card__desc {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  /* 5. DOCUMENTATION HUB (ENLARGED & HIGH LEGIBILITY) */
  .docs-hub {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .docs-tabs {
    display: flex;
    overflow-x: auto;
    background: var(--bg-canvas);
    border-bottom: 1px solid var(--border-subtle);
    scrollbar-width: none;
  }
  .docs-tabs::-webkit-scrollbar { display: none; }

  .docs-tab {
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-size: 15px;
    font-weight: 700;
    padding: 14px 22px;
    cursor: pointer;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
    transition: all var(--transition-fast);
  }
  .docs-tab:hover {
    color: var(--color-text-primary);
  }
  .docs-tab--active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    background: var(--bg-surface);
  }

  .docs-content {
    padding: 32px;
  }

  .doc-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 960px;
  }

  .doc-title {
    font-size: 26px;
    font-weight: 900;
    margin: 0;
    color: var(--color-text-primary);
    letter-spacing: -0.015em;
  }

  .doc-lead {
    font-size: 17px;
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.7;
  }

  .doc-sub {
    font-size: 18px;
    font-weight: 800;
    margin: 14px 0 0 0;
    color: var(--color-text-primary);
  }

  .doc-list {
    margin: 0;
    padding-left: 24px;
    color: var(--color-text-secondary);
    font-size: 15px;
    line-height: 1.85;
  }

  .doc-text {
    font-size: 15px;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin: 0;
  }

  .doc-note {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin: 0;
  }
  .doc-note code {
    color: var(--color-primary);
    font-family: var(--font-mono);
  }

  .code-box {
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .code-box__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-surface-elevated);
    padding: 8px 16px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--color-text-secondary);
    border-bottom: 1px solid var(--border-subtle);
  }

  .code-copy-btn {
    background: transparent;
    border: 1px solid var(--border-subtle);
    color: var(--color-text-primary);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .code-copy-btn:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .code-box pre {
    margin: 0;
    padding: 16px 18px;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-text-primary);
    line-height: 1.6;
  }

  .calc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .calc-card {
    background: var(--bg-canvas);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 16px;
  }

  .calc-formula {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 800;
    color: var(--color-primary);
    margin-bottom: 8px;
  }

  .calc-desc {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  .tokens-table-wrap {
    overflow-x: auto;
  }

  .tokens-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: left;
  }

  .tokens-table th, .tokens-table td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border-subtle);
  }

  .tokens-table th {
    background: var(--bg-surface-elevated);
    color: var(--color-text-secondary);
    font-size: 13px;
    font-family: var(--font-mono);
  }

  .tokens-table td code {
    font-family: var(--font-mono);
    color: var(--color-primary);
  }

  .color-badge {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    margin-right: 6px;
    vertical-align: middle;
  }

  /* 6. FOOTER */
  .landing-footer {
    border-top: 1px solid var(--border-subtle);
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-bolt {
    font-size: 28px;
    color: var(--color-primary);
  }

  .footer-brand__name {
    font-size: 20px;
    font-weight: 900;
    display: block;
    color: var(--color-text-primary);
  }

  .footer-brand__desc {
    font-size: 13px;
    color: var(--color-text-secondary);
    display: block;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-links a {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    transition: color var(--transition-fast);
  }
  .footer-links a:hover {
    color: var(--color-primary);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    font-size: 13px;
    color: var(--color-text-secondary);
    border-top: 1px solid var(--border-subtle);
    padding-top: 20px;
  }
</style>
