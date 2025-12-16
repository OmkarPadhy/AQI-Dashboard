import { useState, useEffect, useCallback } from 'react'
import { Patient, Device, Vital, Alert } from '../types/database'
import { PatientWithStatus, VitalChartData, ChartDataPoint } from '../types'

// Mock data generation utilities
const generateMockPatients = (count: number): PatientWithStatus[] => {
  const names = [
    'John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
    'Lisa Anderson', 'James Taylor', 'Jennifer Martin', 'Robert Garcia', 'Mary Rodriguez'
  ]
  
  const statuses: Array<'stable' | 'warning' | 'critical'> = ['stable', 'stable', 'stable', 'warning', 'critical']
  
  return Array.from({ length: count }, (_, index) => ({
    id: `patient-${index + 1}`,
    name: names[index % names.length],
    age: 25 + Math.floor(Math.random() * 50),
    gender: Math.random() > 0.5 ? 'male' : 'female',
    room_number: `${Math.floor(Math.random() * 5) + 1}${String(index + 1).padStart(2, '0')}`,
    admission_date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    medical_record_number: `MRN${String(1000 + index).padStart(6, '0')}`,
    emergency_contact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    notes: Math.random() > 0.7 ? 'Patient has history of hypertension' : undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: statuses[index % statuses.length],
    lastVitalTime: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
    activeAlertsCount: statuses[index % statuses.length] === 'critical' ? 2 : 
                       statuses[index % statuses.length] === 'warning' ? 1 : 0,
    connectedDevices: []
  }))
}

const generateMockDevices = (patientId: string): Device[] => {
  return [
    {
      id: `device-${patientId}-1`,
      device_key: `dev-${patientId}-monitor`,
      patient_id: patientId,
      device_type: 'Cardiac Monitor',
      location: 'Bedside',
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      last_seen: new Date().toISOString(),
      battery_level: Math.floor(Math.random() * 100),
      firmware_version: '2.1.4',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: `device-${patientId}-2`,
      device_key: `dev-${patientId}-pulse`,
      patient_id: patientId,
      device_type: 'Pulse Oximeter',
      location: 'Finger',
      status: 'active',
      last_seen: new Date().toISOString(),
      battery_level: Math.floor(Math.random() * 100),
      firmware_version: '1.8.2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
}

const generateRealisticVitals = (patientId: string, baseTime: Date, status: 'stable' | 'warning' | 'critical'): Vital => {
  // Base values for different patient statuses
  const baseValues = {
    stable: { temp: 36.8, spo2: 98, bpm: 72 },
    warning: { temp: 38.2, spo2: 92, bpm: 95 },
    critical: { temp: 39.1, spo2: 88, bpm: 115 }
  }
  
  const base = baseValues[status]
  
  // Add realistic variation
  const temperature = base.temp + (Math.random() - 0.5) * 0.8
  const spo2 = Math.max(85, Math.min(100, base.spo2 + (Math.random() - 0.5) * 6))
  const bpm = Math.max(50, Math.min(150, base.bmp + (Math.random() - 0.5) * 20))
  
  // Generate ECG data (simplified sine wave with noise)
  const ecgData = Array.from({ length: 100 }, (_, i) => {
    const t = i / 100
    const heartbeat = Math.sin(t * Math.PI * 2 * 3) * 0.8
    const noise = (Math.random() - 0.5) * 0.1
    return Math.round((heartbeat + noise) * 1000) / 1000
  })

  return {
    id: `vital-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    patient_id: patientId,
    device_id: `device-${patientId}-1`,
    timestamp: baseTime.toISOString(),
    temperature,
    spo2: Math.round(spo2),
    bpm: Math.round(bpm),
    blood_pressure_systolic: status === 'critical' ? 160 + Math.random() * 20 : 120 + Math.random() * 20,
    blood_pressure_diastolic: status === 'critical' ? 95 + Math.random() * 15 : 80 + Math.random() * 10,
    respiratory_rate: 16 + Math.random() * 8,
    ecg_data: ecgData,
    created_at: baseTime.toISOString()
  }
}

export const useMockData = (enabled: boolean = false) => {
  const [mockPatients, setMockPatients] = useState<PatientWithStatus[]>([])
  const [mockVitals, setMockVitals] = useState<Map<string, Vital[]>>(new Map())
  const [mockAlerts, setMockAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize mock data
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    console.log('🚀 Initializing mock data...')
    
    // Generate patients
    const patients = generateMockPatients(8)
    setMockPatients(patients)

    // Generate historical vitals for each patient
    const vitalsMap = new Map<string, Vital[]>()
    const alertsList: Alert[] = []

    patients.forEach(patient => {
      const vitals: Vital[] = []
      
      // Generate 24 hours of vitals (every 5 minutes)
      const dataPoints = 24 * 12 // 288 points
      for (let i = 0; i < dataPoints; i++) {
        const timestamp = new Date(Date.now() - (dataPoints - i) * 5 * 60 * 1000)
        const vital = generateRealisticVitals(patient.id, timestamp, patient.status)
        vitals.push(vital)

        // Generate alerts for critical/warning values
        if (patient.status === 'critical' && Math.random() > 0.95) {
          alertsList.push({
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            patient_id: patient.id,
            device_id: vital.device_id,
            alert_type: 'critical',
            message: `Critical SpO2 level: ${vital.spo2}%`,
            vital_type: 'spo2',
            vital_value: vital.spo2,
            threshold: 90,
            acknowledged: Math.random() > 0.7,
            resolved: false,
            created_at: timestamp.toISOString()
          })
        } else if (patient.status === 'warning' && Math.random() > 0.98) {
          alertsList.push({
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            patient_id: patient.id,
            device_id: vital.device_id,
            alert_type: 'warning',
            message: `Elevated heart rate: ${vital.bpm} BPM`,
            vital_type: 'bpm',
            vital_value: vital.bpm,
            threshold: 100,
            acknowledged: Math.random() > 0.5,
            resolved: Math.random() > 0.3,
            created_at: timestamp.toISOString()
          })
        }
      }
      
      vitalsMap.set(patient.id, vitals)
    })

    setMockVitals(vitalsMap)
    setMockAlerts(alertsList)
    setIsLoading(false)
    
    console.log('✅ Mock data initialized:', {
      patients: patients.length,
      vitalsPerPatient: vitalsMap.get(patients[0]?.id)?.length || 0,
      alerts: alertsList.length
    })
  }, [enabled])

  // Simulate real-time updates
  useEffect(() => {
    if (!enabled || mockPatients.length === 0) return

    const interval = setInterval(() => {
      // Update vitals for all patients
      setMockVitals(prevVitals => {
        const newVitals = new Map(prevVitals)
        
        mockPatients.forEach(patient => {
          const existingVitals = newVitals.get(patient.id) || []
          const newVital = generateRealisticVitals(patient.id, new Date(), patient.status)
          
          // Keep only last 1000 points to prevent memory issues
          const updatedVitals = [...existingVitals, newVital].slice(-1000)
          newVitals.set(patient.id, updatedVitals)
        })
        
        return newVitals
      })

      // Occasionally generate new alerts
      if (Math.random() > 0.95) {
        const criticalPatients = mockPatients.filter(p => p.status === 'critical')
        if (criticalPatients.length > 0) {
          const patient = criticalPatients[Math.floor(Math.random() * criticalPatients.length)]
          const newAlert: Alert = {
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            patient_id: patient.id,
            alert_type: 'critical',
            message: 'Irregular heartbeat detected',
            vital_type: 'bpm',
            acknowledged: false,
            resolved: false,
            created_at: new Date().toISOString()
          }
          
          setMockAlerts(prev => [newAlert, ...prev.slice(0, 49)]) // Keep latest 50 alerts
        }
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [enabled, mockPatients])

  // Helper functions
  const getPatientVitals = useCallback((patientId: string, timeRange: '1h' | '6h' | '24h' | '7d' = '24h'): VitalChartData => {
    const vitals = mockVitals.get(patientId) || []
    
    // Calculate time cutoff
    const timeRangeMs = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000
    }
    
    const cutoff = Date.now() - timeRangeMs[timeRange]
    const filteredVitals = vitals.filter(v => new Date(v.timestamp).getTime() > cutoff)
    
    return {
      temperature: filteredVitals.map(v => ({
        x: v.timestamp,
        y: v.temperature || 0,
        timestamp: v.timestamp
      })),
      spo2: filteredVitals.map(v => ({
        x: v.timestamp,
        y: v.spo2 || 0,
        timestamp: v.timestamp
      })),
      bpm: filteredVitals.map(v => ({
        x: v.timestamp,
        y: v.bpm || 0,
        timestamp: v.timestamp
      }))
    }
  }, [mockVitals])

  const getLatestVitals = useCallback((patientId: string): Vital | null => {
    const vitals = mockVitals.get(patientId) || []
    return vitals.length > 0 ? vitals[vitals.length - 1] : null
  }, [mockVitals])

  const getPatientAlerts = useCallback((patientId: string) => {
    return mockAlerts.filter(alert => alert.patient_id === patientId)
  }, [mockAlerts])

  const acknowledgeAlert = useCallback((alertId: string) => {
    setMockAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true, acknowledged_at: new Date().toISOString() }
          : alert
      )
    )
  }, [])

  return {
    enabled,
    isLoading,
    patients: mockPatients,
    alerts: mockAlerts,
    getPatientVitals,
    getLatestVitals,
    getPatientAlerts,
    acknowledgeAlert,
    // Expose raw data for development
    rawVitals: mockVitals
  }
}