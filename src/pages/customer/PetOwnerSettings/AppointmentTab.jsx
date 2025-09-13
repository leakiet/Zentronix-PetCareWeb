/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ScheduleIcon from '@mui/icons-material/Schedule'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending'

function AppointmentTab({ pets, appointments, onBookAppointment }) {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
    case 'confirmed':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />
    case 'completed':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />
    case 'cancelled':
      return <CancelIcon sx={{ color: 'error.main' }} />
    case 'pending':
      return <PendingIcon sx={{ color: 'warning.main' }} />
    default:
      return <ScheduleIcon sx={{ color: 'primary.main' }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
    case 'confirmed':
      return 'success'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'error'
    case 'pending':
      return 'warning'
    default:
      return 'primary'
    }
  }

  const handleBookNewAppointment = () => {
    navigate('/schedule')
  }

  const handleSaveAppointment = (data) => {
    onBookAppointment(data)
    setBookingDialogOpen(false)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleBookNewAppointment}
          sx={{ borderRadius: 2 }}
        >
          Book Appointment
        </Button>
      </Box>

      {appointments.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <EventAvailableIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No appointments scheduled
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Schedule health check-ups and veterinary visits for your pets
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleBookNewAppointment}
          >
            Book Your First Appointment
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={appointment.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getStatusIcon(appointment.status)}
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {appointment.serviceType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.petName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Time:</strong> {appointment.appointmentTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Vet:</strong> {appointment.vetName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Clinic:</strong> {appointment.clinicName}
                  </Typography>

                  {appointment.notes && (
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      &ldquo;{appointment.notes}&rdquo;
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Book Appointment Dialog */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(handleSaveAppointment)}>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Pet</InputLabel>
                  <Controller
                    name="petId"
                    control={control}
                    rules={{ required: 'Please select a pet' }}
                    render={({ field }) => (
                      <Select {...field} label="Select Pet">
                        {pets.map((pet) => (
                          <MenuItem key={pet.id} value={pet.id}>
                            {pet.name} ({pet.species})
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Service Type</InputLabel>
                  <Controller
                    name="serviceType"
                    control={control}
                    rules={{ required: 'Please select a service type' }}
                    render={({ field }) => (
                      <Select {...field} label="Service Type">
                        <MenuItem value="Annual Checkup">Annual Checkup</MenuItem>
                        <MenuItem value="Vaccination">Vaccination</MenuItem>
                        <MenuItem value="Dental Cleaning">Dental Cleaning</MenuItem>
                        <MenuItem value="Surgery Consultation">Surgery Consultation</MenuItem>
                        <MenuItem value="Emergency Care">Emergency Care</MenuItem>
                        <MenuItem value="Grooming">Grooming</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Appointment Date"
                  type="date"
                  {...register('appointmentDate', { required: 'Appointment date is required' })}
                  error={!!errors.appointmentDate}
                  helperText={errors.appointmentDate?.message}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Preferred Time"
                  type="time"
                  {...register('appointmentTime', { required: 'Preferred time is required' })}
                  error={!!errors.appointmentTime}
                  helperText={errors.appointmentTime?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Clinic Name"
                  {...register('clinicName', { required: 'Clinic name is required' })}
                  error={!!errors.clinicName}
                  helperText={errors.clinicName?.message}
                  placeholder="Enter the veterinary clinic name"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Preferred Veterinarian (Optional)"
                  {...register('vetName')}
                  placeholder="Dr. Smith, Dr. Johnson, etc."
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  multiline
                  rows={3}
                  {...register('notes')}
                  placeholder="Any specific concerns, symptoms, or special instructions..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Book Appointment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default AppointmentTab
