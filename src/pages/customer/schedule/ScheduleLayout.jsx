import { Box, Typography, Container, Grid, Card, Button } from '@mui/material'
import { useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'
import BookAppointment from './BookAppointment'
import VetSuggestion from './VetSuggestion'
import AppointmentForm from './AppointmentForm'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AssignmentIcon from '@mui/icons-material/Assignment'

const ScheduleLayout = () => {
  const [currentStep, setCurrentStep] = useState('book')
  const [selectedVet, setSelectedVet] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    petId: null,
    reason: '',
    notes: '',
    preferredDate: '',
    preferredTime: ''
  })

  const handleVetSelect = (vet) => {
    setSelectedVet(vet)
    setCurrentStep('form')
  }

  const handleAppointmentSubmit = (data) => {
    setAppointmentData(data)
    setCurrentStep('confirmation')
  }

  const handleBackToBooking = () => {
    setCurrentStep('book')
    setSelectedVet(null)
  }

  const handleBackToVetSelection = () => {
    setCurrentStep('suggestions')
  }

  const renderStepContent = () => {
    switch (currentStep) {
    case 'book':
      return (
        <BookAppointment
          onStartBooking={() => setCurrentStep('suggestions')}
        />
      )
    case 'suggestions':
      return (
        <VetSuggestion
          onVetSelect={handleVetSelect}
          onBack={() => setCurrentStep('book')}
          appointmentData={appointmentData}
        />
      )
    case 'form':
      return (
        <AppointmentForm
          selectedVet={selectedVet}
          onBack={handleBackToVetSelection}
          onSubmit={handleAppointmentSubmit}
          initialData={appointmentData}
        />
      )
    case 'confirmation':
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, color: theme.palette.primary.main }}>
            Appointment Booked Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.textSub }}>
            Your appointment with Dr. {selectedVet?.firstName} {selectedVet?.lastName} has been scheduled.
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackToBooking}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            Book Another Appointment
          </Button>
        </Box>
      )
    default:
      return null
    }
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <AppBar />

      {/* Hero Section */}
      <Box
        sx={{
          mt: theme.fitbowl.appBarHeight,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.secondary} 100%)`,
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Book an Appointment
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Schedule a visit with our experienced veterinarians for your pet&apos;s health and wellness
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CalendarTodayIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Easy Scheduling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Book appointments at your convenience with our online system
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <LocalHospitalIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Expert Vets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our qualified veterinarians provide the best care for your pets
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Location-Based
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find vets near you for convenient and quick access
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <AssignmentIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Condition-Based
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get matched with specialists based on your pet&apos;s condition
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          {renderStepContent()}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default ScheduleLayout