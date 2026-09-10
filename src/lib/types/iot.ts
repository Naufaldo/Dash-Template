export type Quality = 'GOOD' | 'BAD' | 'STALE' | 'UNKNOWN';
export type DeviceStatus = 'normal' | 'warning' | 'critical' | 'offline';

export interface DeviceTelemetry {
  id: string;
  name: string;
  tag: string;
  category: string;
  location: string;
  status: DeviceStatus;
  
  primary: {
    label: string;
    value: number | null;
    unit: string;
    min: number;
    max: number;
    target: number | null;
    alarmHigh: number | null;
    alarmLow: number | null;
    quality: Quality;
  };

  secondary: {
    label: string;
    value: number | null;
    unit: string;
    min: number;
    max: number;
    alarmHigh: number | null;
    quality: Quality;
  };

  aux1: { label: string; value: number | null; unit: string };
  aux2: { label: string; value: number | null; unit: string };

  relays: {
    mainRun: boolean;
    auxRun: boolean;
    alarmActive: boolean;
    commOk: boolean;
    safetyOk: boolean;
  };

  history: number[];
  updatedAt: string;
}
