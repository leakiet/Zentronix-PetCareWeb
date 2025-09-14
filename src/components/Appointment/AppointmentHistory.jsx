import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Divider
} from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  RateReview as RateReviewIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { getAppointmentsByOwnerIdAPI } from '~/apis'
import { checkIfRated } from '~/apis/ratingApi'
import RatingModal from '~/components/Rating/RatingModal'
import StarRating from '~/components/Rating/StarRating'

const AppointmentHistory = ({ ownerId }) => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [ratingModal, setRatingModal] = useState({ open: false, appointment: null })
  const [ratedAppointments, setRatedAppointments] = useState(new Set())

  useEffect(() => {
    if (ownerId) {
      fetchAppointments()
    }
  }, [ownerId])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const data = await getAppointmentsByOwnerIdAPI(ownerId)
      setAppointments(data || [])
      
      // Check which appointments are already rated
      const completedAppointments = data.filter(app => app.status === 'COMPLETED')
      const ratedChecks = await Promise.all(
        completedAppointments.map(app => 
          checkIfRated(app.id).then(rated => ({ id: app.id, rated }))
        )
      )
      
      const ratedSet = new Set()
      ratedChecks.forEach(({ id, rated }) => {
        if (rated) ratedSet.add(id)
      })
      setRatedAppointments(ratedSet)
      
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success'
      case 'SCHEDULED': return 'info'
      case 'CANCELLED': return 'error'
      default: return 'default'
    }
  }

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRateAppointment = (appointment) => {
    setRatingModal({ open: true, appointment })
  }

  const handleRatingSubmitted = () => {
    // Refresh appointments and rated status
    fetchAppointments()
    setRatingModal({ open: false, appointment: null })
  }

  if (loading) {
    return <Typography>Loading appointment history...</Typography>
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <CalendarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No appointments yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Book your first appointment to get started.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Appointment History ({appointments.length})
      </Typography>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="div">
                    Appointment #{appointment.id}
                  </Typography>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="body2">
                    Dr. {appointment.vet?.fullName}
                  </Typography>
                  <Button
                    size="small"
                    component={Link}
                    to={`/vet/${appointment.vet?.id}`}
                    sx={{ ml: 'auto', minWidth: 'auto', p: 0.5 }}
                  >
                    <StarIcon fontSize="small" />
                  </Button>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <CalendarIcon fontSize="small" />
                  <Typography variant="body2">
                    {formatDateTime(appointment.appointmentTime)}
                  </Typography>
                </Box>

                {appointment.pet && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {appointment.pet.petName?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {appointment.pet.petName}
                    </Typography>
                  </Box>
                )}

                {appointment.reason && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Reason: {appointment.reason}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Rating Section */}
                {appointment.status === 'COMPLETED' && (
                  <Box>
                    {ratedAppointments.has(appointment.id) ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                          You rated this visit
                        </Typography>
                        <StarRating rating={5} readonly size="small" />
                      </Box>
                    ) : (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<RateReviewIcon />}
                        onClick={() => handleRateAppointment(appointment)}
                        size="small"
                      >
                        Rate Your Visit
                      </Button>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Rating Modal */}
      <RatingModal
        open={ratingModal.open}
        onClose={() => setRatingModal({ open: false, appointment: null })}
        appointment={ratingModal.appointment}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </Box>
  )
}

export default AppointmentHistory
