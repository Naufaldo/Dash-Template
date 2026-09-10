import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { DeviceTelemetry } from '$lib/types/iot';

const initialDevices: DeviceTelemetry[] = [
  {
    id: 'DEV-01',
    name: 'Booster Pump A1',
    tag: 'PUMP-01',
    category: 'Pumping Station',
    location: 'Sector A',
    status: 'normal',
    primary: {
      label: 'Flow Rate',
      value: 124.5,
      unit: 'm³/h',
      min: 0,
      max: 200,
      target: 120,
      alarmHigh: 180,
      alarmLow: 10,
      quality: 'GOOD'
    },
    secondary: {
      label: 'Discharge',
      value: 5.4,
      unit: 'bar',
      min: 0,
      max: 10,
      alarmHigh: 8.5,
      quality: 'GOOD'
    },
    aux1: { label: 'Power', value: 37.2, unit: 'kW' },
    aux2: { label: 'Vibration', value: 1.4, unit: 'mm/s' },
    relays: { mainRun: true, auxRun: true, alarmActive: false, commOk: true, safetyOk: true },
    history: [122, 123, 124, 125, 124.5, 124, 124.5],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'DEV-02',
    name: 'Air Handling Unit 2',
    tag: 'AHU-02',
    category: 'HVAC Air Distribution',
    location: 'Cleanroom Zone 1',
    status: 'normal',
    primary: {
      label: 'Supply Temp',
      value: 18.2,
      unit: '°C',
      min: 10,
      max: 35,
      target: 18.0,
      alarmHigh: 26.0,
      alarmLow: 12.0,
      quality: 'GOOD'
    },
    secondary: {
      label: 'Filter ΔP',
      value: 142,
      unit: 'Pa',
      min: 0,
      max: 400,
      alarmHigh: 350,
      quality: 'GOOD'
    },
    aux1: { label: 'Humidity', value: 52.4, unit: '%RH' },
    aux2: { label: 'Blower RPM', value: 1450, unit: 'rpm' },
    relays: { mainRun: true, auxRun: true, alarmActive: false, commOk: true, safetyOk: true },
    history: [18.0, 18.1, 18.2, 18.3, 18.2],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'DEV-03',
    name: 'Refrigeration Chiller 1',
    tag: 'CHILL-03',
    category: 'Process Cooling',
    location: 'Utility Hall',
    status: 'warning',
    primary: {
      label: 'Chilled Water',
      value: 7.8,
      unit: '°C',
      min: 0,
      max: 20,
      target: 6.0,
      alarmHigh: 9.0,
      alarmLow: 2.0,
      quality: 'GOOD'
    },
    secondary: {
      label: 'Head Pressure',
      value: 16.4,
      unit: 'bar',
      min: 0,
      max: 25,
      alarmHigh: 18.0,
      quality: 'GOOD'
    },
    aux1: { label: 'Evap Temp', value: 2.2, unit: '°C' },
    aux2: { label: 'Suction LP', value: 4.1, unit: 'bar' },
    relays: { mainRun: true, auxRun: true, alarmActive: false, commOk: true, safetyOk: false },
    history: [7.2, 7.4, 7.6, 7.8],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'DEV-04',
    name: 'Steam Boiler Hub',
    tag: 'BOIL-04',
    category: 'Thermal Steam',
    location: 'Boiler House',
    status: 'normal',
    primary: {
      label: 'Steam Temp',
      value: 168.4,
      unit: '°C',
      min: 80,
      max: 220,
      target: 170.0,
      alarmHigh: 195.0,
      alarmLow: 130.0,
      quality: 'GOOD'
    },
    secondary: {
      label: 'Steam Bar',
      value: 8.2,
      unit: 'bar',
      min: 0,
      max: 16,
      alarmHigh: 12.0,
      quality: 'GOOD'
    },
    aux1: { label: 'Flue Temp', value: 142.0, unit: '°C' },
    aux2: { label: 'Feedwater', value: 84.5, unit: '°C' },
    relays: { mainRun: true, auxRun: true, alarmActive: false, commOk: true, safetyOk: true },
    history: [167, 168, 168.5, 168.4],
    updatedAt: new Date().toISOString()
  }
];

function createDevicesStore() {
  const { subscribe, set, update } = writable<DeviceTelemetry[]>(initialDevices);

  return {
    subscribe,
    initSimulation: () => {
      if (!browser) return;
      setInterval(() => {
        update((devices) => {
          return devices.map((d) => {
            const jitter1 = (Math.random() - 0.5) * 0.4;
            const jitter2 = (Math.random() - 0.5) * 0.08;
            const new1 = d.primary.value !== null ? Number((d.primary.value + jitter1).toFixed(1)) : null;
            const new2 = d.secondary.value !== null ? Number((d.secondary.value + jitter2).toFixed(2)) : null;
            const nextHistory = new1 !== null ? [...d.history.slice(-15), new1] : d.history;

            return {
              ...d,
              primary: { ...d.primary, value: new1 },
              secondary: { ...d.secondary, value: new2 },
              history: nextHistory,
              updatedAt: new Date().toISOString()
            };
          });
        });
      }, 4000);
    }
  };
}

export const devicesStore = createDevicesStore();
