import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Snackbar, Alert
} from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Pets as PetsIcon,
  Person as PersonIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  MedicalServices as MedicalIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import {
  fetchAvailableVetsAPI,
  fetPetsByCustomerId,
  createAppointmentAPI,
  getAppointmentsByPetIdAPI,
  searchClinicInfosAPI
} from '~/apis'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'

const ScheduleLayout = () => {
  const formatLocation = (location) => {
    if (!location) return 'Location not available'

    if (typeof location === 'string') {
      return location
    }

    if (typeof location === 'object') {
      const { street, ward, city } = location
      const parts = [street, ward, city].filter(part => part && part.trim())
      return parts.join(', ') || 'Location not available'
    }

    return 'Location not available'
  }

  const getPetImage = (pet) => {
    if (!pet) {
      return 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
    }

    if (pet.image && pet.image.trim() !== '') {
      return pet.image
    }

    const fallbackImages = {
      DOG: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=center',
      CAT: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop&crop=center',
      BIRD: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop&crop=center'
    }

    return fallbackImages[pet.species] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
  }

  const formatDateTime = (dateTime) => {
    return dayjs(dateTime).format('MMM DD, YYYY HH:mm')
  }

  const [activeStep, setActiveStep] = useState(0)
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [availableVets, setAvailableVets] = useState([])
  const [selectedVet, setSelectedVet] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    appointmentTime: dayjs().add(1, 'day').set('hour', 9).set('minute', 0),
    reason: '',
    petCondition: ''
  })
  const [loading, setLoading] = useState(false)
  const [bookingDialog, setBookingDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const currentUser = useSelector(selectCurrentCustomer)


  useEffect(() => {
    if (currentUser?.id) {
      fetchUserPets()
    }
  }, [currentUser])

  useEffect(() => {
    if (selectedPet && appointmentData.petCondition) {
      fetchAvailableVets()
    }
  }, [selectedPet, appointmentData.petCondition])
  const fetchUserPets = async () => {
    if (!currentUser?.id) return

    try {
      setLoading(true)
      const petsData = await fetPetsByCustomerId(currentUser.id)
      setPets(petsData || [])
    } catch (error) {
      showSnackbar('Error loading pets', 'error')
    } finally {
      setLoading(false)
    }
  }


  const mapPetConditionToSpecialization = (petCondition) => {
    const mapping = {
      'General Checkup': 'GENERAL_CHECKUP',
      'Vaccination': 'VACCINATION',
      'Dental Care': 'DENTAL_CARE',
      'Skin Issues': 'SKIN_ISSUES',
      'Digestive Problems': 'DIGESTIVE_PROBLEMS',
      'Injury/Trauma': 'INJURY_TRAUMA',
      'Behavioral Issues': 'BEHAVIORAL_ISSUES',
      'Senior Pet Care': 'SENIOR_PET_CARE',
      'Emergency Care': 'EMERGENCY_CARE',
      'Other': 'OTHERS'
    }
    return mapping[petCondition] || 'GENERAL_CHECKUP'
  }

  const fetchAvailableVets = async () => {
    if (!selectedPet || !appointmentData.petCondition) return

    try {
      setLoading(true)

      const specialization = mapPetConditionToSpecialization(appointmentData.petCondition)
      const location = formatLocation(currentUser?.location || currentUser?.address)

      const clinics = await searchClinicInfosAPI({
        specialization: specialization,
        location: location
      })

      const vets = clinics.flatMap(clinic => {
        const veterinarians = clinic.veterinarians

        if (Array.isArray(veterinarians)) {
          return veterinarians.map(vet => ({
            ...vet,
            clinic: {
              ...clinic,
              openingHours: clinic.openingHours
            }
          }))
        } else if (veterinarians && typeof veterinarians === 'object') {
          return [{
            ...veterinarians,
            clinic: {
              ...clinic,
              openingHours: clinic.openingHours
            }
          }]
        } else {
          return []
        }
      }).filter(vet => vet && vet.role === 'VET')

      setAvailableVets(vets || [])
    } catch (error) {
      console.error('Error in fetchAvailableVets:', error)
      showSnackbar('Error loading available vets', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handlePetSelect = (pet) => {
    setSelectedPet(pet)
    setSelectedVet(null)
    setActiveStep(1)
  }

  const handleVetSelect = (vet) => {
    setSelectedVet(vet)
    setActiveStep(2)
  }

  const handleAppointmentSubmit = async () => {
    if (!selectedPet?.id || !selectedVet?.id || !appointmentData.appointmentTime) {
      showSnackbar('Please fill in all required fields', 'error')
      return
    }

    try {
      setLoading(true)
      const appointmentPayload = {
        petId: selectedPet.id,
        vetId: selectedVet.id,
        ownerId: currentUser.id,
        appointmentTime: appointmentData.appointmentTime.format('YYYY-MM-DDTHH:mm:ss'),
        reason: appointmentData.reason,
        status: 'SCHEDULED'
      }

      await createAppointmentAPI(appointmentPayload)
      showSnackbar('Appointment booked successfully!')
      setBookingDialog(false)
      resetForm()
    } catch (error) {
      showSnackbar('Error booking appointment', 'error')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedPet(null)
    setSelectedVet(null)
    setAppointmentData({
      appointmentTime: dayjs().add(1, 'day').set('hour', 9).set('minute', 0),
      reason: '',
      petCondition: '',
    })
    setActiveStep(0)
  }

  const getPetConditionOptions = () => [
    'General Checkup',
    'Vaccination',
    'Dental Care',
    'Skin Issues',
    'Digestive Problems',
    'Injury/Trauma',
    'Behavioral Issues',
    'Senior Pet Care',
    'Emergency Care',
    'Other'
  ]

  if (!currentUser) {
    return (
      <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
        <AppBar />
        <Box sx={{ maxWidth: '1380px', mx: 'auto', px: 2, py: 6, mt: theme.fitbowl.appBarHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Loading scheduling page...
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ maxWidth: '1380px', mx: 'auto', px: 2, py: 6, mt: theme.fitbowl.appBarHeight }}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 300,
            letterSpacing: '0.1em',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Schedule <span style={{ fontWeight: 800, color: theme.palette.primary.secondary }}>APPOINTMENT</span>
        </Typography>
        <Box sx={{ width: '6rem', height: '0.4rem', bgcolor: theme.palette.primary.secondary, mx: 'auto', mb: 8 }} />
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: '48rem', mx: 'auto', mb: 10, fontSize: { xs: '1rem', md: '1.15rem' }, color: theme.palette.text.textSub }}
        >
          Book an appointment with a veterinarian for your pet&apos;s health and wellness
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ mb: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <CalendarIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Schedule Appointment
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Book an appointment with a veterinarian for your pet
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </Button>
            </Box>

            {loading && (
              <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={60} sx={{ mb: 2 }} />
                  <Typography variant="h6">Loading...</Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{
                    p: 2,
                    border: 2,
                    borderColor: activeStep >= 0 ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    bgcolor: activeStep >= 0 ? 'primary.50' : 'grey.50'
                  }}>
                    <Typography variant="h6" color={activeStep >= 0 ? 'primary' : 'text.secondary'}>
                      1. Select Pet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Choose your pet for the appointment
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{
                    p: 2,
                    border: 2,
                    borderColor: activeStep >= 1 ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    bgcolor: activeStep >= 1 ? 'primary.50' : 'grey.50'
                  }}>
                    <Typography variant="h6" color={activeStep >= 1 ? 'primary' : 'text.secondary'}>
                      2. Choose Veterinarian
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Select an available veterinarian
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{
                    p: 2,
                    border: 2,
                    borderColor: activeStep >= 2 ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    bgcolor: activeStep >= 2 ? 'primary.50' : 'grey.50'
                  }}>
                    <Typography variant="h6" color={activeStep >= 2 ? 'primary' : 'text.secondary'}>
                      3. Book Appointment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Confirm your appointment details
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Step 1: Select Pet */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Select Your Pet
                </Typography>

                {pets.length === 0 ? (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                      <PetsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No pets found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Please add a pet to your profile first.
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Grid container spacing={3}>
                    {pets.filter(pet => pet && pet.id).map((pet) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pet.id}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 3
                            },
                            border: selectedPet?.id === pet.id ? 2 : 1,
                            borderColor: selectedPet?.id === pet.id ? 'primary.main' : 'grey.300'
                          }}
                          onClick={() => handlePetSelect(pet)}
                        >
                          <CardContent>
                            {/* Pet Image */}
                            <Box sx={{ mb: 2, position: 'relative' }}>
                              <Box
                                component="img"
                                src={getPetImage(pet)}
                                alt={pet.petName}
                                sx={{
                                  width: '100%',
                                  height: 200,
                                  objectFit: 'cover',
                                  borderRadius: 2,
                                  mb: 2
                                }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
                                }}
                              />
                              {/* Pet Info Overlay */}
                              <Box sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'rgba(0, 0, 0, 0.6)',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.75rem'
                              }}>
                                {pet.species}
                              </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <PetsIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="h6">{pet.petName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {pet.species} • {pet.breed?.name || 'Mixed'}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Chip
                                label={`${pet.age} years old`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                label={pet.gender}
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                              {pet.color && (
                                <Chip
                                  label={pet.color}
                                  size="small"
                                  color="info"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* Step 2: Choose Veterinarian */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Choose a Veterinarian
                </Typography>

                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Appointment Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                          <InputLabel>Pet Condition *</InputLabel>
                          <Select
                            value={appointmentData.petCondition}
                            label="Pet Condition *"
                            onChange={(e) => setAppointmentData(prev => ({ ...prev, petCondition: e.target.value }))}
                          >
                            {getPetConditionOptions().map((condition) => (
                              <MenuItem key={condition} value={condition}>
                                {condition}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                          <LocationIcon color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Your Location</Typography>
                            <Typography variant="body1">
                              {formatLocation(currentUser?.location || currentUser?.address)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Available Veterinarians */}
                {availableVets.length === 0 ? (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                      <MedicalIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No veterinarians available
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Try adjusting your pet condition or location.
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Grid container spacing={3}>
                    {availableVets.map((vet) => (
                      <Grid size={{ xs: 12, md: 6 }} key={vet.id}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 3
                            },
                            border: selectedVet?.id === vet.id ? 2 : 1,
                            borderColor: selectedVet?.id === vet.id ? 'primary.main' : 'grey.300'
                          }}
                          onClick={() => handleVetSelect(vet)}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <PersonIcon />
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{vet.fullName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {vet.clinic?.specialization || 'General Veterinarian'}
                                </Typography>
                              </Box>
                            </Box>

                            {vet.clinic?.clinicName && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <MedicalIcon fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {vet.clinic.clinicName}
                                </Typography>
                              </Box>
                            )}

                            {vet.clinic?.openingHours && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <TimeIcon fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {vet.clinic.openingHours}
                                </Typography>
                              </Box>
                            )}

                            {vet.address && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <LocationIcon fontSize="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {formatLocation(vet.address)}
                                </Typography>
                              </Box>
                            )}

                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Chip
                                label="Available Today"
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                              <Chip
                                label={`Exp: ${vet.experience || '5+'} years`}
                                size="small"
                                color="info"
                                variant="outlined"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* Step 3: Book Appointment */}
            {activeStep === 2 && selectedVet && selectedPet && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Book Your Appointment
                </Typography>

                {/* Appointment Summary */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Appointment Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            component="img"
                            src={getPetImage(selectedPet)}
                            alt={selectedPet?.petName}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 2,
                              objectFit: 'cover',
                              mr: 2
                            }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
                            }}
                          />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Pet</Typography>
                            <Typography variant="body1">{selectedPet?.petName}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <PersonIcon color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Veterinarian</Typography>
                            <Typography variant="body1">{selectedVet?.fullName}</Typography>
                            {selectedVet?.clinic?.clinicName && (
                              <Typography variant="body2" color="text.secondary">
                                {selectedVet.clinic.clinicName}
                              </Typography>
                            )}
                            {selectedVet?.clinic?.openingHours && (
                              <Typography variant="body2" color="text.secondary">
                                Hours: {selectedVet.clinic.openingHours}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <MedicalIcon color="primary" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">Condition</Typography>
                            <Typography variant="body1">{appointmentData.petCondition}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Appointment Form */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Appointment Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <DateTimePicker
                          label="Appointment Date & Time *"
                          value={appointmentData.appointmentTime}
                          onChange={(newValue) => setAppointmentData(prev => ({ ...prev, appointmentTime: newValue }))}
                          minDateTime={dayjs().add(1, 'hour')}
                          maxDateTime={dayjs().add(30, 'day')}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              helperText: 'Select a convenient date and time'
                            }
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label="Reason for Visit"
                          multiline
                          rows={3}
                          value={appointmentData.reason}
                          onChange={(e) => setAppointmentData(prev => ({ ...prev, reason: e.target.value }))}
                          placeholder="Describe your pet's symptoms or reason for visit..."
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => setActiveStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => setBookingDialog(true)}
                        disabled={!appointmentData.appointmentTime}
                      >
                        Book Appointment
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Booking Confirmation Dialog */}
            <Dialog
              open={bookingDialog}
              onClose={() => setBookingDialog(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                Confirm Appointment Booking
              </DialogTitle>
              <DialogContent>
                <Box sx={{ pt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Please review your appointment details:
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          component="img"
                          src={getPetImage(selectedPet)}
                          alt={selectedPet?.petName}
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 2,
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=center'
                          }}
                        />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Pet</Typography>
                          <Typography variant="body1">{selectedPet?.petName} ({selectedPet?.species})</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PersonIcon color="primary" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Veterinarian</Typography>
                          <Typography variant="body1">{selectedVet?.fullName}</Typography>
                          {selectedVet?.clinic?.clinicName && (
                            <Typography variant="body2" color="text.secondary">
                              {selectedVet.clinic.clinicName}
                            </Typography>
                          )}
                          {selectedVet?.clinic?.openingHours && (
                            <Typography variant="body2" color="text.secondary">
                              Hours: {selectedVet.clinic.openingHours}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TimeIcon color="primary" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                          <Typography variant="body1">
                            {formatDateTime(appointmentData.appointmentTime)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <MedicalIcon color="primary" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">Condition</Typography>
                          <Typography variant="body1">{appointmentData.petCondition}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {appointmentData.reason && (
                      <Grid size={{ xs: 12 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Reason</Typography>
                          <Typography variant="body1">{appointmentData.reason}</Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
                <Button
                  onClick={handleAppointmentSubmit}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : 'Confirm Booking'}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
              <Alert
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                severity={snackbar.severity}
                sx={{ width: '100%' }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Box>
        </LocalizationProvider>
      </Box>
      <Footer />
    </Box>
  )
}

export default ScheduleLayout
