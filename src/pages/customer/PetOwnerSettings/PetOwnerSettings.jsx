
import { useState } from 'react'
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
  const [appointments, setAppointments] = useState([])
  const currentCustomer = useSelector(selectCurrentCustomer)

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
                currentCustomer={currentCustomer}
              />
            </TabPanel>

            {/* Tab 2: Order History */}
            <TabPanel value={tabValue} index={1}>
              <OrderHistoryTab />
            </TabPanel>

            {/* Tab 3: Appointments */}
            <TabPanel value={tabValue} index={2}>
              <AppointmentTab
                pets={[]}
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
