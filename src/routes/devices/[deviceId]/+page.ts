import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  return [
    { deviceId: 'DEV-01' },
    { deviceId: 'DEV-02' },
    { deviceId: 'DEV-03' },
    { deviceId: 'DEV-04' }
  ];
};
