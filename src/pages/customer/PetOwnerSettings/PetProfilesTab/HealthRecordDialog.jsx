import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { toast } from 'react-toastify'

function HealthRecordDialog({
  open,
  onClose,
  selectedRecord,
  onSave
}) {
  const [recordTitle, setRecordTitle] = useState('')
  const [recordType, setRecordType] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [treatment, setTreatment] = useState('')
  const [recordNotes, setRecordNotes] = useState('')
  const [recordVetName, setRecordVetName] = useState('')

  useEffect(() => {
    if (selectedRecord) {
      setRecordTitle(selectedRecord.title || '')
      setRecordType(selectedRecord.recordType || selectedRecord.type || '')
      setVisitDate(selectedRecord.visitDate || selectedRecord.recordDate || selectedRecord.date || '')
      setDiagnosis(selectedRecord.diagnosis || '')
      setTreatment(selectedRecord.treatment || '')
      setRecordNotes(selectedRecord.notes || '')
      setRecordVetName(selectedRecord.vetName || '')
    } else {
      setRecordTitle('')
      setRecordType('')
      setVisitDate('')
      setDiagnosis('')
      setTreatment('')
      setRecordNotes('')
      setRecordVetName('')
    }
  }, [selectedRecord])

  const handleSave = async () => {
    try {
      const recordData = {
        title: recordTitle,
        recordType: recordType,
        visitDate: visitDate,
        diagnosis: diagnosis,
        treatment: treatment,
        notes: recordNotes,
        vetName: recordVetName
      }

      await onSave(recordData, selectedRecord)
      onClose()
    } catch {
      toast.error(selectedRecord ? 'Failed to update health record. Please try again.' : 'Failed to create health record. Please try again.')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {selectedRecord ? 'Edit Health Record' : 'Add Health Record'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={{ xs: 3, md: 3 }} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Record Title"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
              required
              placeholder="e.g., Annual Checkup, Vaccination, Surgery"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Record Type</InputLabel>
              <Select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                label="Record Type"
                required
              >
                <MenuItem value="CHECKUP">Checkup</MenuItem>
                <MenuItem value="VACCINATION">Vaccination</MenuItem>
                <MenuItem value="SURGERY">Surgery</MenuItem>
                <MenuItem value="TREATMENT">Treatment</MenuItem>
                <MenuItem value="MEDICATION">Medication</MenuItem>
                <MenuItem value="EMERGENCY">Emergency</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Visit Date"
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Veterinarian Name"
              value={recordVetName}
              onChange={(e) => setRecordVetName(e.target.value)}
              placeholder="Dr. Smith"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Diagnosis"
              multiline
              rows={2}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Medical diagnosis or findings"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Treatment"
              multiline
              rows={2}
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              placeholder="Treatment provided or prescribed"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={recordNotes}
              onChange={(e) => setRecordNotes(e.target.value)}
              placeholder="Additional notes about the visit"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!recordTitle || !recordType || !visitDate}
        >
          {selectedRecord ? 'Update Record' : 'Save Record'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HealthRecordDialog
