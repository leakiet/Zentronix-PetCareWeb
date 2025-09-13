import {
  Box, Typography, Button, Card, Grid, TextField,
  FormControl, InputLabel, Select, MenuItem, Avatar, Chip, Divider
} from '@mui/material'
import { useState } from 'react'
import theme from '~/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const AppointmentForm = ({ selectedVet, onBack, onSubmit, initialData }) => {
  // ✅ Nếu không có selectedVet thì mock 1 vet mặc định
  const mockVet = {
    id: 99,
    firstName: 'Mock',
    lastName: 'Doctor',
    specialization: 'General Practice',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 4.7,
    reviewCount: 88,
    location: 'Mock Vet Clinic',
    distance: '3 km',
    price: '$50-100',
    specialties: ['Vaccination', 'Dentistry']
  }

  const vet = selectedVet || mockVet

  const [formData, setFormData] = useState({
    preferredDate: initialData?.preferredDate || null,
    preferredTime: initialData?.preferredTime || '',
    notes: initialData?.notes || '',
    urgency: initialData?.urgency || 'normal',
    contactMethod: initialData?.contactMethod || 'phone'
  })

  const [errors, setErrors] = useState({})

  const urgencyLevels = [
    { value: 'low', label: 'Low - Routine checkup' },
    { value: 'normal', label: 'Normal - Regular appointment' },
    { value: 'high', label: 'High - Urgent but not emergency' },
    { value: 'emergency', label: 'Emergency - Immediate attention needed' }
  ]

  const contactMethods = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS/Text' }
  ]

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00',
    '10:30', '11:00', '11:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date'
    }
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time'
    }
    if (formData.urgency === 'emergency' && !formData.notes.trim()) {
      newErrors.notes = 'Please provide details for emergency appointments'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    const appointmentData = {
      ...formData,
      vetId: vet.id,
      vetName: `${vet.firstName} ${vet.lastName}`,
      vetSpecialization: vet.specialization,
      vetLocation: vet.location,
      vetPrice: vet.price,
      vetRating: vet.rating
    }
    console.log('✅ Appointment Confirmed:', appointmentData)
    if (onSubmit) onSubmit(appointmentData)
    alert('Appointment Confirmed (check console)')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ color: theme.palette.primary.main, mr: 2 }}
          >
            Back to Vets
          </Button>
          <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Book Appointment
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Vet Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, border: `2px solid ${theme.palette.primary.secondary}`, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Selected Veterinarian
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={vet.image} sx={{ width: 60, height: 60, mr: 2 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Dr. {vet.firstName} {vet.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vet.specialization}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">⭐ {vet.rating} ({vet.reviewCount} reviews)</Typography>
              <Typography variant="body2">📍 {vet.location} • {vet.distance}</Typography>
              <Typography variant="body2">💲 {vet.price}</Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {vet.specialties.map((s) => (
                  <Chip key={s} label={s} size="small" variant="outlined" />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, border: `2px solid ${theme.palette.primary.secondary}`, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Appointment Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Preferred Date"
                    value={formData.preferredDate}
                    onChange={(date) => handleInputChange('preferredDate', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.preferredDate,
                        helperText: errors.preferredDate
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.preferredTime}>
                    <InputLabel>Preferred Time</InputLabel>
                    <Select
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    >
                      {timeSlots.map((t) => (
                        <MenuItem key={t} value={t}>{t}</MenuItem>
                      ))}
                    </Select>
                    {errors.preferredTime && (
                      <Typography variant="caption" color="error">{errors.preferredTime}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Urgency</InputLabel>
                    <Select
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                    >
                      {urgencyLevels.map((u) => (
                        <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Contact Method</InputLabel>
                    <Select
                      value={formData.contactMethod}
                      onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                    >
                      {contactMethods.map((m) => (
                        <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Additional Notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    error={!!errors.notes}
                    helperText={errors.notes || 'Optional'}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" size="large" onClick={handleSubmit}>
                  Confirm Appointment
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default AppointmentForm
