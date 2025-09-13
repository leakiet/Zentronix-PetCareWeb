import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { createAdoptionRequestAPI, fetchAdoptionListingsByIdAPI } from '~/apis'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  px: 4,
  minWidth: 320,
  maxWidth: 500,
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
  outline: 'none'
}

const AdoptionModal = ({ open, onClose, onSuccess, listingId, ownerId }) => {
  const [checked, setChecked] = useState({
    economic: false,
    time: false,
    space: false,
    guarantees: false,
    veterinary: false
  })

  const [descriptions, setDescriptions] = useState({
    economic: '',
    time: '',
    space: '',
    guarantees: ''
  })

  const [reason, setReason] = useState('')

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const [listing, setListing] = useState(null)

  const requirements = [
    { key: 'economic', text: 'I have a stable economic situation to care for the pet', label: 'Describe your economic situation' },
    { key: 'time', text: 'I have available time to spend with the pet', label: 'Describe your available time' },
    { key: 'space', text: 'I have enough space for the pet in my home', label: 'Describe your living space' },
    { key: 'guarantees', text: 'I can provide guarantees for the pet\'s care and well-being', label: 'Describe your guarantees' },
    { key: 'veterinary', text: 'Near your area, do you have a veterinary hospital?' }
  ]

  const handleCheckboxChange = (key) => (event) => {
    const isChecked = event.target.checked
    setChecked({ ...checked, [key]: isChecked })
    if (!isChecked && key !== 'veterinary') {
      setDescriptions({ ...descriptions, [key]: '' })
    }
  }

  const handleDescriptionChange = (key) => (event) => {
    setDescriptions({ ...descriptions, [key]: event.target.value })
  }

  const isValid = Object.values(checked).every(value => value) && Object.entries(descriptions).every(([key, desc]) => checked[key] ? desc.trim() !== '' : true) && reason.trim() !== ''

  useEffect(() => {
    if (!open) {
      setChecked({
        economic: false,
        time: false,
        space: false,
        guarantees: false,
        veterinary: false
      })
      setDescriptions({
        economic: '',
        time: '',
        space: '',
        guarantees: ''
      })
      setReason('')
      setListing(null)
    } else if (listingId) {
      fetchAdoptionListingsByIdAPI(listingId).then(setListing).catch(console.error)
    }
  }, [open, listingId])

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  const handleSave = async () => {
    if (isValid && listing) {
      let message = ''
      if (checked.economic) message += 'Economic: ' + descriptions.economic + '\n'
      if (checked.time) message += 'Time: ' + descriptions.time + '\n'
      if (checked.space) message += 'Space: ' + descriptions.space + '\n'
      if (checked.guarantees) message += 'Guarantees: ' + descriptions.guarantees + '\n'
      if (checked.veterinary) message += 'Veterinary: Yes\n'
      message += 'Reason: ' + reason

      let distance = 'Unknown'
      if (navigator.geolocation && listing.shelter?.address?.latitude && listing.shelter?.address?.longitude) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          const shelterLat = parseFloat(listing.shelter.address.latitude)
          const shelterLng = parseFloat(listing.shelter.address.longitude)
          const dist = getDistance(userLat, userLng, shelterLat, shelterLng)
          distance = dist.toFixed(2) + ' km'
        } catch (err) {
          console.error('Error getting location', err)
        }
      }

      const data = { ownerId, adoptionListingId: listingId, message, distance }
      try {
        await createAdoptionRequestAPI(data)
        setSnackbar({ open: true, message: 'Adoption request submitted successfully!', severity: 'success' })
        onClose()
        if (onSuccess) onSuccess()
      } catch {
        setSnackbar({ open: true, message: 'Failed to submit adoption request', severity: 'error' })
      }
    }
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Box sx={{ position: 'sticky', top: 2, bgcolor: 'background.paper', zIndex: 1, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderColor: 'divider', py: 1 }}>
            <Typography variant='h6' fontWeight={700} sx={{ flex: 1, textAlign: 'center' }}>
              Adoption Request
            </Typography>
            <IconButton
              aria-label='close'
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant='body2' sx={{ mb: 2 }}>
            Please confirm and describe the following requirements for adopting this pet:
          </Typography>
          <FormGroup>
            {requirements.map((req) => (
              <Box key={req.key} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked[req.key]}
                      onChange={handleCheckboxChange(req.key)}
                      color="primary"
                    />
                  }
                  label={req.text}
                />
                {checked[req.key] && req.label && (
                  <TextField
                    label={req.label}
                    value={descriptions[req.key]}
                    onChange={handleDescriptionChange(req.key)}
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            ))}
          </FormGroup>
          <TextField
            label='Why did you choose this pet?'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2, mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant='contained' onClick={handleSave} disabled={!isValid} sx={{
              minWidth: 140,
              borderRadius: 5,
              bgcolor: (theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: (theme) => theme.palette.primary.dark
              }
            }}>
              Submit Request
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 1400 }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdoptionModal
