import { Box, Typography, Button, Card, CardContent, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import theme from '~/theme'
import PetsIcon from '@mui/icons-material/Pets'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'

const BookAppointment = ({ onStartBooking }) => {
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState('')
  const [appointmentReason, setAppointmentReason] = useState('')
  const [userLocation, setUserLocation] = useState(null)

  const mockPets = [
    { id: 1, name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: '3 years' },
    { id: 2, name: 'Whiskers', species: 'Cat', breed: 'Persian', age: '2 years' },
    { id: 3, name: 'Charlie', species: 'Dog', breed: 'Labrador', age: '5 years' }
  ]

  const appointmentReasons = [
    'Routine Checkup',
    'Vaccination',
    'Dental Care',
    'Skin Issues',
    'Digestive Problems',
    'Behavioral Issues',
    'Emergency',
    'Surgery Consultation',
    'Other'
  ]

  useEffect(() => {
    setPets(mockPets)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.log('Location access denied or error:', error)
        }
      )
    }
  }, [])

  const handleStartBooking = () => {
    if (!selectedPet || !appointmentReason) {
      alert('Please select a pet and appointment reason')
      return
    }

    const pet = pets.find(p => p.id === selectedPet)

    const appointmentData = {
      petId: selectedPet,
      petName: pet?.name || 'Unknown Pet',
      reason: appointmentReason,
      userLocation: userLocation
    }

    onStartBooking(appointmentData)
  }


  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 6,
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        }}
      >
        Book Your Pet&apos;s Appointment
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              border: `2px solid ${theme.palette.primary.secondary}`,
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PetsIcon
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.secondary,
                  mr: 2
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Select Your Pet
              </Typography>
            </Box>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Choose Pet</InputLabel>
              <Select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                label="Choose Pet"
              >
                {pets.map((pet) => (
                  <MenuItem key={pet.id} value={pet.id}>
                    {pet.name} - {pet.species} ({pet.breed})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedPet && (
              <Box sx={{ p: 2, bgcolor: theme.palette.background.default, borderRadius: 2 }}>
                {(() => {
                  const pet = pets.find(p => p.id === selectedPet)
                  return pet ? (
                    <>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {pet.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pet.species} • {pet.breed} • {pet.age}
                      </Typography>
                    </>
                  ) : null
                })()}
              </Box>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              border: `2px solid ${theme.palette.primary.secondary}`,
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <MedicalServicesIcon
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.secondary,
                  mr: 2
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Appointment Reason
              </Typography>
            </Box>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Reason for Visit</InputLabel>
              <Select
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
                label="Reason for Visit"
              >
                {appointmentReasons.map((reason) => (
                  <MenuItem key={reason} value={reason}>
                    {reason}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {appointmentReason && (
              <Box sx={{ p: 2, bgcolor: theme.palette.background.default, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  We&apos;ll help you find the best veterinarian for: <strong>{appointmentReason}</strong>
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              p: 3,
              border: `2px solid ${theme.palette.primary.secondary}`,
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.secondary,
                  mr: 2
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Location-Based Suggestions
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We&apos;ll suggest veterinarians based on your location and your pet&apos;s condition to ensure you get the best care.
            </Typography>
            
            {userLocation ? (
              <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                ✓ Location detected: We&apos;ll find vets near you
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
                Location not available: We&apos;ll show all available veterinarians
              </Typography>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartBooking}
              disabled={!selectedPet || !appointmentReason}
              sx={{
                bgcolor: theme.palette.primary.main,
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 3,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                },
                '&:disabled': {
                  bgcolor: theme.palette.text.textSub,
                  color: 'white'
                }
              }}
            >
              Find Veterinarians
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BookAppointment
