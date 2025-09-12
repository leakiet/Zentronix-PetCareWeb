
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import PetsIcon from '@mui/icons-material/Pets'
import HealthIcon from '@mui/icons-material/HealthAndSafety'
import HistoryIcon from '@mui/icons-material/History'
import EventIcon from '@mui/icons-material/Event'
import { useForm } from 'react-hook-form'
import ResponsiveAppBar from '~/components/AppBar/AppBar'
import PetProfilesTab from './PetProfilesTab'
import HealthRecordsTab from './HealthRecordsTab'
import OrderHistoryTab from './OrderHistoryTab'
import AppointmentTab from './AppointmentTab'
import PetDialog from './PetDialog'
import HealthRecordDialog from './HealthRecordDialog'
import TabPanel from './TabPanel'


function a11yProps(index) {
  return {
    id: `pet-owner-tab-${index}`,
    'aria-controls': `pet-owner-tabpanel-${index}`
  }
}

export default function PetOwnerSettings() {
  const [tabValue, setTabValue] = useState(0)
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [petDialogOpen, setPetDialogOpen] = useState(false)
  const [healthRecords, setHealthRecords] = useState([])
  const [healthDialogOpen, setHealthDialogOpen] = useState(false)
  const [documents, setDocuments] = useState([])
  const [insurancePolicies, setInsurancePolicies] = useState([])
  const [orders, setOrders] = useState([])
  const [appointments, setAppointments] = useState([])

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm()

  // Mock data for demonstration
  useEffect(() => {
    // Load pets data
    setPets([
      {
        id: 1,
        name: 'Max',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        weight: 25,
        color: 'Golden',
        medicalHistory: 'Regular checkups, vaccinated',
        images: [],
        createdAt: '2024-01-15'
      }
    ])

    // Load health records
    setHealthRecords([
      {
        id: 1,
        petId: 1,
        type: 'vaccination',
        title: 'Rabies Vaccination',
        date: '2024-03-15',
        description: 'Annual rabies vaccination',
        vetName: 'Dr. Smith',
        nextDue: '2025-03-15'
      },
      {
        id: 2,
        petId: 1,
        type: 'checkup',
        title: 'Annual Checkup',
        date: '2024-02-20',
        description: 'Regular health checkup',
        vetName: 'Dr. Johnson',
        notes: 'All vitals normal'
      }
    ])

    // Load documents
    setDocuments([
      {
        id: 1,
        petId: 1,
        type: 'vaccination_certificate',
        name: 'Rabies Certificate 2024',
        uploadDate: '2024-03-15',
        fileUrl: '#'
      }
    ])

    // Load insurance policies
    setInsurancePolicies([
      {
        id: 1,
        petId: 1,
        provider: 'PetCare Insurance',
        policyNumber: 'PC-2024-001',
        coverage: 'Comprehensive',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        premium: 1200,
        documents: []
      }
    ])

    // Load orders
    setOrders([
      {
        id: 1,
        petId: 1,
        petName: 'Max',
        orderDate: '2024-03-10',
        status: 'Delivered',
        items: [
          {
            id: 1,
            name: 'Premium Dog Food',
            quantity: 2,
            price: 45.99,
            total: 91.98
          },
          {
            id: 2,
            name: 'Dog Shampoo',
            quantity: 1,
            price: 12.99,
            total: 12.99
          }
        ],
        totalAmount: 104.97,
        deliveryAddress: '123 Main St, City, State 12345'
      },
      {
        id: 2,
        petId: 1,
        petName: 'Max',
        orderDate: '2024-02-15',
        status: 'Shipped',
        items: [
          {
            id: 3,
            name: 'Dog Toys Set',
            quantity: 1,
            price: 24.99,
            total: 24.99
          }
        ],
        totalAmount: 24.99,
        deliveryAddress: '123 Main St, City, State 12345'
      }
    ])

    // Load appointments
    setAppointments([
      {
        id: 1,
        petId: 1,
        petName: 'Max',
        appointmentDate: '2024-04-15',
        appointmentTime: '10:00 AM',
        serviceType: 'Annual Checkup',
        vetName: 'Dr. Smith',
        clinicName: 'PetCare Veterinary Clinic',
        status: 'Confirmed',
        notes: 'Regular annual checkup and vaccination'
      },
      {
        id: 2,
        petId: 1,
        petName: 'Max',
        appointmentDate: '2024-03-20',
        appointmentTime: '2:00 PM',
        serviceType: 'Dental Cleaning',
        vetName: 'Dr. Johnson',
        clinicName: 'PetCare Veterinary Clinic',
        status: 'Completed',
        notes: 'Professional dental cleaning completed successfully'
      }
    ])
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddPet = () => {
    setSelectedPet(null)
    reset()
    setPetDialogOpen(true)
  }

  const handleEditPet = (pet) => {
    setSelectedPet(pet)
    reset(pet)
    setPetDialogOpen(true)
  }

  const handleDeletePet = (petId) => {
    setPets(pets.filter(pet => pet.id !== petId))
  }

  const handleSavePet = (data) => {
    if (selectedPet) {
      // Update existing pet
      setPets(pets.map(pet =>
        pet.id === selectedPet.id ? { ...pet, ...data } : pet
      ))
    } else {
      // Add new pet
      const newPet = {
        ...data,
        id: Date.now(),
        images: [],
        createdAt: new Date().toISOString().split('T')[0]
      }
      setPets([...pets, newPet])
    }
    setPetDialogOpen(false)
  }

  const handleAddHealthRecord = () => {
    setHealthDialogOpen(true)
  }

  const handleSaveHealthRecord = (data) => {
    const newRecord = {
      ...data,
      id: Date.now(),
      petId: selectedPet?.id || 1
    }
    setHealthRecords([...healthRecords, newRecord])
    setHealthDialogOpen(false)
  }

  const handleBookAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now(),
      status: 'Pending'
    }
    setAppointments([...appointments, newAppointment])
  }

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4, pt: 10 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Pet Owner Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage your pets&apos; profiles, health records, and insurance information
          </Typography>

          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="pet owner settings tabs">
                <Tab
                  icon={<PetsIcon />}
                  label="Manage Pet Profiles"
                  {...a11yProps(0)}
                  iconPosition="start"
                />
                <Tab
                  icon={<HealthIcon />}
                  label="Track Health Records"
                  {...a11yProps(1)}
                  iconPosition="start"
                />
                <Tab
                  icon={<HistoryIcon />}
                  label="Order History"
                  {...a11yProps(2)}
                  iconPosition="start"
                />
                <Tab
                  icon={<EventIcon />}
                  label="Appointments"
                  {...a11yProps(3)}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab 1: Manage Pet Profiles */}
            <TabPanel value={tabValue} index={0}>
              <PetProfilesTab
                pets={pets}
                onAddPet={handleAddPet}
                onEditPet={handleEditPet}
                onDeletePet={handleDeletePet}
              />
            </TabPanel>

            {/* Tab 2: Track Health Records */}
            <TabPanel value={tabValue} index={1}>
              <HealthRecordsTab
                healthRecords={healthRecords}
                documents={documents}
                insurancePolicies={insurancePolicies}
                onAddHealthRecord={handleAddHealthRecord}
              />
            </TabPanel>

            {/* Tab 3: Order History */}
            <TabPanel value={tabValue} index={2}>
              <OrderHistoryTab
                orders={orders}
              />
            </TabPanel>

            {/* Tab 4: Appointments */}
            <TabPanel value={tabValue} index={3}>
              <AppointmentTab
                pets={pets}
                appointments={appointments}
                onBookAppointment={handleBookAppointment}
              />
            </TabPanel>
          </Paper>
        </Box>

        {/* Add/Edit Pet Dialog */}
        <PetDialog
          open={petDialogOpen}
          onClose={() => setPetDialogOpen(false)}
          selectedPet={selectedPet}
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          onSave={handleSavePet}
        />

        {/* Add Health Record Dialog */}
        <HealthRecordDialog
          open={healthDialogOpen}
          onClose={() => setHealthDialogOpen(false)}
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          onSave={handleSaveHealthRecord}
        />
      </Container>
    </>
  )
}
