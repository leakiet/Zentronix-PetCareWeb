import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import ProfileNavBar from '~/components/ProfileNavBar/ProfileNavBar'

function VetSettings() {
  const currentCustomer = useSelector(selectCurrentCustomer)
  const [formData, setFormData] = useState({
    clinicName: currentCustomer?.clinicName || '',
    licenseNumber: currentCustomer?.licenseNumber || '',
    specialization: currentCustomer?.specialization || '',
    experience: currentCustomer?.experience || '',
    phone: currentCustomer?.phone || '',
    address: currentCustomer?.address || ''
  })

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <ProfileNavBar />
      <Box sx={{ pt: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LocalHospitalIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Veterinarian Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your veterinary practice information and settings
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={currentCustomer?.fullName || ''}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={currentCustomer?.email || ''}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Clinic Information */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Clinic Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Clinic Name"
                    value={formData.clinicName}
                    onChange={handleInputChange('clinicName')}
                  />
                  <TextField
                    fullWidth
                    label="License Number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange('licenseNumber')}
                  />
                  <TextField
                    fullWidth
                    label="Specialization"
                    value={formData.specialization}
                    onChange={handleInputChange('specialization')}
                    placeholder="e.g., Small animals, Surgery, Dermatology"
                  />
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange('experience')}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Address Information */}
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Clinic Address
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Full Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  placeholder="Enter your clinic's complete address"
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Save Button */}
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" size="large">
                Cancel
              </Button>
              <Button variant="contained" size="large" onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default VetSettings
