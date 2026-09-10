# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-09-10

### Added
- **GitHub Pages CI/CD Pipeline**: `.github/workflows/deploy.yml` automated workflow for building and deploying static assets to GitHub Pages with `@sveltejs/adapter-static`, `BASE_PATH` detection, and `.nojekyll` support.
- **Dual Adapter Architecture**: Dynamic switching between `@sveltejs/adapter-node` (production Docker/Node server) and `@sveltejs/adapter-static` (GitHub Pages static export with `404.html` SPA routing).

### Changed
- **High-Legibility Landing Page Sizing**:
  - Significantly enlarged typography across all sections (hero title to 54px, headings to 38px, body copy to 16px, monospace readouts to 16px-18px).
  - Increased button padding, touch targets, terminal code blocks, and interactive control sliders for effortless reading on desktop and tablet control monitors.
- **Performance & Initial Load Optimization**:
  - Streamlined first-paint rendering to prevent visual clutter and heavy blocking intervals on initial landing page load.
  - Eliminated unnecessary continuous client intervals during initial visit.

## [1.2.0] - 2026-09-10

### Added
- **Production-Grade Landing Page (`/`)**:
  - Industrial hero header with high-contrast tabular monospace typography, 3 CTAs, and a 1-click terminal quickstart command box.
  - Live Telemetry Health Strip showing active nodes, communication bus activity, scan rates, and ISA-18.1 alarm status.
  - Engineering Highlights breakdown detailing pure SVG 60 FPS performance, ISA-18.1 alarm architecture, 240° Node-RED gauges, and edge readiness.
  - Grounded System Topology pipeline diagram (Archify pillar) linking field sensors, transport brokers, ingestion store, and SCADA UI.
  - Interactive Live Demo Workbench with disturbance presets (Normal, High Temp Warning, Overpressure Trip, Bus Comm Loss), interactive PV/SP and fluid tank sliders, 3-position rotary mode switch, and responsive pilot LED lamps.
  - Integrated Engineering Documentation Hub featuring interactive tabbed guides for Quick Start, Store Architecture, Hardware Integration (Modbus/MQTT), Widget API & copyable code snippets, RHVAC thermodynamics, and theme tokens.
- **Route Restructuring & Navigation**:
  - Moved the master SCADA control room view to `/dashboard` (`src/routes/dashboard/+page.svelte`).
  - Added `Beranda` (`/`) and `Dokumentasi` (`/#docs`) tabs in the sticky topbar navigation.
  - Updated device detail backlinks to point directly to `/dashboard`.
- **Extended Bilingual Dictionary**:
  - Added complete Indonesian (`id`) and English (`en`) dictionary keys for the entire landing page, interactive demo controls, and documentation tabs in `src/lib/stores/locale.ts`.

## [1.1.0] - 2026-09-10

### Added
- **RHVAC Design Template**: Dedicated interactive P&ID synoptic view (`/rhvac`) with animated refrigerant flow, thermodynamic Superheat & Subcooling calculations, and operating mode controls.
- **User-Resizable Widget System**: `WidgetContainer.svelte` and `layout.ts` supporting S / M / W / L size toggling with `localStorage` persistence and CSS container queries.
- **New Industrial SCADA Widgets**:
  - `ScadaTankLevel.svelte` (Vertical vessel level with LL/L/H/HH limits).
  - `ScadaDigitalMeter.svelte` (7-segment style digital meter with HI/LO LEDs and peak hold).
  - `ScadaRotarySwitch.svelte` (3-position HAND-OFF-AUTO knurled dial selector).
  - `ScadaAlarmAnnunciator.svelte` (ISA-18.1 compliant 8-window alarm annunciator panel with ACK/RESET/TEST).
  - `ScadaPIDFaceplate.svelte` (PID loop faceplate with PV/SP dual bars, MV output bar, and AUTO/MANUAL toggle).
  - `ScadaMultiBar.svelte` (Multi-channel comparative bar for 3-phase power or multi-zone telemetry).
- **Interactive Widget Catalog Page**: Live showroom (`/widgets`) with responsive testing.
- **Extended Localization**: Comprehensive Indonesian and English translations for RHVAC and industrial controls.
- **RHVAC Technical Documentation**: `docs/RHVAC_GUIDE.md` covering thermodynamic cycles and control strategies.

## [1.0.0] - 2026-09-10

### Added
- **Radial Arc Gauges**: 240° sweep gauge (`ScadaGauge.svelte`) with Setpoint notch, dynamic pointer needle, alarm zone color fills, and tabular digital readouts.
- **Industrial Annunciator Pilot LEDs**: Jewel-glow lamps (`ScadaPilotLed.svelte`) with RUN, AUX, WARN, TRIP, COMM, and OFF states.
- **Sparkline Rolling Trends**: Pure SVG 14-point mini trends (`ScadaSparkline.svelte`) with bounds and delta indicators.
- **Graphic Linear Level Bars**: Compact level bars (`GraphicBar.svelte`) with SP target markers and high/low alarm limits.
- **Universal Equipment Faceplates**: Standardized modular card (`DeviceFaceplate.svelte`) for industrial IoT equipment monitoring.
- **Interactive Synoptic Process Mimic**: Dynamic SVG piping & process flow diagram (`SynopticMimic.svelte`) with flow animation.
- **Reorderable Grid**: Native drag-and-drop and keyboard-accessible shift controls (`←` `→`) with `localStorage` order persistence.
- **Bilingual Support**: Indonesian (default) and English localization with reactive toggle store (`locale.ts`).
- **SCADA Dark & Light Themes**: High-contrast, WCAG compliant industrial color system (`theme.ts`, `app.css`, `DESIGN.md`).
- **Telemetry Simulation Engine**: 4-second jitter engine for immediate out-of-the-box local testing without hardware dependencies.
- **Production Dockerization**: Multi-stage `Dockerfile` and `docker-compose.yml` with healthcheck and non-root runner.
- **Full Documentation & Guides**: Complete docs in `docs/` covering Architecture, Widget Catalog, Hardware Integration, and Theming.
- **Agent Governance & Skills**: Embedded Seven Pillars constitution (`AGENTS.md`, `GEMINI.md`, `.agents/`).
