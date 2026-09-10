# 🎛️ Bare Industrial SCADA & Node-RED IoT Dashboard Template

[![SvelteKit 2](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **A modern, modular, production-grade starter template for building Industrial SCADA, IoT, and HMI telemetry dashboards.**  
> Engineered with zero external charting bloat, pure SVG Node-RED style radial gauges, industrial pilot lamps, live synoptic process mimics, and bilingual support.

---

## ⚡ Key Highlights & Features

- ❄️ **Dedicated RHVAC Design Template (`/rhvac`)**: Complete P&ID diagram with outdoor CDU, cold room enclosure, evaporator coils, TXV valve, animated refrigerant flow, and real-time Superheat / Subcooling calculations.
- 📐 **Interactive User Resizability**: Every widget can be resized by the operator (`S` Compact, `M` Standard, `W` Wide 2x1, `L` Large 2x2) with automatic `localStorage` persistence.
- 🎛️ **Comprehensive Industrial SCADA Widget Suite**:
  - **Radial Arc Gauges 240°** (`ScadaGauge.svelte`)
  - **Vertical Cylindrical Tank Level** (`ScadaTankLevel.svelte`)
  - **Digital Panel Meters** (`ScadaDigitalMeter.svelte`)
  - **Industrial Rotary Switches** (`ScadaRotarySwitch.svelte`)
  - **ISA-18.1 Alarm Annunciators** (`ScadaAlarmAnnunciator.svelte`)
  - **Industrial PID Faceplates** (`ScadaPIDFaceplate.svelte`)
  - **Multi-Channel Bar Charts** (`ScadaMultiBar.svelte`)
  - **Pilot Annunciator LEDs** (`ScadaPilotLed.svelte`)
  - **Pure SVG Rolling Sparklines** (`ScadaSparkline.svelte`)
- 🌐 **100% Dual Theme & Dual Language**: Instant switching between Dark and Light mode, as well as Indonesian and English.

- 🎯 **Node-RED `ui_gauge` Style Radial Arc Gauges**: 240° sweep arc with Setpoint (SP) notch, dynamic needle pointer, alarm zone color fills, and tabular monospace readouts.
- 💡 **Industrial Annunciator Pilot LED Lamps**: Heavy-duty metallic bezel indicator lamps (`RUN`, `AUX`, `WARN`, `TRIP`, `COMM`, `OFF`) with jewel lens reflections.
- 📈 **Pure SVG Rolling Sparklines**: 14-point mini trends with min/max boundary indicators and delta slope calculation.
- 🎚️ **Compact Graphic Level Bars**: Horizontal level bars with high/low limit thresholds.
- 🔄 **Interactive Synoptic Process Mimic**: Dynamic SVG piping diagrams with animated fluid flow lines and live callouts.
- 🔀 **Reorderable Grid**: Drag-and-drop or shift buttons (`←` `→`) with automatic `localStorage` persistence.
- 🌐 **Bilingual (Indonesian & English)**: Native Indonesian default with immediate English toggle.
- 🌓 **Industrial SCADA Dark & Light Themes**: High-contrast, WCAG AAA/AA compliant color tokens with zero flash-of-unauthenticated-theme (FOUC).
- 🎲 **Built-in Mock Simulation Engine**: Runs out-of-the-box with realistic telemetry jitter every 4 seconds.
- 🐳 **Production Docker & Multi-stage Build**: Ready for immediate VPS or on-premise industrial IPC deployment.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Naufaldo/Dash-Template.git my-iot-dashboard
cd my-iot-dashboard
pnpm install
```

### 2. Run Local Development Server
```bash
pnpm dev
```
Visit **`http://localhost:5173`** in your browser.

---

## 🐳 Docker Deployment

### Single-command Docker Compose:
```bash
docker compose up -d --build
```
The dashboard will be available at `http://localhost:3000`.

### Manual Docker Build:
```bash
docker build -t scada-dashboard:latest .
docker run -d -p 3000:3000 --name scada-dashboard scada-dashboard:latest
```

---

## 📂 Project Structure

```text
Dash-Template/
├── .agents/                       # AI Agent Skills & Governance Constitution
│   ├── rules/                     # Anti-slop, ponytail, open-design, archify rules
│   └── skills/                    # Specialized on-demand agent skills
├── docs/                          # In-depth Engineering Guides
│   ├── ARCHITECTURE.md            # Topology, data flows, reactive store design
│   ├── WIDGET_CATALOG.md          # Component API, props, and code snippets
│   ├── HARDWARE_INTEGRATION.md    # Connecting real MQTT, WebSockets, & Modbus
│   └── LOCALIZATION_AND_THEMES.md # Adding languages and custom theme tokens
├── src/
│   ├── app.css                    # Industrial SCADA Design Tokens (Light/Dark)
│   ├── app.html                   # HTML template with zero-FOUC theme script
│   ├── lib/
│   │   ├── components/            # SCADA Gauges, Pilot LEDs, Sparklines, Faceplates
│   │   │   ├── DeviceFaceplate.svelte
│   │   │   ├── GraphicBar.svelte
│   │   │   ├── MetricValue.svelte
│   │   │   ├── ScadaGauge.svelte
│   │   │   ├── ScadaPilotLed.svelte
│   │   │   ├── ScadaSparkline.svelte
│   │   │   ├── StatusBadge.svelte
│   │   │   └── SynopticMimic.svelte
│   │   ├── stores/                # Localization (ID/EN), Theme, & Device Stores
│   │   │   ├── devices.ts
│   │   │   ├── locale.ts
│   │   │   └── theme.ts
│   │   └── types/                 # IoT telemetry contracts
│   │       └── iot.ts
│   └── routes/                    # Dashboard views & engineering detail pages
│       ├── +layout.svelte
│       ├── +page.svelte
│       └── devices/
│           └── [deviceId]/
│               └── +page.svelte
├── AGENTS.md                      # Unified Agent Governance Constitution
├── CHANGELOG.md                   # Keep a Changelog 1.1.0 release history
├── DESIGN.md                      # OpenDesign visual styling contract
├── Dockerfile                     # Multi-stage production container
├── docker-compose.yml             # Single-command container deployment
├── LICENSE                        # MIT Open Source License
└── package.json
```

---

## 🔌 Connecting to Real Hardware

See [docs/HARDWARE_INTEGRATION.md](docs/HARDWARE_INTEGRATION.md) for full instructions.

```typescript
import mqtt from 'mqtt';
import { deviceList } from '$lib/stores/devices';

const client = mqtt.connect('ws://broker.lan:9001');
client.on('message', (topic, payload) => {
  const data = JSON.parse(payload.toString());
  // Push real telemetry into the reactive Svelte store:
  deviceList.update((devices) => {
    const idx = devices.findIndex((d) => d.id === data.id);
    if (idx !== -1) devices[idx] = { ...devices[idx], ...data };
    return [...devices];
  });
});
```

---

## 🤖 Agent Governance & Constitution

This template embeds the **Seven Pillars of Agent Governance** (`AGENTS.md`) to ensure that AI agents working on this codebase never introduce low-quality slop, maintain strict design token adherence, write clean idiomatic code, and follow atomic git workflows.

---

## 📄 License
MIT License. Free to use for personal, industrial, or commercial applications.
