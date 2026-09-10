---
name: open-design
description: "OpenDesign agent protocol: design systems, DESIGN.md contracts, live dashboard artifacts, and brand tokens for coding agents."
allowed-tools: Read Write Edit Glob Grep
---

# OpenDesign Protocol

OpenDesign turns your coding agent into a design studio by treating `DESIGN.md` as the brand contract and building single-page, real CSS/HTML artifacts (live dashboards, KPI walls, prototypes, and decks) instead of generic mockups.

## Core Tenets

1. **Design System Contract (`DESIGN.md`)**:
   Every visual artifact must be governed by a structured `DESIGN.md` containing:
   - Color tokens (Background, Surface, Border, Primary, Accents, Status colors)
   - Typography scales (Heading, Body, Monospace for sensor/telemetry data)
   - Spatial grid (4px/8px scale, radius, padding)
   - Component elevation and shadow tokens
   - Responsive breakpoints

2. **Live Dashboards & Artifacts**:
   - Single-page, interactive HTML/CSS/JS artifacts that render immediately.
   - Built with real CSS and modern semantic web standards, avoiding bloated unnecessary libraries when native CSS grid/flexbox and SVG do the job.
   - Tweak panels / control controls for interactive exploration.

3. **No Placeholders**:
   - Use realistic telemetry data, realistic sensor feeds, and active states.
   - Every metric card and chart must represent meaningful real-world parameters.

4. **Pair with Anti-Slop**:
   - `DESIGN.md` provides the direction and soul.
   - `anti-slop` provides the purpose filter and quality gate.
