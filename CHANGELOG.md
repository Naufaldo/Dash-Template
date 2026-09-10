# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
