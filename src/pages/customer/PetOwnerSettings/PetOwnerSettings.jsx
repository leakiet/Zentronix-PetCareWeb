
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import PetsIcon from '@mui/icons-material/Pets'
import HistoryIcon from '@mui/icons-material/History'
import EventIcon from '@mui/icons-material/Event'

import ResponsiveAppBar from '~/components/AppBar/AppBar'
import PetProfilesTab from './PetProfilesTab/PetProfilesTab'
import OrderHistoryTab from './OrderHistoryTab'
import AppointmentTab from './AppointmentTab'
import TabPanel from './TabPanel'
import {
  fetchBreedsAPI,
  fetPetsByCustomerId
} from '~/apis'
import { toast } from 'react-toastify'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { useSelector } from 'react-redux'


function a11yProps(index) {
  return {
    id: `pet-owner-tab-${index}`,
    'aria-controls': `pet-owner-tabpanel-${index}`
  }
}

export default function PetOwnerSettings() {
  const [tabValue, setTabValue] = useState(0)
  const [pets, setPets] = useState([])
  const [breeds, setBreeds] = useState([])
  const [documents] = useState([
    {
      id: 1,
      petId: 1,
      name: 'Vaccination Certificate 2024.pdf',
      uploadDate: '2024-01-15',
      size: '245 KB',
      type: 'certificate'
    },
    {
      id: 2,
      petId: 1,
      name: 'Blood Test Results.pdf',
      uploadDate: '2024-02-20',
      size: '180 KB',
      type: 'lab_result'
    }
  ])
  const [insurancePolicies] = useState([
    {
      id: 1,
      petId: 1,
      provider: 'PetSure Insurance',
      policyNumber: 'PS-2024-001234',
      coverage: 'Comprehensive - Accidents, Illness & Wellness',
      deductible: 250,
      endDate: '2025-12-31'
    }
  ])
  const [orders] = useState([])
  const [appointments, setAppointments] = useState([])
  const currentCustomer = useSelector(selectCurrentCustomer)

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await fetchBreedsAPI()
        setBreeds(breeds)
      } catch {
        toast.error('Failed to fetch breeds. Please try again later.')
      }
    }

    fetchBreeds()
  }, [])

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (currentCustomer) {
          const pets = await fetPetsByCustomerId(currentCustomer.id)
          setPets(pets)
        }
      } catch {
        toast.error('Failed to fetch pets. Please try again later.')
      }
    }

    fetchPets()
  }, [currentCustomer])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
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
                  icon={<HistoryIcon />}
                  label="Order History"
                  {...a11yProps(1)}
                  iconPosition="start"
                />
                <Tab
                  icon={<EventIcon />}
                  label="Appointments"
                  {...a11yProps(2)}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab 1: Pet Profiles */}
            <TabPanel value={tabValue} index={0}>
              <PetProfilesTab
                pets={pets}
                documents={documents}
                insurancePolicies={insurancePolicies}
                // New props for API functions
                breeds={breeds}
                currentCustomer={currentCustomer}
                setPets={setPets}
              />
            </TabPanel>

            {/* Tab 2: Order History */}
            <TabPanel value={tabValue} index={1}>
              <OrderHistoryTab
                orders={orders}
              />
            </TabPanel>

            {/* Tab 3: Appointments */}
            <TabPanel value={tabValue} index={2}>
              <AppointmentTab
                pets={pets}
                appointments={appointments}
                onBookAppointment={handleBookAppointment}
              />
            </TabPanel>
          </Paper>
        </Box>

      </Container>
    </>
  )
}
