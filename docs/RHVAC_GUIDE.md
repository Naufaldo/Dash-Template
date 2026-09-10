# RHVAC Process Design & Thermodynamics Guide

> Technical guide to the Refrigeration, Heating, Ventilation, and Air Conditioning (RHVAC) synoptic design template in **Dash-Template**.

---

## 1. Thermodynamic Cycle Overview

```text
                 Condenser Fan (Heat Rejection)
                        ▲
                        │
    [2] Discharge (High P, High T Vapor)
    ──────────────────────────────────────┐
    ▲                                     │
    │ [Compressor]                        ▼ [Condenser Coil]
    │                                     │
    │ [Suction Accumulator]               │ [3] High P Subcooled Liquid
    │                                     ▼
    │                              [Liquid Receiver]
    │                                     │
    │                                     ▼ [Filter Drier / Sight Glass]
    │                                     │
    │ [4] Low P Superheated Vapor         ▼
    └───────────────────────────── [TXV / Expansion Valve]
                  ▲                       │
                  │                       ▼ [Low P Two-Phase Liquid]
                  └────────────── [Evaporator Coils]
                                          ▲
                                          │
                               Cold Room Heat Absorption
```

---

## 2. Key Thermodynamic Parameters

### Superheat ($SH$):
$$SH = T_{\text{suction}} - T_{\text{evap}}$$
- **Purpose**: Prevents liquid refrigerant slugging into the compressor suction port.
- **Normal Range**: 5K to 12K (typical commercial refrigeration).
- **Alarm Low**: < 3K (risk of liquid slugging).
- **Alarm High**: > 15K (starving evaporator, poor cooling efficiency).

### Subcooling ($SC$):
$$SC = T_{\text{condensing}} - T_{\text{liquid}}$$
- **Purpose**: Ensures 100% solid liquid enters the expansion valve without flash gas formation.
- **Normal Range**: 3K to 8K.

---

## 3. Supported Operational Modes

1. **Cooling (Normal)**:
   - Compressor RUN, Condenser Fans RUN, Evaporator Fans RUN.
   - Solenoid Valve OPEN.
2. **Defrost Cycle**:
   - Electric heaters / hot gas bypass active.
   - Evaporator fans STOPPED to prevent blowing heat into the cold room.
3. **Pump Down**:
   - Liquid line solenoid CLOSED, compressor evacuates evaporator until low-pressure cutout trips.
4. **Standby**:
   - All motors de-energized, waiting on thermostat demand.
