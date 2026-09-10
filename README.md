# Bare Industrial SCADA & Node-RED IoT Dashboard Template

> **A modern, modular, production-ready starter template for building Industrial SCADA, IoT, and HMI telemetry dashboards.**  
> Built with **SvelteKit 2**, **Vite 6**, and **TypeScript**, with zero heavy external charting dependencies.

---

## ⚡ Key Features

1. **Node-RED `ui_gauge` Style Radial Arc Gauges** (`ScadaGauge.svelte`):
   - 240° radial sweep arc with dynamic needle, setpoint (SP) notch marker, warning/trip color zones, and monospace digital readout.
2. **Industrial Annunciator Pilot LED Lamps** (`ScadaPilotLed.svelte`):
   - Metallic bezel and jewel reflections for `RUN`, `AUX`, `WARN`, `TRIP`, `COMM`, and `OFF`.
3. **Mini Sparkline Trend Charts** (`ScadaSparkline.svelte`):
   - Pure SVG 14-point rolling trajectory with min/max bounds and slope indicators.
4. **Interactive Synoptic Process Mimics** (`SynopticMimic.svelte`):
   - Animated process piping flow, equipment status, and live sensor callouts.
5. **Reorderable Dashboard Grid**:
   - Native HTML5 Drag-and-Drop and accessible shift buttons (`←` `→`) with `localStorage` persistence.
6. **Bilingual Localization (ID / EN)**:
   - Indonesian default + instant toggle to English.
7. **Optional Light & Dark Themes**:
   - WCAG AAA/AA contrast tokens adhering to industrial HMI standards.
8. **Built-in Mock Telemetry Simulation**:
   - Works immediately out-of-the-box with realistic sensor jitter every 4 seconds.
9. **Universal Equipment Faceplates** (`DeviceFaceplate.svelte`):
   - Can represent any industrial machine: refrigeration, cold storage, chillers, pumps, HVAC, compressors, AHUs, boilers, or energy meters.

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
Visit `http://localhost:5173` in your browser.

---

## 📦 Production Build & Docker

### Standalone Node Server Build
```bash
pnpm build
node build
```

### Docker Deployment
```bash
docker compose up -d --build
```
Accessible on port `3000` (or configured `PORT`).

---

## 📂 Project Structure

```text
Dash-Template/
├── src/
│   ├── app.css                    # Industrial SCADA Design Tokens (Light/Dark)
│   ├── app.html                   # HTML template with zero-FOUC theme script
│   ├── lib/
│   │   ├── components/            # SCADA Gauges, Pilot LEDs, Sparklines, Mimics, Faceplates
│   │   │   ├── DeviceFaceplate.svelte
│   │   │   ├── GraphicBar.svelte
│   │   │   ├── MetricValue.svelte
│   │   │   ├── ScadaGauge.svelte
│   │   │   ├── ScadaPilotLed.svelte
│   │   │   ├── ScadaSparkline.svelte
│   │   │   ├── StatusBadge.svelte
│   │   │   └── SynopticMimic.svelte
│   │   ├── stores/                # Localization (ID/EN), Theme, & Device Store
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
├── Dockerfile                     # Standalone Node container
├── docker-compose.yml             # Single-command deployment
├── DESIGN.md                      # Visual styling & design token contract
└── package.json
```

---

## 🔌 Connecting to Real Hardware (MQTT / WebSockets / REST)

To replace the built-in simulation generator with real hardware telemetry:
1. Open `src/lib/stores/devices.ts`.
2. Connect your MQTT client (e.g. `mqtt.js` or native WebSocket) inside `initializeSimulation()`.
3. Dispatch incoming payloads into the `deviceList` or `deviceMap` store.

```typescript
import mqtt from 'mqtt';

const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
client.on('message', (topic, payload) => {
  const data = JSON.parse(payload.toString());
  // Update your Svelte store:
  deviceStore.updateDevice(data.deviceId, data);
});
```

---

## 📄 License
MIT License. Free to use for personal, academic, or commercial IoT projects.
