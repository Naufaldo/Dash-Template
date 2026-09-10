# Industrial SCADA & IoT Widget Catalog

This comprehensive guide details all reusable Svelte components included in `src/lib/components/`.
All components are fully responsive, support user-resizing via `WidgetContainer.svelte`, and strictly adhere to **Dark & Light** mode tokens.

---

## 📐 Layout & Resizability: `WidgetContainer.svelte`
A wrapper providing responsive container queries, status indicator borders, title header, and interactive user size buttons (`S` Compact, `M` Standard, `W` Wide, `L` Large). Persists size to `localStorage`.

```svelte
<script>
  import WidgetContainer from '$lib/components/WidgetContainer.svelte';
</script>

<WidgetContainer id="tank-01" title="STORAGE TANK 01" subtitle="TK-101" defaultSize="md" status="normal">
  <!-- Any widget slot -->
</WidgetContainer>
```

---

## 1. Radial Arc Gauge (`ScadaGauge.svelte`)
Industrial 240° sweep gauge with Setpoint notch, needle, and alarm zone fills.

```svelte
<ScadaGauge
  label="Temperature"
  value={-18.4}
  unit="°C"
  min={-30}
  max={0}
  target={-20.0}
  alarmHigh={-15.0}
  alarmLow={-25.0}
  size="md"
/>
```

---

## 2. Vertical Tank Level Gauge (`ScadaTankLevel.svelte`)
Industrial vessel indicator with liquid surface animation, LL / L / H / HH alarm switch ticks, and percentage/capacity readout.

```svelte
<ScadaTankLevel
  label="Liquid Receiver"
  value={68.5}
  unit="%"
  highAlarm={80}
  highHighAlarm={90}
  lowAlarm={20}
  lowLowAlarm={10}
  fluidColor="#ff9100"
  size="md"
/>
```

---

## 3. Digital LED Panel Meter (`ScadaDigitalMeter.svelte`)
Heavy-duty bezel meter with corner screws, 7-segment monospace digits, HI/LO limit flags, and MIN/MAX peak hold reset.

```svelte
<ScadaDigitalMeter
  label="LINE VOLTAGE L1-N"
  value={221.4}
  unit="VAC"
  highLimit={245.0}
  lowLimit={200.0}
  colorTheme="green"
/>
```

---

## 4. Industrial Rotary Selector Switch (`ScadaRotarySwitch.svelte`)
Knurled dial switch with 3 positions (`HAND` - `OFF` - `AUTO`) and realistic rotating knob.

```svelte
<ScadaRotarySwitch
  label="BLOWER CONTROL"
  bind:position={switchPos}
/>
```

---

## 5. ISA-18.1 Alarm Annunciator Panel (`ScadaAlarmAnnunciator.svelte`)
8-window matrix panel with flashing unacknowledged states, acknowledge (`ACK`), `RESET`, and `TEST` pushbuttons.

```svelte
<ScadaAlarmAnnunciator />
```

---

## 6. Industrial PID Loop Faceplate (`ScadaPIDFaceplate.svelte`)
Honeywell/Emerson style PID loop controller with PV/SP dual bars, MV 0-100% output bar, deviation calculation, and AUTO / MANUAL / CAS mode toggles.

```svelte
<ScadaPIDFaceplate
  tag="TIC-101"
  description="Cold Storage Evaporator Valve Loop"
  pv={-18.2}
  sp={-20.0}
  mv={64.0}
  unit="°C"
  min={-30}
  max={0}
/>
```

---

## 7. Multi-Channel Bar Chart (`ScadaMultiBar.svelte`)
Multi-channel comparative bar chart for 3-phase electrical loads (L1, L2, L3) or multi-zone temperature monitoring.

```svelte
<ScadaMultiBar
  title="3-PHASE CURRENT DRAW"
  channels={[
    { label: 'L1 (R)', value: 18.4, unit: 'A', max: 30, color: '#ff4444' },
    { label: 'L2 (S)', value: 17.9, unit: 'A', max: 30, color: '#ffbb00' },
    { label: 'L3 (T)', value: 18.8, unit: 'A', max: 30, color: '#3388ff' }
  ]}
/>
```

---

## 8. Pilot Annunciator LED (`ScadaPilotLed.svelte`)
Machined bezel indicator lamp with jewel reflection for `RUN`, `AUX`, `WARN`, `TRIP`, `COMM`, and `OFF`.

```svelte
<ScadaPilotLed label="RUN" state="run" size="md" />
<ScadaPilotLed label="TRIP" state="trip" size="md" pulse={true} />
```

---

## 9. Mini Sparkline Trend (`ScadaSparkline.svelte`)
Pure SVG rolling 14-point mini trend with min/max bounds.

```svelte
<ScadaSparkline points={[-18.2, -18.4, -18.5, -18.3]} unit="°C" height={36} />
```

---

## 10. RHVAC Process Mimic (`RhvacProcessMimic.svelte`)
Interactive animated P&ID diagram of a complete refrigeration & air conditioning cycle with CDU, Condenser, TXV, Evaporator, and real-time Superheat / Subcooling thermodynamic callouts.

```svelte
<RhvacProcessMimic
  dischargePressure={15.4}
  dischargeTemp={72.8}
  condensingTemp={42.0}
  liquidTemp={36.5}
  suctionPressure={2.1}
  suctionTemp={-12.4}
  evaporatingTemp={-22.0}
  roomTemp={-18.5}
  roomSetpoint={-20.0}
  compressorState={true}
  mode="cooling"
/>
```
