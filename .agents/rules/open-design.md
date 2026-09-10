# OpenDesign Guidelines (Design Systems & Live Artifacts)

> Source: `nexu-io/open-design`

## Core Standards

### 1. `DESIGN.md` as Visual Contract
- All visual elements, styling tokens, and layout patterns must be defined in or reference `DESIGN.md`.
- Never guess random hex colors. Use the defined CSS design tokens (e.g. `--bg-surface`, `--color-primary`, `--status-online`).

### 2. Live Dashboard & Interactive Artifacts
- Build live, functional interfaces with real CSS and responsive layouts.
- For IoT dashboards, provide clear telemetry displays (gauges, metric cards, time-series graphs) with real-time feedback.
- Interactive elements must reflect actual states (connected/disconnected, relay active/inactive).
