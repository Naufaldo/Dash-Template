# Archify Guidelines (Architecture & Topology Groundedness)

> Source: `tt-a1i/archify`

## Core Principle: Grounded Systems Architecture
Never hallucinate topology, fake services, or nonexistent data flows. Architecture diagrams and sequence maps must reflect reality.

### Standards
1. **Verifiable Structure**: Every component, service, protocol, and database represented in diagrams must map directly to project architecture or explicit requirements.
2. **Deterministic Data Flows**: Clearly document IoT data pipelines:
   `IoT Node / Sensor → MQTT / WebSocket Broker → Ingestion / API Gateway → Time-Series Database → Dashboard UI`.
3. **Standalone & Interactive Clarity**: When presenting system architecture, use clean, typed diagrams (Mermaid or standalone SVG/HTML) with explicit upstream and downstream roles.
