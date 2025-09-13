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
import PetsIcon from '@mui/icons-material/Pets'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import ProfileNavBar from '~/components/ProfileNavBar/ProfileNavBar'

function ShelterSettings() {
  const currentCustomer = useSelector(selectCurrentCustomer)
  const [formData, setFormData] = useState({
    shelterName: currentCustomer?.shelterName || '',
    registrationNumber: currentCustomer?.registrationNumber || '',
    capacity: currentCustomer?.capacity || '',
    established: currentCustomer?.established || '',
    phone: currentCustomer?.phone || '',
    address: currentCustomer?.address || '',
    description: currentCustomer?.description || ''
  })

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSave = () => {
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <ProfileNavBar />
      <Box sx={{ pt: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PetsIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Animal Shelter Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your animal shelter information and settings
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Contact Person"
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

          {/* Shelter Information */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shelter Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Shelter Name"
                    value={formData.shelterName}
                    onChange={handleInputChange('shelterName')}
                  />
                  <TextField
                    fullWidth
                    label="Registration Number"
                    value={formData.registrationNumber}
                    onChange={handleInputChange('registrationNumber')}
                  />
                  <TextField
                    fullWidth
                    label="Capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange('capacity')}
                    placeholder="Maximum number of animals"
                  />
                  <TextField
                    fullWidth
                    label="Established Year"
                    type="number"
                    value={formData.established}
                    onChange={handleInputChange('established')}
                    placeholder="Year the shelter was established"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Address Information */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shelter Address
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Full Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  placeholder="Enter your shelter's complete address"
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Description */}
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Shelter Description"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  placeholder="Describe your shelter's mission and services"
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

export default ShelterSettings
