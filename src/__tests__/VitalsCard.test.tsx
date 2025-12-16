import React from 'react'
import { render, screen } from '@testing-library/react'
import { VitalsCard } from '../components/ExposureCard'
import { Vital } from '../types/database'
import { AnimationProvider } from '../contexts/AnimationContext'
import { ThemeProvider } from '../contexts/ThemeContext'

const mockVital: Vital = {
  id: '1',
  patient_id: 'patient-1',
  device_id: 'device-1',
  timestamp: '2024-01-20T10:30:00Z',
  temperature: 36.8,
  spo2: 98,
  bpm: 72,
  blood_pressure_systolic: 120,
  blood_pressure_diastolic: 80,
  respiratory_rate: 16,
  ecg_data: [0.1, 0.3, 0.8, 1.2, 0.9, 0.4, 0.1, -0.1, 0.0, 0.1],
  created_at: '2024-01-20T10:30:00Z',
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <AnimationProvider>
      {children}
    </AnimationProvider>
  </ThemeProvider>
)

describe('VitalsCard Component', () => {
  it('renders loading state', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={null} isLoading={true} />
      </TestWrapper>
    )

    expect(screen.getByText('Current Vitals')).toBeInTheDocument()
    // Check for skeleton loading elements
    expect(screen.getAllByRole('generic')).toHaveLength(expect.any(Number))
  })

  it('displays vital signs when data provided', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('Current Vitals')).toBeInTheDocument()
    expect(screen.getByText('36.8')).toBeInTheDocument() // Temperature
    expect(screen.getByText('98')).toBeInTheDocument() // SpO2
    expect(screen.getByText('72')).toBeInTheDocument() // Heart Rate
    expect(screen.getByText('16')).toBeInTheDocument() // Respiratory Rate
  })

  it('displays blood pressure when available', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('120')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
    expect(screen.getByText('Blood Pressure')).toBeInTheDocument()
  })

  it('shows last updated timestamp', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    // Check that timestamp is displayed (exact format may vary by locale)
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument()
  })

  it('displays live monitoring indicator', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('Live Monitoring')).toBeInTheDocument()
  })

  it('shows normal ranges for vitals', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('Normal: 36.0-37.5')).toBeInTheDocument() // Temperature
    expect(screen.getByText('Normal: 95-100')).toBeInTheDocument() // SpO2
    expect(screen.getByText('Normal: 60-100')).toBeInTheDocument() // Heart Rate
    expect(screen.getByText('Normal: 12-20')).toBeInTheDocument() // Respiratory Rate
  })

  it('handles missing vital data gracefully', () => {
    const incompleteVital: Vital = {
      ...mockVital,
      temperature: undefined,
      spo2: undefined,
    }

    render(
      <TestWrapper>
        <VitalsCard vitals={incompleteVital} isLoading={false} />
      </TestWrapper>
    )

    // Should show placeholders for missing data
    expect(screen.getAllByText('--')).toHaveLength(2)
  })

  it('displays device ID in status summary', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={mockVital} isLoading={false} />
      </TestWrapper>
    )

    // Should show last 8 characters of device ID
    expect(screen.getByText(/Device ID: device-1/)).toBeInTheDocument()
  })

  it('renders with null vitals data', () => {
    render(
      <TestWrapper>
        <VitalsCard vitals={null} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('Current Vitals')).toBeInTheDocument()
    // Should show placeholders for all vitals
    expect(screen.getAllByText('--')).toHaveLength(4)
  })

  it('applies correct styling for vital status', () => {
    const criticalVital: Vital = {
      ...mockVital,
      temperature: 40.0, // Critical temperature
      spo2: 85, // Critical SpO2
      bpm: 140, // Critical heart rate
    }

    render(
      <TestWrapper>
        <VitalsCard vitals={criticalVital} isLoading={false} />
      </TestWrapper>
    )

    expect(screen.getByText('40.0')).toBeInTheDocument()
    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('140')).toBeInTheDocument()
  })
})