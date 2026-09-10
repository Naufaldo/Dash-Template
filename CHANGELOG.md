# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
