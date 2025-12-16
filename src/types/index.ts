import { Patient, Device, Vital, Alert } from './database'

// Time range options for charts
export type TimeRange = '1h' | '6h' | '24h' | '7d'

// Chart data interfaces
export interface ChartDataPoint {
  x: string | number
  y: number
  timestamp: string
}

export interface VitalChartData {
  temperature: ChartDataPoint[]
  spo2: ChartDataPoint[]
  bpm: ChartDataPoint[]
}

// Extended interfaces with additional computed properties
export interface PatientWithStatus extends Patient {
  status: 'stable' | 'warning' | 'critical'
  lastVitalTime?: string
  activeAlertsCount: number
  connectedDevices: Device[]
}

export interface DeviceWithStatus extends Device {
  connectionStatus: 'connected' | 'disconnected' | 'error'
  signalStrength?: number
  lastDataTime?: string
}

export interface VitalWithTrends extends Vital {
  trends: {
    temperature?: 'up' | 'down' | 'stable'
    spo2?: 'up' | 'down' | 'stable'
    bpm?: 'up' | 'down' | 'stable'
  }
}

export interface AlertWithPatient extends Alert {
  patient: Patient
  device?: Device
}

// Mock data configuration
export interface MockConfig {
  enabled: boolean
  patientCount: number
  updateInterval: number
  realtime: boolean
}

// Chart configuration
export interface ChartConfig {
  responsive: boolean
  maintainAspectRatio: boolean
  animation: {
    duration: number
    easing: string
  }
  scales: {
    x: {
      type: string
      time?: {
        unit: string
        displayFormats: Record<string, string>
      }
    }
    y: {
      beginAtZero: boolean
      min?: number
      max?: number
    }
  }
  plugins: {
    legend: {
      display: boolean
    }
    tooltip: {
      enabled: boolean
      mode: string
      intersect: boolean
    }
  }
}

// ECG Viewer configuration
export interface ECGConfig {
  sampleRate: number
  displayDuration: number // seconds
  amplitude: number
  gridEnabled: boolean
  filtersEnabled: boolean
  downsampleFactor: number
}

// Patient selection interface
export interface PatientOption {
  id: string
  name: string
  roomNumber: string
  status: 'stable' | 'warning' | 'critical'
}

// Settings interface
export interface AppSettings {
  theme: 'light' | 'dark'
  animationsEnabled: boolean
  soundEnabled: boolean
  refreshInterval: number
  autoAcknowledgeAlerts: boolean
  chartPreferences: {
    defaultTimeRange: TimeRange
    showGridLines: boolean
    animateOnLoad: boolean
  }
}

// Notification types
export interface NotificationData {
  id: string
  type: 'info' | 'warning' | 'critical'
  title: string
  message: string
  timestamp: string
  acknowledged: boolean
  patientId?: string
  deviceId?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  hasMore: boolean
}

// Real-time event types
export type RealtimeEvent = 
  | { type: 'VITAL_UPDATE'; payload: Vital }
  | { type: 'ALERT_CREATED'; payload: Alert }
  | { type: 'DEVICE_STATUS_CHANGED'; payload: Device }
  | { type: 'PATIENT_UPDATED'; payload: Patient }

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isValid: boolean
  isSubmitting: boolean
}

// Vital thresholds for alerts
export interface VitalThresholds {
  temperature: {
    min: number
    max: number
    critical_min: number
    critical_max: number
  }
  spo2: {
    min: number
    critical_min: number
  }
  bpm: {
    min: number
    max: number
    critical_min: number
    critical_max: number
  }
  blood_pressure: {
    systolic_max: number
    diastolic_max: number
    systolic_critical: number
    diastolic_critical: number
  }
}

// Default vital thresholds
export const DEFAULT_VITAL_THRESHOLDS: VitalThresholds = {
  temperature: {
    min: 36.0,
    max: 37.5,
    critical_min: 35.0,
    critical_max: 40.0
  },
  spo2: {
    min: 95,
    critical_min: 88
  },
  bpm: {
    min: 60,
    max: 100,
    critical_min: 50,
    critical_max: 120
  },
  blood_pressure: {
    systolic_max: 140,
    diastolic_max: 90,
    systolic_critical: 180,
    diastolic_critical: 110
  }
}