# Agent Governance & Engineering Constitution (Dash-Template)

> **Authority**: This document is the unified rulebook and governance standard for all AI coding agents operating in this repository. It integrates the best practices of **anti-slop**, **humanizer**, **archify**, **open-design**, **ponytail**, and **agent-skills**.

---

## 🏛️ The Seven Pillars of Governance

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                       PROJECT GOVERNANCE CONSTITUTION                      │
├───────────────────┬───────────────────┬────────────────────────────────────┤
│ 1. Agent Skills   │ 2. Ponytail       │ 3. Anti-Slop                       │
│    Lifecycle &    │    Minimalist     │    Craftsmanship &                 │
│    Quality Gates  │    Pragmatism     │    Purpose Filter                  │
├───────────────────┼───────────────────┼────────────────────────────────────┤
│ 4. OpenDesign     │ 5. Humanizer      │ 6. Archify                         │
│    DESIGN.md      │    Natural Voice  │    Grounded System                 │
│    Contract       │    & Plain Prose  │    Architecture                    │
├───────────────────┴───────────────────┴────────────────────────────────────┤
│ 7. Versioning & Git Workflow (`git-workflow-and-versioning`)                │
│    SemVer 2.0.0, Keep a Changelog, Conventional Commits, Atomic Slices     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Pillar 1: Engineering Lifecycle & Quality Gates (`agent-skills`)

All non-trivial engineering work follows the disciplined six-stage pipeline:
1. **Define (`/spec`)**: Clearly articulate the problem, user requirements, sensor data payload formats, and edge cases before writing code.
2. **Plan (`/plan`)**: Break the task down into atomic, reviewable steps.
3. **Build (`/build`)**: Implement incrementally, one slice at a time.
4. **Verify (`/test`)**: Prove it works through automated type checks (`pnpm check`), builds (`pnpm build`), or live telemetry verification.
5. **Review (`/review`)**: Audit code quality, security boundaries, and simplicity before merge.
6. **Ship (`/ship`)**: Validate deployment, Docker build, and rollback readiness.

---

## Pillar 2: Minimalist Engineering & Senior Dev Mindset (`ponytail`)

*"He says nothing. He writes one line. It works."*

Before writing code or adding abstractions, stop at the first rung that holds:
1. **Does this need to exist?** → If not, skip it (YAGNI).
2. **Already in this codebase?** → Reuse existing modules (`ScadaGauge`, `ScadaPilotLed`, `GraphicBar`); do not rewrite.
3. **Standard library does it?** → Use standard library / native platform utilities.
4. **Native platform feature?** → Use native HTML5/CSS/SVG standards (e.g. pure SVG paths, native drag-and-drop, CSS Grid/Flexbox) instead of heavy external charting packages (Chart.js, D3, ECharts).
5. **Installed dependency?** → Use what is already in `package.json`.
6. **One line?** → Favor clean, readable, idiomatic one-liners over bloated helper boilerplate.
7. **Minimum that works safely**: Never sacrifice input validation, security, error handling, or accessibility.

---

## Pillar 3: Craftsmanship & Anti-Slop Filter (`anti-slop`)

AI slop is strictly forbidden. The interface and codebase must feel hand-crafted by experienced industrial SCADA engineers.

### Hard Gate Standards
- **No Generic AI Aesthetics**: No purple/cyan glowing gradient soup, no full-page radial glow orbs, no stacked trendy gimmicks (glassmorphism + mesh gradient + glow + monospace).
- **Functional Completeness**: Every button, switch, filter, and modal must actually work. Non-functional decorative UI is a defect.
- **Resilience Across States**: Every IoT view must gracefully handle:
  - **Connecting / Loading** state (telemetry stream initializing)
  - **Active / Streaming** state (real-time live sensor feeds)
  - **Empty / Disconnected** state (node offline, no sensors detected)
  - **Error / Degraded** state (communication timeout, threshold breach)
- **Evidence Over Claims**: Never invent fake metrics. Use authentic telemetry formats and real parameters.

---

## Pillar 4: Brand System & Visual Contract (`open-design`)

- **`DESIGN.md` is Law**: Visual styling must adhere to `DESIGN.md`. Never guess arbitrary hex colors or margins; use defined CSS design tokens (`--bg-surface`, `--color-primary`, `--status-normal`, `--status-warning`, `--status-critical`, etc.).
- **IoT Visual Clarity**: Telemetry charts, gauges, and metric tiles must be clear, high-contrast, and readable at a glance on both desktop control rooms and mobile tablets.

---

## Pillar 5: Natural Human Voice & Direct Communication (`humanizer`)

- **Eliminate AI Clichés**: Ban filler buzzwords: *delve*, *testament*, *tapestry*, *landscape*, *showcasing*, *seamless*, *pivotal*, *boasts*, *serves as*.
- **No Dramatic Staging**: Avoid "It's not just X, it's Y". State facts directly.
- **Clean Formatting**: No excessive bold text and no unnecessary emoji clutter on every heading. Keep technical communication crisp, professional, and factual.

---

## Pillar 6: Grounded Architecture & Topology (`archify`)

- **Grounded Reality**: Never invent imaginary microservices or nonexistent API routes.
- **Explicit IoT Data Pipelines**: System architectures must clearly delineate:
  `Sensors/PLC → Protocol (Modbus / MQTT / WS) → Ingestion Store ($lib/stores/devices.ts) → SCADA Visualization UI`.
- **Authoritative Diagrams**: When diagramming architecture, use deterministic ASCII, Mermaid, or standalone SVG/HTML maps.

---

## Pillar 7: Versioning, Changelog & Git Protocol (`git-workflow-and-versioning`)

- **Semantic Versioning 2.0.0**: All releases use `MAJOR.MINOR.PATCH`.
- **Changelog Maintenance**: Every release or non-trivial change must be recorded in [`CHANGELOG.md`](./CHANGELOG.md) following [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) standards (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`).
- **Conventional Commits**: Every commit follows `<type>(<scope>): <subject>` format:
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
  - Scopes: `scada`, `gauge`, `pilot`, `mimic`, `store`, `docs`, `docker`, `governance`.
- **Atomic Commits**: Group logically related edits together. Build and test verification (`pnpm check`, `pnpm build`) must pass before committing.

---

## 🛠️ Installed Skill Index in `.agents/skills/`

- **UI & Craftsmanship**: `antislop`, `antislop-ui`, `antislop-human`, `antislop-layoutmobile`, `open-design`, `design-md`
- **Copy & Writing**: `humanizer`, `antislop-copywriting`, `antislop-code`
- **Minimalism & Pragmatism**: `ponytail`, `ponytail-audit`, `ponytail-review`, `code-simplification`
- **Architecture & Modeling**: `archify`, `api-and-interface-design`, `documentation-and-adrs`
- **Engineering Lifecycle**: `spec-driven-development`, `test-driven-development`, `frontend-ui-engineering`, `code-review-and-quality`, `security-and-hardening`, `performance-optimization`, `git-workflow-and-versioning`, `shipping-and-launch`
