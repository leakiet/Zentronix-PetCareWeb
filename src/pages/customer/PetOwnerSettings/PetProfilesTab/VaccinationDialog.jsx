import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { toast } from 'react-toastify'
import { green, orange, red, blue } from '@mui/material/colors'

function VaccinationDialog({
  open,
  onClose,
  selectedPet,
  vaccinations,
  onSave,
  onDelete
}) {
  const [selectedVaccination, setSelectedVaccination] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [vaccineType, setVaccineType] = useState('')
  const [vaccineName, setVaccineName] = useState('')
  const [vaccinationDate, setVaccinationDate] = useState('')
  const [nextDueDate, setNextDueDate] = useState('')
  const [vaccinationNotes, setVaccinationNotes] = useState('')
  const [vaccinationVetName, setVaccinationVetName] = useState('')
  const [reminderEnabled, setReminderEnabled] = useState(true)

  // Auto-fill vaccine name when vaccine type changes
  useEffect(() => {
    if (vaccineType && vaccineType !== 'OTHER' && !selectedVaccination) {
      switch (vaccineType) {
      case 'RABIES':
        setVaccineName('Rabies Vaccine')
        break
      case 'DHPP':
        setVaccineName('DHPP Vaccine (5-in-1)')
        break
      case 'FVRCP':
        setVaccineName('FVRCP Vaccine (7-in-1)')
        break
      default:
        setVaccineName('')
      }
    } else if (vaccineType === 'OTHER' && !selectedVaccination) {
      setVaccineName('')
    }
  }, [vaccineType, selectedVaccination])

  const getStatusColor = (status) => {
    switch (status) {
    case 'COMPLETED':
      return green[500]
    case 'DUE_SOON':
      return orange[500]
    case 'OVERDUE':
      return red[500]
    default:
      return blue[500]
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
    case 'COMPLETED':
      return 'Completed'
    case 'DUE_SOON':
      return 'Due Soon'
    case 'OVERDUE':
      return 'Overdue'
    default:
      return 'Scheduled'
    }
  }

  const calculateProgress = (vaccination) => {
    const today = new Date()
    const vaccinationDate = new Date(vaccination.visitDate)
    const nextDueDate = new Date(vaccination.nextDueDate)

    // Handle invalid dates
    if (isNaN(vaccinationDate.getTime()) || isNaN(nextDueDate.getTime())) {
      return 0
    }

    if (vaccination.status === 'COMPLETED') return 100

    const totalDays = Math.ceil((nextDueDate - vaccinationDate) / (1000 * 60 * 60 * 24))

    // Handle case where totalDays is 0 or negative
    if (totalDays <= 0) return 100

    const daysPassed = Math.ceil((today - vaccinationDate) / (1000 * 60 * 60 * 24))

    // Ensure we don't get negative progress
    const progress = Math.max(0, (daysPassed / totalDays) * 100)

    return Math.min(progress, 100)
  }

  const handleEditVaccination = (vaccination) => {
    setSelectedVaccination(vaccination)
    setVaccineType(vaccination.vaccineType || '')
    setVaccineName(vaccination.vaccineName || '')
    setVaccinationDate(vaccination.visitDate ? new Date(vaccination.visitDate).toISOString().split('T')[0] : '')
    setNextDueDate(vaccination.nextDueDate ? new Date(vaccination.nextDueDate).toISOString().split('T')[0] : '')
    setVaccinationVetName(vaccination.vetName || '')
    setVaccinationNotes(vaccination.notes || '')
    setReminderEnabled(vaccination.reminderEnabled || true)
    setShowForm(true)
  }

  const handleCreateNew = () => {
    resetForm()
    setShowForm(true)
  }

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!vaccineType || !vaccinationDate || !nextDueDate) {
        toast.error('Please fill in all required fields.')
        return
      }

      if (vaccineType === 'OTHER' && !vaccineName.trim()) {
        toast.error('Please enter vaccine name when selecting "Other".')
        return
      }

      // Auto-fill vaccine name for standard types
      let finalVaccineName = vaccineName
      if (vaccineType !== 'OTHER') {
        switch (vaccineType) {
        case 'RABIES':
          finalVaccineName = 'Rabies Vaccine'
          break
        case 'DHPP':
          finalVaccineName = 'DHPP Vaccine (5-in-1)'
          break
        case 'FVRCP':
          finalVaccineName = 'FVRCP Vaccine (7-in-1)'
          break
        default:
          finalVaccineName = vaccineName
        }
      }

      const vaccinationData = {
        petId: selectedPet?.id,
        vaccineType,
        vaccineName: finalVaccineName,
        vaccinationDate,
        nextDueDate,
        vetName: vaccinationVetName,
        notes: vaccinationNotes,
        reminderEnabled
      }

      await onSave(vaccinationData, selectedVaccination)

      // Reset form
      setShowForm(false)
      resetForm()
    } catch {
      toast.error(selectedVaccination ? 'Failed to update vaccination. Please try again.' : 'Failed to create vaccination. Please try again.')
    }
  }

  const resetForm = () => {
    setSelectedVaccination(null)
    setVaccineType('')
    setVaccineName('')
    setVaccinationDate('')
    setNextDueDate('')
    setVaccinationNotes('')
    setVaccinationVetName('')
    setReminderEnabled(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    resetForm()
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose()
        resetForm()
        setShowForm(false)
      }}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Vaccination Records for {selectedPet?.petName}
        </Typography>
        {!showForm && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            size="small"
          >
            Add Vaccination
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        {/* Existing Vaccination Records */}
        {vaccinations.length > 0 && !showForm && (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Vaccination History & Schedule</Typography>
            <Grid container spacing={3}>
              {vaccinations.map((vaccination) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={vaccination.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {vaccination.vaccineName || vaccination.vaccineType}
                          </Typography>
                          <Chip
                            label={getStatusLabel(vaccination.status)}
                            sx={{
                              backgroundColor: getStatusColor(vaccination.status),
                              color: 'white',
                              mb: 1
                            }}
                            size="small"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditVaccination(vaccination)}
                            sx={{ color: 'primary.main' }}
                            title="Edit Vaccination"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onDelete(vaccination.id)}
                            sx={{ color: 'error.main' }}
                            title="Delete Vaccination"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Last Vaccination:</strong> {vaccination.visitDate ? new Date(vaccination.visitDate).toLocaleDateString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          <strong>Next Due:</strong> {vaccination.nextDueDate ? new Date(vaccination.nextDueDate).toLocaleDateString() : 'N/A'}
                        </Typography>
                        {vaccination.vetName && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Veterinarian:</strong> {vaccination.vetName}
                          </Typography>
                        )}
                        {vaccination.daysUntilDue !== undefined && (
                          <Typography variant="body2" sx={{
                            color: vaccination.status === 'OVERDUE' ? 'error.main' :
                              vaccination.status === 'DUE_SOON' ? 'warning.main' : 'success.main',
                            mb: 1
                          }}>
                            <strong>Days until due:</strong> {vaccination.daysUntilDue}
                          </Typography>
                        )}
                      </Box>

                      {/* Progress Bar */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Vaccination Progress</Typography>
                          <Typography variant="body2">
                            {isNaN(calculateProgress(vaccination)) ? 'N/A' : `${Math.round(calculateProgress(vaccination))}%`}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={isNaN(calculateProgress(vaccination)) ? 0 : calculateProgress(vaccination)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'grey.300',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              backgroundColor: vaccination.status === 'OVERDUE' ? red[500] :
                                vaccination.status === 'DUE_SOON' ? orange[500] : green[500]
                            }
                          }}
                        />
                      </Box>

                      {vaccination.notes && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Notes:</strong> {vaccination.notes}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Empty State */}
        {vaccinations.length === 0 && !showForm && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No vaccination records found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Keep your pet healthy by maintaining vaccination records
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateNew}
            >
              Add First Vaccination
            </Button>
          </Box>
        )}

        {/* Add/Edit Vaccination Form */}
        {showForm && (
          <>
            {vaccinations.length > 0 && <Divider sx={{ my: 3 }} />}
            <Box>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {selectedVaccination ? 'Edit Vaccination Record' : 'Add New Vaccination Record'}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Vaccine Type *</InputLabel>
                    <Select
                      value={vaccineType}
                      onChange={(e) => setVaccineType(e.target.value)}
                      label="Vaccine Type *"
                      required
                    >
                      <MenuItem value="RABIES">Rabies</MenuItem>
                      <MenuItem value="DHPP">DHPP (5-in-1)</MenuItem>
                      <MenuItem value="FVRCP">FVRCP (7-in-1)</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Vaccine Name"
                    value={vaccineName}
                    onChange={(e) => setVaccineName(e.target.value)}
                    placeholder={vaccineType === 'OTHER' ? 'Enter other vaccine name...' : 'Vaccine name will be auto-filled'}
                    required={vaccineType === 'OTHER'}
                    disabled={vaccineType !== 'OTHER'}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Vaccination Date *"
                    type="date"
                    value={vaccinationDate}
                    onChange={(e) => setVaccinationDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Next Due Date *"
                    type="date"
                    value={nextDueDate}
                    onChange={(e) => setNextDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Veterinarian Name"
                    value={vaccinationVetName}
                    onChange={(e) => setVaccinationVetName(e.target.value)}
                    placeholder="Dr. Smith"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reminderEnabled}
                        onChange={(e) => setReminderEnabled(e.target.checked)}
                      />
                    }
                    label="Enable reminder notifications"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={vaccinationNotes}
                    onChange={(e) => setVaccinationNotes(e.target.value)}
                    placeholder="Additional notes about the vaccination, side effects, or special instructions..."
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          onClose()
          resetForm()
          setShowForm(false)
        }}>Close</Button>
        {showForm && (
          <>
            <Button onClick={handleCancelForm}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!vaccineType || !vaccinationDate || !nextDueDate || (vaccineType === 'OTHER' && !vaccineName.trim())}
            >
              {selectedVaccination ? 'Update Vaccination' : 'Save Vaccination'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default VaccinationDialog
