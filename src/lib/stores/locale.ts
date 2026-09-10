import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Locale = 'id' | 'en';

export const translations = {
  id: {
    brand: 'SCADA IoT Dashboard',
    tagline: 'Template Sistem Kendali & Telemetri Industri',
    navDashboard: 'Dashboard Utama',
    navRhvac: 'Desain RHVAC',
    navWidgets: 'Katalog Widget',
    masterBanner: 'Pusat Kendali SCADA Terpusat',
    busHealth: 'Bus Komunikasi RS485 / MQTT',
    activeNodes: 'Node Aktif',
    warningNodes: 'Peringatan',
    criticalNodes: 'Kritis / Trip',
    sectionDevices: 'Matriks Perangkat & Unit Operasional',
    filterAll: 'Semua Perangkat',
    filterAttention: 'Perlu Perhatian',
    sortCustom: 'Urutan Kustom (Geser)',
    sortAlarms: 'Prioritas Alarm',
    sortValHigh: 'Nilai Tertinggi',
    resetOrder: 'Reset Urutan',
    dragHint: 'Tahan & geser kartu perangkat untuk menyusun prioritas pantau',
    quickMimic: 'Diagram Sinoptik',
    closeModal: 'Tutup',
    detailLink: 'Detail Teknik →',
    viewModeScada: '🎛️ Faceplate SCADA',
    viewModeBars: '📊 Level Bar Kompak',
    simBadge: 'Data Simulasi (Aktif)',
    resizeWidget: 'Ubah Ukuran Widget',
    pilotRun: 'RUN',
    pilotAux: 'AUX',
    pilotAlarm: 'ALARM',
    pilotComm: 'COMM',
    pilotSafety: 'SAFETY',
    setpoint: 'SP',
    processValue: 'PV',
    status: {
      normal: 'Normal',
      warning: 'Peringatan',
      critical: 'Kritis / Trip',
      offline: 'Offline'
    },
    rhvac: {
      title: 'Desain Sistem Refrigerasi & Tata Udara (RHVAC)',
      subtitle: 'Diagram P&ID Interaktif dengan Aliran Refrigeran & Kalkulasi Termodinamika',
      discharge: 'Tekanan & Suhu Discharge',
      suction: 'Tekanan & Suhu Suction',
      superheat: 'Superheat (SH)',
      subcooling: 'Subcooling (SC)',
      roomTemp: 'Suhu Cold Room',
      compressor: 'Kompresor',
      condenser: 'Kondensor',
      evaporator: 'Evaporator',
      txv: 'Katup Ekspansi (TXV)',
      receiver: 'Receiver Cairan',
      modeCooling: 'Pendinginan Normal',
      modeDefrost: 'Siklus Defrost',
      modeStandby: 'Standby / Siaga'
    }
  },
  en: {
    brand: 'SCADA IoT Dashboard',
    tagline: 'Industrial Control & Telemetry Template',
    navDashboard: 'Main Dashboard',
    navRhvac: 'RHVAC Design',
    navWidgets: 'Widget Catalog',
    masterBanner: 'Central SCADA Control Center',
    busHealth: 'RS485 / MQTT Comm Bus',
    activeNodes: 'Active Nodes',
    warningNodes: 'Warnings',
    criticalNodes: 'Critical / Trip',
    sectionDevices: 'Operational Equipment Matrix',
    filterAll: 'All Devices',
    filterAttention: 'Attention Needed',
    sortCustom: 'Custom Order (Drag)',
    sortAlarms: 'Alarms First',
    sortValHigh: 'Highest Value',
    resetOrder: 'Reset Order',
    dragHint: 'Drag and drop cards to customize monitoring priority',
    quickMimic: 'Synoptic Diagram',
    closeModal: 'Close',
    detailLink: 'Engineering Details →',
    viewModeScada: '🎛️ SCADA Faceplates',
    viewModeBars: '📊 Compact Level Bars',
    simBadge: 'Simulation Mode',
    resizeWidget: 'Resize Widget',
    pilotRun: 'RUN',
    pilotAux: 'AUX',
    pilotAlarm: 'ALARM',
    pilotComm: 'COMM',
    pilotSafety: 'SAFETY',
    setpoint: 'SP',
    processValue: 'PV',
    status: {
      normal: 'Normal',
      warning: 'Warning',
      critical: 'Critical / Trip',
      offline: 'Offline'
    },
    rhvac: {
      title: 'Refrigeration & HVAC System Design',
      subtitle: 'Interactive P&ID Process Flow with Refrigerant Cycle & Thermodynamic Telemetry',
      discharge: 'Discharge Press & Temp',
      suction: 'Suction Press & Temp',
      superheat: 'Superheat (SH)',
      subcooling: 'Subcooling (SC)',
      roomTemp: 'Cold Room Temperature',
      compressor: 'Compressor',
      condenser: 'Condenser',
      evaporator: 'Evaporator',
      txv: 'Expansion Valve (TXV)',
      receiver: 'Liquid Receiver',
      modeCooling: 'Active Cooling',
      modeDefrost: 'Defrost Cycle',
      modeStandby: 'Standby Mode'
    }
  }
};

function createLocaleStore() {
  const { subscribe, set } = writable<Locale>('id');

  return {
    subscribe,
    init: () => {
      if (!browser) return;
      const saved = localStorage.getItem('lang') as Locale | null;
      if (saved && (saved === 'id' || saved === 'en')) {
        set(saved);
        document.documentElement.setAttribute('lang', saved);
      }
    },
    toggle: () => {
      if (!browser) return;
      const current = (localStorage.getItem('lang') as Locale) || 'id';
      const next: Locale = current === 'id' ? 'en' : 'id';
      localStorage.setItem('lang', next);
      document.documentElement.setAttribute('lang', next);
      set(next);
    }
  };
}

export const localeStore = createLocaleStore();
export const t = derived(localeStore, ($locale) => translations[$locale]);
