# Engineering Lifecycle & Quality Gates

> Source: `addyosmani/agent-skills`

## The Six-Phase Engineering Lifecycle

```text
  DEFINE          PLAN           BUILD          VERIFY         REVIEW          SHIP
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test │ ───▶ │  QA  │ ───▶ │  Go  │
 │Refine│      │  PRD │      │ Impl │      │Debug │      │ Gate │      │ Live │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /ship
```

### 1. Spec Before Code (`/spec`)
Define data models, sensor telemetry payloads, API endpoints, and UI state expectations before writing implementation code.

### 2. Atomic Implementation (`/plan` & `/build`)
Implement in thin, verifiable slices. Never commit sprawling, unverified chunks across unrelated files.

### 3. Proof Over Assumptions (`/test`)
Validate telemetry parsing, broker connections, database operations, and UI rendering with concrete tests or automated checks.

### 4. Code Health & Review (`/review` & `/code-simplify`)
Conduct adversarial reviews before finalizing. Simplify convoluted logic and eliminate dead code or redundant dependencies.
