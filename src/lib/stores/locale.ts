import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Locale = 'id' | 'en';

export const translations = {
  id: {
    brand: 'SCADA IoT Dashboard',
    tagline: 'Template Sistem Kendali & Telemetri Industri',
    navHome: 'Beranda',
    navDashboard: 'Dashboard Utama',
    navRhvac: 'Desain RHVAC',
    navWidgets: 'Katalog Widget',
    navDocs: 'Dokumentasi',
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
    },
    landing: {
      badge: 'SVELTEKIT 2 + SVELTE 5 · ZERO CHARTING BLOAT',
      heroTitle: 'Template Dashboard SCADA & Telemetri IoT Industri Siap Produksi',
      heroSubtitle: 'Starter kit modular berkinerja tinggi untuk antarmuka HMI, SCADA, dan pemantauan IoT industri. Dibangun dengan 100% pure SVG pada 60 FPS, kepatuhan standar alarm ISA-18.1, diagram P&ID refrigerasi RHVAC, dan bebas dari dependensi grafik eksternal yang berat.',
      btnDashboard: 'Buka Live Dashboard',
      btnDemo: 'Coba Demo Interaktif',
      btnDocs: 'Pusat Dokumentasi',
      copySuccess: 'Tersalin ke Clipboard!',
      telemetryStrip: {
        activeNodes: 'Node Operasional',
        commBus: 'Bus Komunikasi',
        scanRate: 'Interval Pemindaian',
        alarms: 'Status ISA-18.1',
        activeVal: '4 / 4 Perangkat Online',
        commVal: 'RS485 Modbus RTU / MQTT Active',
        scanVal: 'Loop Jitter 4.0 Detik',
        alarmsVal: 'Sistem Terkendali (0 Trip)'
      },
      whyTitle: 'Karakteristik & Keunggulan Rekayasa',
      whySubtitle: 'Dirancang khusus untuk kehandalan ruang kendali pabrik, panel sentuh HMI edge, dan ruang operator tanpa overhead pustaka grafik pihak ketiga.',
      features: [
        {
          tag: 'PERFORMA 60 FPS',
          title: 'Nol Dependensi Charting Eksternal',
          desc: 'Semua gauge, sparkline, tank level, dan mimic dibuat dengan SVG murni native. Bebas dari beban bundel Chart.js/D3 sebesar 500KB+, berjalan mulus pada Raspberry Pi dan IPC industri.'
        },
        {
          tag: 'STANDAR ALARM',
          title: 'Kepatuhan Alarm ISA-18.1',
          desc: 'Sistem notifikasi annunciator dengan status visual berjenjang (Normal, Warning, Critical, Offline), flash pulse dinamis, dan pemisahan prioritas visual beresolusi tinggi.'
        },
        {
          tag: 'ERGONOMI KONTROL',
          title: 'Gauge Radial Node-RED 240°',
          desc: 'Visualisasi busur simetris 240° dengan jarum presisi tirus, penanda setpoint (SP), zona batas alarm, serta font monospace tabular anti-jitter saat nilai berganti.'
        },
        {
          tag: 'P&ID REFRIGERASI',
          title: 'Diagram Sinoptik & Siklus RHVAC',
          desc: 'Diagram piping interaktif dengan garis aliran refrigeran beranimasi dinamis dan kalkulasi real-time Superheat (SH) serta Subcooling (SC).'
        },
        {
          tag: 'INSTRUMEN LENGKAP',
          title: 'Suite Widget SCADA Komprehensif',
          desc: 'Dilengkapi level tangki vertikal dengan efek gelombang, meteran digital VAC/A, rotary switch 3-posisi (Hand/Off/Auto), PID faceplate, dan lampu pilot LED berrefleksi lensa kristal.'
        },
        {
          tag: 'KUSTOMISASI BEBAS',
          title: 'Grid Fleksibel & Ukuran Widget (S/M/W/L)',
          desc: 'Operator dapat mengubah ukuran tiap modul secara dinamis dan menyusun ulang prioritas visual dengan penyimpanan otomatis pada browser localStorage.'
        },
        {
          tag: 'INTERKONEKSI EDGE',
          title: 'Siap Modbus RTU, MQTT & WebSocket',
          desc: 'Struktur store data terisolasi yang memisahkan lapisan ingestion dan visualisasi. Sangat mudah dialihkan dari mock engine ke broker MQTT atau gateway Modbus.'
        },
        {
          tag: 'VISUAL KONTROL RUANG',
          title: 'Dual Theme & Bilingual (ID/EN)',
          desc: 'Tema Kontrol Gelap (Dark Mode) dan Ruang Terang (Light Mode) berstandar WCAG AA/AAA dengan pergantian bahasa instan tanpa refresh halaman.'
        }
      ],
      archTitle: 'Arsitektur Sistem & Aliran Telemetri',
      archSubtitle: 'Pemisahan tanggung jawab yang tegas dari instrumen lapangan hingga antarmuka operator SCADA.',
      demoTitle: 'Workbench Demo Interaktif',
      demoSubtitle: 'Uji responsivitas komponen SCADA langsung pada browser Anda. Gunakan preset skenario atau sesuaikan nilai instrumen secara manual.',
      presetsTitle: 'Skenario Gangguan Lapangan (Preset)',
      presetNormal: 'Operasi Normal',
      presetWarning: 'Peringatan Suhu Tinggi',
      presetTrip: 'Trip Tekanan Lebih',
      presetOffline: 'Komunikasi Terputus',
      controlsTitle: 'Kontrol & Input Parameter Langsung',
      tempLabel: 'Suhu Proses (PV)',
      spLabel: 'Setpoint (SP)',
      tankLabel: 'Level Tangki Cairan (%)',
      switchLabel: 'Mode Selektor Rotary',
      switchHand: 'MANUAL (HAND)',
      switchOff: 'MATI (OFF)',
      switchAuto: 'OTOMATIS (AUTO)',
      pilotsTitle: 'Bank Lampu Pilot LED Industri',
      launchHeader: 'Jelajahi Lingkungan Aplikasi Lengkap',
      launchDashboardDesc: 'Akses ruang kendali pabrik terpusat dengan matriks perangkat, filter alarm, dan penyusunan grid kustom.',
      launchRhvacDesc: 'Pelajari diagram P&ID refrigerasi dengan outdoor CDU, evaporator cold storage, dan kalkulasi termodinamika.',
      launchWidgetsDesc: 'Buka katalog referensi lengkap seluruh widget SCADA dengan pengujian ukuran responsif (S/M/W/L).',
      docsTitle: 'Pusat Dokumentasi Rekayasa',
      docsSubtitle: 'Panduan teknis langkah-demi-langkah, arsitektur store data, integrasi perangkat keras nyata, dan referensi API komponen.',
      tabQuickstart: 'Mulai Cepat',
      tabArch: 'Arsitektur Store',
      tabHardware: 'Integrasi Hardware',
      tabWidgets: 'API Widget & Snippet',
      tabRhvac: 'Teknik RHVAC',
      tabTheming: 'Tema & Desain'
    }
  },
  en: {
    brand: 'SCADA IoT Dashboard',
    tagline: 'Industrial Control & Telemetry Template',
    navHome: 'Home',
    navDashboard: 'Main Dashboard',
    navRhvac: 'RHVAC Design',
    navWidgets: 'Widget Catalog',
    navDocs: 'Documentation',
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
    },
    landing: {
      badge: 'SVELTEKIT 2 + SVELTE 5 · ZERO CHARTING BLOAT',
      heroTitle: 'Production-Ready Industrial SCADA & IoT Telemetry Template',
      heroSubtitle: 'A high-performance, modular starter template for industrial HMI, SCADA, and IoT telemetry dashboards. Engineered with 100% pure SVG at 60 FPS, ISA-18.1 alarm compliance, RHVAC refrigeration P&ID diagrams, and zero heavy external charting dependencies.',
      btnDashboard: 'Launch Live Dashboard',
      btnDemo: 'Interactive Demo Bench',
      btnDocs: 'Documentation Hub',
      copySuccess: 'Copied to Clipboard!',
      telemetryStrip: {
        activeNodes: 'Operational Nodes',
        commBus: 'Field Comm Bus',
        scanRate: 'Scan Interval',
        alarms: 'ISA-18.1 Status',
        activeVal: '4 / 4 Devices Online',
        commVal: 'RS485 Modbus RTU / MQTT Active',
        scanVal: '4.0s Telemetry Loop',
        alarmsVal: 'Controlled (0 Active Trip)'
      },
      whyTitle: 'Engineering Features & Principles',
      whySubtitle: 'Purpose-built for factory control rooms, edge HMI touchscreen panels, and plant operators without third-party chart library bloat.',
      features: [
        {
          tag: '60 FPS PERFORMANCE',
          title: 'Zero External Charting Bloat',
          desc: 'All radial gauges, sparklines, tank levels, and mimics are built with native SVG math. Free from 500KB+ Chart.js or D3 bundles, running smoothly on Raspberry Pi and edge IPCs.'
        },
        {
          tag: 'ALARM STANDARDS',
          title: 'ISA-18.1 Alarm Compliance',
          desc: 'Annunciator tile architecture with multi-level visual states (Normal, Warning, Critical, Offline), dynamic flash pulses, and high-contrast priority demarcation.'
        },
        {
          tag: 'CONTROL ERGONOMICS',
          title: '240° Node-RED Radial Arc Gauges',
          desc: 'Symmetrical 240° sweep with a tapered precision needle, Setpoint (SP) notch, alarm zone bands, and tabular monospace readouts to eliminate jitter.'
        },
        {
          tag: 'RHVAC P&ID',
          title: 'Synoptic Mimics & Refrigerant Flow',
          desc: 'Interactive process piping diagrams with dynamic animated fluid flow paths and real-time Superheat (SH) and Subcooling (SC) thermodynamic calculations.'
        },
        {
          tag: 'COMPLETE INSTRUMENTATION',
          title: 'Comprehensive SCADA Widget Suite',
          desc: 'Includes vertical fluid tanks with wave animations, digital panel meters, 3-position rotary switches (Hand/Off/Auto), PID faceplates, and jewel-lens LED pilot lights.'
        },
        {
          tag: 'LAYOUT FREEDOM',
          title: 'Dynamic Grid & Widget Sizes (S/M/W/L)',
          desc: 'Plant operators can resize any widget on-the-fly and rearrange monitoring priorities with automatic browser localStorage persistence.'
        },
        {
          tag: 'EDGE PROTOCOLS',
          title: 'Modbus RTU, MQTT & WebSocket Ready',
          desc: 'A decoupled architecture isolating ingestion and visualization. Switch seamlessly from the built-in mock engine to live MQTT brokers or Modbus gateways.'
        },
        {
          tag: 'CONTROL ROOM VISUALS',
          title: 'Dual Themes & Bilingual (ID/EN)',
          desc: 'High-contrast Industrial Dark and Crisp Light themes meeting WCAG AA/AAA standards, with instant client-side language switching without reload.'
        }
      ],
      archTitle: 'System Topology & Telemetry Flow',
      archSubtitle: 'Strict separation of concerns from field instruments to the operator SCADA surface.',
      demoTitle: 'Interactive Demo Workbench',
      demoSubtitle: 'Test SCADA component reactivity directly in your browser. Select preset disturbance scenarios or adjust instrument parameters manually.',
      presetsTitle: 'Field Disturbance Scenarios (Presets)',
      presetNormal: 'Normal Running',
      presetWarning: 'High Temp Warning',
      presetTrip: 'High Pressure Trip',
      presetOffline: 'Bus Comm Loss',
      controlsTitle: 'Direct Parameter Controls',
      tempLabel: 'Process Value (PV)',
      spLabel: 'Setpoint (SP)',
      tankLabel: 'Fluid Tank Level (%)',
      switchLabel: 'Rotary Mode Selector',
      switchHand: 'MANUAL (HAND)',
      switchOff: 'OFF',
      switchAuto: 'AUTOMATIC (AUTO)',
      pilotsTitle: 'Industrial Pilot Annunciator Lamps',
      launchHeader: 'Explore Full Application Views',
      launchDashboardDesc: 'Access the central control room with device matrices, alarm filters, and customizable operator grids.',
      launchRhvacDesc: 'Inspect the refrigeration P&ID system with outdoor CDU, cold storage evaporator, and live enthalpy metrics.',
      launchWidgetsDesc: 'Browse the comprehensive widget reference catalog with responsive sizing (S/M/W/L) test cards.',
      docsTitle: 'Engineering Documentation Hub',
      docsSubtitle: 'Step-by-step technical guides, reactive store design, real hardware connection tutorials, and widget API references.',
      tabQuickstart: 'Quick Start',
      tabArch: 'Store Architecture',
      tabHardware: 'Hardware Integration',
      tabWidgets: 'Widget API & Snippets',
      tabRhvac: 'RHVAC Engineering',
      tabTheming: 'Themes & Design'
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
