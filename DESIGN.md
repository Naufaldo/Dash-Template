# Industrial SCADA & IoT Design System Contract

> **Authority**: This document is the visual contract and design system specification for the Dash-Template project. All UI components, faceplates, charts, and styling must adhere strictly to these design tokens and principles.

---

## 🎨 Design Philosophy & Principles

1. **High Contrast at a Glance**: Operators in factory control rooms and field technicians on mobile tablets must be able to read process variables (PV) and alarm states instantaneously.
2. **Tabular Monospace Precision**: All telemetry values, sensor readings, engineering units, and time stamps must use tabular monospace fonts (`var(--font-mono)`) to prevent number jitter during real-time streaming updates.
3. **No Slop & No False Gimmicks**: Avoid generic purple/cyan glowing gradient soups or low-contrast decorative text. Every color, badge, and LED lamp serves a specific industrial operational meaning.
4. **Resilience Across States**: Every metric and faceplate gracefully displays:
   - **Streaming Active**: High-precision readout with quality indicator.
   - **Warning / Degraded**: High-contrast amber/yellow boundary warning.
   - **Critical / Trip**: Clear red annunciator with high visual priority.
   - **Offline / Stale**: Muted neutral state with clear communication timeout badge.

---

## 🌈 Design Tokens (`src/app.css`)

### Surfaces & Backgrounds
| Token | Dark Mode (Default) | Light Mode | Usage |
|---|---|---|---|
| `--bg-canvas` | `#0c0e12` | `#f4f6f9` | Application viewport background |
| `--bg-surface` | `#141820` | `#ffffff` | Cards, faceplates, and panels |
| `--bg-surface-elevated` | `#1b212c` | `#f8fafc` | Modals, dropdowns, hovered tiles |
| `--border-subtle` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Subtle container separators |
| `--border-strong` | `rgba(255,255,255,0.20)` | `rgba(0,0,0,0.18)` | Active element borders |

### Functional Status & Annunciator Colors
| Token | Dark Mode | Light Mode | Operational Meaning |
|---|---|---|---|
| `--status-normal` / `--color-primary` | `#00e676` | `#00a844` | Running, In-Control, Optimal State |
| `--status-warning` | `#ffab00` | `#e69500` | Approaching Setpoint limit, Warning |
| `--status-critical` | `#ff3d00` | `#d50000` | High/Low Limit Trip, Safety Fault |
| `--status-comm` | `#00e5ff` | `#0091ea` | RS485 / MQTT Comm Active |
| `--status-aux` | `#2979ff` | `#1565c0` | Auxiliary / Defrost / Bypass Active |
| `--status-offline` | `#607d8b` | `#78909c` | Device disconnected or node timeout |

### Typography
- **UI & Labels**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace Readouts**: `"JetBrains Mono", "SF Mono", "Consolas", monospace`

---

## 🎛️ Component Visual Specifications

### 1. Radial Arc Gauge Geometry (`ScadaGauge.svelte`)
- **Sweep Angle**: 240° symmetrical arc starting at 150° (bottom-left) and ending at 390° (bottom-right).
- **Needle Geometry**: Sleek tapered pointer originating from central pivot with center jewel cap.
- **Setpoint (SP) Notch**: High-contrast notch marker with SP numeric callout.
- **Scale Zones**: Gradient arc indicating safe operational band, warning band, and critical trip band.

### 2. Pilot LED Annunciators (`ScadaPilotLed.svelte`)
- **Metallic Bezel**: Dual-ring brushed metallic bezel (`#222` outer, `#444` inner).
- **Jewel Lens**: Radial gradient reflection mimicking real faceted plastic lenses found on industrial control panels (Allen-Bradley, Schneider, Siemens).
- **Pulse Animation**: Optional pulsing glow for warning and trip conditions.

### 3. Process Mimics (`SynopticMimic.svelte`)
- **Process Lines**: 4px high-contrast SVG paths with dashed stroke animation (`stroke-dasharray: 8, 8`) indicating direction of flow.
- **Equipment Nodes**: Vector icons for compressors, pumps, heat exchangers, valves, and cold rooms.
