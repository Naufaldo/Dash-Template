# SCADA & IoT Widget Catalog

This guide details all reusable Svelte components included in `src/lib/components/`.

---

## 1. Radial Arc Gauge (`ScadaGauge.svelte`)
Industrial 240° sweep gauge reminiscent of Node-RED `ui_gauge` and panel meters.

```svelte
<script>
  import ScadaGauge from '$lib/components/ScadaGauge.svelte';
</script>

<ScadaGauge
  label="Temperature"
  value={-18.4}
  unit="°C"
  min={-30}
  max={0}
  target={-20.0}
  alarmHigh={-15.0}
  alarmLow={-25.0}
  quality="GOOD"
  decimals={1}
  size="md"
  type="primary"
/>
```

### Props:
- `label` (*string*): Measurement label (e.g., "Suhu Ruang", "Discharge Pressure").
- `value` (*number | null*): Current process value (PV). Shows `--` when `null`.
- `unit` (*string*): Engineering unit (e.g. `°C`, `bar`, `kW`, `RPM`, `m³/h`).
- `min` / `max` (*number*): Lower and upper display bounds.
- `target` (*number | null*): Setpoint (SP) notch marker position on dial.
- `alarmHigh` / `alarmLow` (*number | null*): Warning & trip boundary markers.
- `size` (*'sm' | 'md'*): Compact faceplate size (`sm`) or engineering detail size (`md`).

---

## 2. Pilot Annunciator LED (`ScadaPilotLed.svelte`)
Machined-bezel indicator lamp with radial jewel reflection.

```svelte
<script>
  import ScadaPilotLed from '$lib/components/ScadaPilotLed.svelte';
</script>

<!-- Running status lamp -->
<ScadaPilotLed label="RUN" state="run" size="md" pulse={false} />

<!-- Alarm flashing lamp -->
<ScadaPilotLed label="TRIP" state="trip" size="md" pulse={true} />

<!-- Inactive lamp -->
<ScadaPilotLed label="AUX" state="off" size="sm" />
```

### States:
- `run`: High-intensity green glow.
- `aux`: Electric blue glow (auxiliary, defrost, bypass).
- `warn`: Amber glow.
- `trip`: Warning red with optional pulse animation.
- `comm`: Cyan glow for data bus activity.
- `off`: Muted grey lens with metallic bevel.

---

## 3. Pure SVG Mini Sparkline (`ScadaSparkline.svelte`)
Lightweight 14-point rolling trajectory chart.

```svelte
<script>
  import ScadaSparkline from '$lib/components/ScadaSparkline.svelte';
</script>

<ScadaSparkline
  points={[-18.2, -18.4, -18.5, -18.3, -18.7, -18.4]}
  unit="°C"
  height={32}
  color="var(--color-primary)"
/>
```

---

## 4. Graphic Linear Bar (`GraphicBar.svelte`)
Horizontal level indicator with SP and alarm limit markers.

```svelte
<script>
  import GraphicBar from '$lib/components/GraphicBar.svelte';
</script>

<GraphicBar
  label="Discharge Pressure"
  value={14.2}
  unit="bar"
  min={0}
  max={25}
  target={13.5}
  alarmHigh={20.0}
  size="sm"
/>
```

---

## 5. Universal Equipment Faceplate (`DeviceFaceplate.svelte`)
Standardized industrial equipment card with dual gauges, pilot lamps, and quick action links.

```svelte
<script>
  import DeviceFaceplate from '$lib/components/DeviceFaceplate.svelte';
  export let device;
</script>

<DeviceFaceplate
  {device}
  viewMode="scada"
  canMoveLeft={true}
  canMoveRight={true}
  on:moveLeft={() => moveLeft(device.id)}
  on:moveRight={() => moveRight(device.id)}
  on:openMimic={() => openMimic(device)}
/>
```
