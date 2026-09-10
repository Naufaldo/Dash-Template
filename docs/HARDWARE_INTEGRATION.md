# Hardware Integration Guide: Connecting Real Sensors & PLCs

This guide outlines how to replace the built-in mock simulation engine with real-world industrial data streams.

---

## 1. Connecting via MQTT (Recommended for IoT Gateways)

Edge gateways (e.g. Raspberry Pi, Teltonika, Advantech, ESP32, or Node-RED) typically publish JSON payloads over MQTT.

### Installation
```bash
pnpm add mqtt
```

### Store Implementation (`src/lib/stores/devices.ts`)
```typescript
import mqtt from 'mqtt';
import { writable } from 'svelte/store';
import type { DeviceTelemetry } from '$lib/types/iot';

export const deviceList = writable<DeviceTelemetry[]>([]);

export function connectMqtt(brokerUrl = 'ws://192.168.1.100:9001') {
  const client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    console.log('[MQTT] Connected to Industrial Ingestion Broker');
    client.subscribe('scada/devices/+/telemetry');
  });

  client.on('message', (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      deviceList.update((devices) => {
        const idx = devices.findIndex((d) => d.id === payload.id);
        if (idx >= 0) {
          devices[idx] = { ...devices[idx], ...payload, updatedAt: new Date().toISOString() };
        } else {
          devices.push(payload);
        }
        return [...devices];
      });
    } catch (err) {
      console.error('[MQTT] Malformed payload:', err);
    }
  });
}
```

---

## 2. Connecting via WebSocket

For setups with an existing central backend (e.g. Go, Hono, Node, Fastify):

```typescript
export function connectWebSocket(url = 'ws://localhost:3001/ws') {
  const ws = new WebSocket(url);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'DEVICE_BATCH') {
      deviceList.set(data.devices);
    }
  };

  ws.onclose = () => {
    console.warn('[WS] Stream closed. Reconnecting in 3s...');
    setTimeout(connectWebSocket, 3000);
  };
}
```

---

## 3. Ingestion via Modbus RTU / RS485 Gateway

If reading directly from RS485 slave sensors (e.g. Modbus RTU address 1..247):
1. Use an edge bridge like **Node-RED** or an **ESP32 Modbus Gateway**.
2. Query registers (e.g. Function Code `03` Read Holding Registers).
3. Scale the integer values (e.g., `val / 10.0`).
4. Publish as JSON to the MQTT broker or WebSocket endpoint subscribed by this dashboard.
