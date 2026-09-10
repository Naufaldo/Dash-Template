# Anti-Slop Guidelines (UI & Copy Quality Filter)

> Source: `miqdadbadjuber/anti-slop`

## Core Principle: Technique With Purpose
Every visual and copy decision must have an articulable purpose (hierarchy, identity, or readability). Reject generic "AI default" styling.

### 1. Hard Gate Rules
- **No Generic AI Aesthetics**: Forbid default purple/cyan glowing blobs, rainbow gradient backgrounds, and ubiquitous blur/glassmorphism on every card.
- **No Pill Badges Everywhere**: Do not slap uppercase pill capsules ("AI POWERED", "BETA") on every element.
- **Functional Completeness (C-2)**: Every button, toggle, and link must work or be removed. Non-functional decorative UI is a defect.
- **Resilience Across States (C-4)**: Every component must handle empty states, loading states, error states, and responsive viewports cleanly.
- **Evidence Over Claims (C-5)**: Do not fabricate fake metrics ("10K+ Users", "99.9% Uptime") or fake testimonials. Use realistic telemetry and verifiable data.

### 2. Purpose-Gate Checklist
Before introducing a visual technique, verify:
- Does this shadow indicate elevation, or is it floating aimlessly?
- Does this accent color highlight an actionable element, or is it sprayed indiscriminately?
- Does this chart communicate actionable sensor telemetry, or is it decorative filler?
