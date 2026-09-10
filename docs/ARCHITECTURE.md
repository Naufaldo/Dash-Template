# System Architecture & Telemetry Data Flow

> Architectural overview of the **Dash-Template** industrial SCADA and IoT web dashboard.

---

## 1. System Topology

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FIELD / INDUSTRIAL EDGE                         │
├─────────────────────────┬──────────────────────┬───────────────────────┤
│ Modbus RTU / RS485      │ MQTT / Sparkplug B   │ Native WebSockets     │
│ (Sensors, PLC, Inverter)│ (Edge Gateways/IoT)  │ (Real-time stream)    │
└────────────┬────────────┴──────────┬───────────┴───────────┬───────────┘
             │                       │                       │
             ▼                       ▼                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         INGESTION & STORE LAYER                        │
├────────────────────────────────────────────────────────────────────────┤
│                       $lib/stores/devices.ts                           │
│  - deviceList: Writable<DeviceTelemetry[]>                             │
│  - deviceMap: Derived<Map<string, DeviceTelemetry>>                    │
│  - mockSimulationEngine: 4000ms Jitter Telemetry Provider             │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       PRESENTATION & SCADA LAYER                       │
├────────────────────────────────────┬───────────────────────────────────┤
│ +layout.svelte                     │ +page.svelte (Master Dashboard)   │
│ - Topbar SCADA header              │ - System KPI Summary Banner       │
│ - Theme & Locale Switcher          │ - Filter & Sort Toolbar           │
│ - Global Comm Bus Status           │ - Reorderable Grid Faceplates     │
│                                    │ - Quick Synoptic Mimic Modal      │
├────────────────────────────────────┴───────────────────────────────────┤
│ devices/[deviceId]/+page.svelte (Engineering Detail View)              │
│ - High-resolution dual gauges, sparklines, and raw telemetry inspector │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Telemetry Contract (`$lib/types/iot.ts`)

Each device is represented by a standardized `DeviceTelemetry` object:

```typescript
export type DeviceStatus = 'normal' | 'warning' | 'critical' | 'offline';
export type Quality = 'GOOD' | 'BAD' | 'STALE';

export interface SensorMetric {
  value: number | null;
  unit: string;
  quality: Quality;
  target?: number;       // Setpoint (SP)
  alarmHigh?: number;    // High Warning / Trip Limit
  alarmLow?: number;     // Low Warning / Trip Limit
  history: number[];     // Rolling 14-point trend values
}

export interface DeviceTelemetry {
  id: string;
  name: string;
  type: string;          // e.g. 'cold_storage', 'chiller', 'pump', 'ahu'
  location: string;
  status: DeviceStatus;
  order: number;
  primary: SensorMetric;   // e.g. Temperature / Flow Rate / Power
  secondary: SensorMetric; // e.g. Pressure / RPM / Current
  auxState?: boolean;      // Auxiliary / Defrost / Bypass Active
  runState?: boolean;      // Run / Stop contact
  commHealth?: number;     // 0 - 100% Communication Quality
  updatedAt: string;
}
```

---

## 3. Reactive State Architecture

- **Locale Store (`locale.ts`)**: Derived translation store (`$t`) reactive to language toggle. Persists to `localStorage.getItem('lang')`.
- **Theme Store (`theme.ts`)**: Switches `data-theme="dark"` or `data-theme="light"` on `<html>`. Zero flash-of-unauthenticated-theme (FOUC) script embedded in `app.html`.
- **Device Store (`devices.ts`)**: Exposes `deviceList`, `deviceMap`, and `reorderDevices(newOrder)`. Supports plug-and-play replacement of the mock jitter engine with real MQTT / WebSocket streaming.
