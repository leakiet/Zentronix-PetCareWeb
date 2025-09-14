import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Avatar,
  CircularProgress
} from '@mui/material'
import {
  LocalHospital as LocalHospitalIcon,
  Event as EventIcon,
  History as HistoryIcon,
  Schedule as ScheduleIcon,
  Pets as PetsIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  Phone as PhoneIcon
} from '@mui/icons-material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import {
  getUpcomingAppointmentsByVetIdAPI,
  getAppointmentsByVetIdAPI,
  updateAppointmentStatusAPI,
  createHealthRecordAPI,
  fetchHealthRecordsByPetIdAPI,
  rescheduleAppointmentAPI
} from '~/apis'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import ProfileNavBar from '~/components/ProfileNavBar/ProfileNavBar'

const VetManageLayout = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [appointments, setAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [healthRecords, setHealthRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [healthRecordDialog, setHealthRecordDialog] = useState(false)
  const [rescheduleDialog, setRescheduleDialog] = useState(false)
  const [newAppointmentTime, setNewAppointmentTime] = useState(dayjs())
  const [healthRecordData, setHealthRecordData] = useState({
    diagnosis: '',
    treatment: '',
    notes: ''
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const currentUser = useSelector(selectCurrentCustomer)
  const userState = useSelector(state => state?.user || {})

  useEffect(() => {
    if (currentUser?.id) {
      fetchVetData()
    }
  }, [currentUser])

  const fetchVetData = async () => {
    if (!currentUser?.id) {
      return
    }

    setLoading(true)

    try {
      const [appointmentsRes, upcomingRes] = await Promise.all([
        getAppointmentsByVetIdAPI(currentUser.id),
        getUpcomingAppointmentsByVetIdAPI(currentUser.id)
      ])

      setAppointments(appointmentsRes || [])
      setUpcomingAppointments(upcomingRes || [])

      const allPetIds = [...new Set([
        ...appointmentsRes.map(app => app.pet?.id),
        ...upcomingRes.map(app => app.pet?.id)
      ].filter(id => id))]

      if (allPetIds.length > 0) {
        const healthRecordsPromises = allPetIds.map(petId => fetchHealthRecordsByPetIdAPI(petId))
        const healthRecordsResults = await Promise.all(healthRecordsPromises)
        const allHealthRecords = healthRecordsResults.flat()
        setHealthRecords(allHealthRecords || [])
      } else {
        setHealthRecords([])
      }
    } catch (error) {
      showSnackbar('Error loading data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleRefresh = () => {
    if (currentUser?.id) {
      fetchVetData()
    } else {
      showSnackbar('User not authenticated', 'error')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'primary'
      case 'COMPLETED': return 'success'
      case 'CANCELED': return 'error'
      case 'NO_SHOW': return 'error'
      case 'IN_PROGRESS': return 'warning'
      default: return 'default'
    }
  }

  const handleStatusUpdate = async (appointment, status) => {
    if (!currentUser?.id) {
      showSnackbar('User not authenticated', 'error')
      return
    }

    if (status === 'COMPLETED') {
      setSelectedAppointment(appointment)
      setHealthRecordDialog(true)
      return
    }

    try {
      await updateAppointmentStatusAPI(appointment.id, status)
      showSnackbar(`Appointment ${status.toLowerCase()} successfully`)
      fetchVetData()
    } catch (error) {
      showSnackbar('Error updating appointment status', 'error')
    }
  }

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !newAppointmentTime) {
      showSnackbar('Please select a new appointment time', 'error')
      return
    }

    try {
      const rescheduleData = {
        appointmentTime: newAppointmentTime.format('YYYY-MM-DDTHH:mm:ss')
      }

      await rescheduleAppointmentAPI(selectedAppointment.id, rescheduleData)
      showSnackbar('Appointment rescheduled successfully')
      setRescheduleDialog(false)
      setSelectedAppointment(null)
      fetchVetData()
    } catch (error) {
      showSnackbar('Error rescheduling appointment', 'error')
    }
  }

  const handleOpenReschedule = (appointment) => {
    setSelectedAppointment(appointment)
    setNewAppointmentTime(dayjs(appointment.appointmentTime))
    setRescheduleDialog(true)
  }

  const handleCreateHealthRecord = async () => {
    if (!selectedAppointment || !currentUser?.id) {
      return
    }

    try {
      // Tạo health record trước
      const data = {
        petId: selectedAppointment.pet.id,
        vetId: currentUser.id,
        recordType: 'CHECKUP',
        title: `Health Record for Appointment #${selectedAppointment.id}`,
        visitDate: dayjs().format('YYYY-MM-DD'),
        diagnosis: healthRecordData.diagnosis,
        treatment: healthRecordData.treatment,
        notes: healthRecordData.notes,
        vetName: currentUser.fullName || currentUser.email
      }

      await createHealthRecordAPI(data)
      showSnackbar('Health record created successfully')

      // Sau đó complete appointment
      await updateAppointmentStatusAPI(selectedAppointment.id, 'COMPLETED')
      showSnackbar('Appointment completed successfully')

      // Reset dialog
      setHealthRecordDialog(false)
      setSelectedAppointment(null)
      setHealthRecordData({ diagnosis: '', treatment: '', notes: '' })
      fetchVetData()
    } catch (error) {
      showSnackbar('Error creating health record', 'error')
    }
  }

  const formatDateTime = (dateTime) => {
    return dayjs(dateTime).format('MMM DD, YYYY HH:mm')
  }

  // Show loading if user data is not available yet
  if (!currentUser) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading veterinary dashboard...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            If this takes too long, please check your authentication status.
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <ProfileNavBar />
        <Box sx={{ pt: { xs: 2, sm: 3, md: 4 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LocalHospitalIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Veterinary Management Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage appointments and health records for your patients
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>

          {/* Loading overlay */}
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
                <Typography variant="h6">Loading data...</Typography>
              </Box>
            </Box>
          )}

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="vet management tabs">
              <Tab icon={<EventIcon />} label={`Upcoming (${upcomingAppointments.length})`} />
              <Tab icon={<HistoryIcon />} label={`All Appointments (${appointments.length})`} />
              <Tab icon={<LocalHospitalIcon />} label={`Health Records (${healthRecords.length})`} />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Appointments ({upcomingAppointments.length})
                </Typography>
              </Grid>

              {upcomingAppointments.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                      <ScheduleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No upcoming appointments
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Appointments will appear here when scheduled.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={appointment.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" component="div">
                            Appointment #{appointment.id}
                          </Typography>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status)}
                            size="small"
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PetsIcon fontSize="small" />
                          <Typography variant="body2">
                            {appointment.pet?.name} ({appointment.pet?.species})
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PhoneIcon fontSize="small" />
                          <Typography variant="body2">
                            {appointment.owner?.phone ? appointment.owner?.phone : 'unknown'}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PersonIcon fontSize="small" />
                          <Typography variant="body2">
                            {appointment.owner?.fullName}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <EventIcon fontSize="small" />
                          <Typography variant="body2">
                            {formatDateTime(appointment.appointmentTime)}
                          </Typography>
                        </Box>

                        {appointment.reason && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Reason: {appointment.reason}
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleStatusUpdate(appointment, 'COMPLETED')}
                            disabled={appointment.status === 'COMPLETED' || appointment.status === 'CANCELED'}
                          >
                            Complete
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenReschedule(appointment)}
                            disabled={appointment.status === 'COMPLETED' || appointment.status === 'CANCELED'}
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleStatusUpdate(appointment, 'CANCELED')}
                            disabled={appointment.status === 'COMPLETED' || appointment.status === 'CANCELED'}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  All Appointments ({appointments.length})
                </Typography>
              </Grid>

              {appointments.map((appointment) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={appointment.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="div">
                          Appointment #{appointment.id}
                        </Typography>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PetsIcon fontSize="small" />
                        <Typography variant="body2">
                          {appointment.pet?.name} ({appointment.pet?.species})
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PersonIcon fontSize="small" />
                        <Typography variant="body2">
                          {appointment.owner?.fullName}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <EventIcon fontSize="small" />
                        <Typography variant="body2">
                          {formatDateTime(appointment.appointmentTime)}
                        </Typography>
                      </Box>

                      {appointment.reason && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Reason: {appointment.reason}
                        </Typography>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {appointment.status === 'SCHEDULED' && (
                          <>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleStatusUpdate(appointment, 'COMPLETED')}
                            >
                              Complete
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => handleOpenReschedule(appointment)}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleStatusUpdate(appointment, 'CANCELLED')}  // Sửa từ CANCELED
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'COMPLETED' && (
                          <Chip label="Completed" color="success" size="small" />
                        )}
                        {appointment.status === 'CANCELLED' && (  // Sửa từ CANCELED
                          <Chip label="Cancelled" color="error" size="small" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Health Records ({healthRecords.length})
                </Typography>
              </Grid>

              {healthRecords.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                      <LocalHospitalIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No health records found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Health records will appear here after appointments are completed.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ) : (
                healthRecords.map((record) => (
                  <Grid size={{ xs: 12, md: 6, lg: 4 }} key={record.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                          Health Record #{record.id}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PetsIcon fontSize="small" />
                          <Typography variant="body2">
                            {record.pet?.name} ({record.pet?.species})
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <PersonIcon fontSize="small" />
                          <Typography variant="body2">
                            {record.vetName}
                          </Typography>
                        </Box>

                        {record.diagnosis && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="primary">
                              Diagnosis:
                            </Typography>
                            <Typography variant="body2">
                              {record.diagnosis}
                            </Typography>
                          </Box>
                        )}

                        {record.treatment && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="primary">
                              Treatment:
                            </Typography>
                            <Typography variant="body2">
                              {record.treatment}
                            </Typography>
                          </Box>
                        )}

                        {record.notes && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="primary">
                              Notes:
                            </Typography>
                            <Typography variant="body2">
                              {record.notes}
                            </Typography>
                          </Box>
                        )}

                        {record.visitDate && (
                          <Typography variant="body2" color="text.secondary">
                            Visit Date: {dayjs(record.visitDate).format('MMM DD, YYYY')}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {/* Reschedule Dialog */}
          <Dialog
            open={rescheduleDialog}
            onClose={() => setRescheduleDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Reschedule Appointment #{selectedAppointment?.id}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Current time: {selectedAppointment && formatDateTime(selectedAppointment.appointmentTime)}
                </Typography>
                <DateTimePicker
                  label="New Appointment Time"
                  value={newAppointmentTime}
                  onChange={setNewAppointmentTime}
                  minDateTime={dayjs()}
                  sx={{ width: '100%' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRescheduleDialog(false)}>Cancel</Button>
              <Button
                onClick={handleRescheduleAppointment}
                variant="contained"
                disabled={!newAppointmentTime || newAppointmentTime.isBefore(dayjs())}
              >
                Reschedule
              </Button>
            </DialogActions>
          </Dialog>

          {/* Health Record Dialog */}
          <Dialog
            open={healthRecordDialog}
            onClose={() => setHealthRecordDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              Complete Appointment & Create Health Record #{selectedAppointment?.id}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                {selectedAppointment && (
                  <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Appointment Details:
                    </Typography>
                    <Typography variant="body2">
                      Pet: {selectedAppointment.pet?.name} ({selectedAppointment.pet?.species})
                    </Typography>
                    <Typography variant="body2">
                      Owner: {selectedAppointment.owner?.fullName}
                    </Typography>
                    <Typography variant="body2">
                      Time: {formatDateTime(selectedAppointment.appointmentTime)}
                    </Typography>
                    {selectedAppointment.reason && (
                      <Typography variant="body2">
                        Reason: {selectedAppointment.reason}
                      </Typography>
                    )}
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Diagnosis *"
                    multiline
                    rows={3}
                    value={healthRecordData.diagnosis}
                    onChange={(e) => setHealthRecordData(prev => ({ ...prev, diagnosis: e.target.value }))}
                    placeholder="Enter diagnosis..."
                    required
                  />
                  <TextField
                    fullWidth
                    label="Treatment *"
                    multiline
                    rows={3}
                    value={healthRecordData.treatment}
                    onChange={(e) => setHealthRecordData(prev => ({ ...prev, treatment: e.target.value }))}
                    placeholder="Enter treatment plan..."
                    required
                  />
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={4}
                    value={healthRecordData.notes}
                    onChange={(e) => setHealthRecordData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes..."
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                setHealthRecordDialog(false)
                setSelectedAppointment(null)
                setHealthRecordData({ diagnosis: '', treatment: '', notes: '' })
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateHealthRecord}
                variant="contained"
                disabled={!healthRecordData.diagnosis.trim() || !healthRecordData.treatment.trim()}
              >
                Complete Appointment
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
      </Container>
    </LocalizationProvider>
  )
}

export default VetManageLayout
