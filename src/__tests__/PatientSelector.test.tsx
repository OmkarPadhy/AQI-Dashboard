import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PatientSelector } from '../components/RiskProfileSelector'
import { PatientWithStatus } from '../types'
import { AnimationProvider } from '../contexts/AnimationContext'
import { ThemeProvider } from '../contexts/ThemeContext'

const mockPatients: PatientWithStatus[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    room_number: '101',
    admission_date: '2024-01-15T10:30:00Z',
    medical_record_number: 'MRN001',
    emergency_contact: '+1-555-0101',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    status: 'stable',
    activeAlertsCount: 0,
    connectedDevices: [],
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    gender: 'female',
    room_number: '102',
    admission_date: '2024-01-16T14:15:00Z',
    medical_record_number: 'MRN002',
    emergency_contact: '+1-555-0102',
    created_at: '2024-01-16T14:15:00Z',
    updated_at: '2024-01-16T14:15:00Z',
    status: 'warning',
    activeAlertsCount: 1,
    connectedDevices: [],
  },
  {
    id: '3',
    name: 'Bob Johnson',
    age: 67,
    gender: 'male',
    room_number: '201',
    admission_date: '2024-01-17T09:45:00Z',
    medical_record_number: 'MRN003',
    emergency_contact: '+1-555-0201',
    created_at: '2024-01-17T09:45:00Z',
    updated_at: '2024-01-17T09:45:00Z',
    status: 'critical',
    activeAlertsCount: 2,
    connectedDevices: [],
  },
]

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <AnimationProvider>
      {children}
    </AnimationProvider>
  </ThemeProvider>
)

describe('PatientSelector Component', () => {
  const mockOnPatientSelect = jest.fn()

  beforeEach(() => {
    mockOnPatientSelect.mockClear()
  })

  it('renders with placeholder text when no patient selected', () => {
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Select a patient')).toBeInTheDocument()
    expect(screen.getByText('Choose patient to monitor')).toBeInTheDocument()
  })

  it('displays selected patient information', () => {
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={mockPatients[0]}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Room 101 • MRN001')).toBeInTheDocument()
    expect(screen.getByText('stable')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search patients...')).toBeInTheDocument()
    })
  })

  it('filters patients based on search query', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    const searchInput = await screen.findByPlaceholderText('Search patients...')
    await user.type(searchInput, 'Jane')

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument()
    })
  })

  it('calls onPatientSelect when patient is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    const patient = await screen.findByText('Jane Smith')
    await user.click(patient)

    expect(mockOnPatientSelect).toHaveBeenCalledWith(mockPatients[1])
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    // Wait for dropdown to open and get search input
    const searchInput = await screen.findByPlaceholderText('Search patients...')
    
    // Test arrow key navigation
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}') // Move to second patient
    await user.keyboard('{Enter}')

    expect(mockOnPatientSelect).toHaveBeenCalledWith(mockPatients[1])
  })

  it('shows loading state', () => {
    render(
      <TestWrapper>
        <PatientSelector
          patients={[]}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
          isLoading={true}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()
  })

  it('displays correct status indicators', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByText('stable')).toBeInTheDocument()
      expect(screen.getByText('warning')).toBeInTheDocument()
      expect(screen.getByText('critical')).toBeInTheDocument()
    })
  })

  it('shows alert counts for patients', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PatientSelector
          patients={mockPatients}
          selectedPatient={null}
          onPatientSelect={mockOnPatientSelect}
        />
      </TestWrapper>
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByText('1 alert')).toBeInTheDocument()
      expect(screen.getByText('2 alerts')).toBeInTheDocument()
    })
  })
})