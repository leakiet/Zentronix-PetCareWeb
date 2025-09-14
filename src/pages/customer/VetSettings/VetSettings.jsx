import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import ProfileNavBar from '~/components/ProfileNavBar/ProfileNavBar'
import {
  getClinicInfoByVetIdAPI,
  createClinicInfoAPI,
  updateClinicInfoAPI
} from '~/apis'
import { toast } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const SpecializationEnum = {
  GENERAL_CHECKUP: 'GENERAL_CHECKUP',
  VACCINATION: 'VACCINATION',
  DENTAL_CARE: 'DENTAL_CARE',
  SKIN_ISSUES: 'SKIN_ISSUES',
  DIGESTIVE_PROBLEMS: 'DIGESTIVE_PROBLEMS',
  INJURY_TRAUMA: 'INJURY_TRAUMA',
  BEHAVIORAL_ISSUES: 'BEHAVIORAL_ISSUES',
  SENIOR_PET_CARE: 'SENIOR_PET_CARE',
  EMERGENCY_CARE: 'EMERGENCY_CARE',
  OTHERS: 'OTHERS'
}

function VetSettings() {
  const currentCustomer = useSelector(selectCurrentCustomer)
  const [clinicInfo, setClinicInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openingHoursValue, setOpeningHoursValue] = useState(dayjs('2022-04-17T08:00'))
  const [closingHoursValue, setClosingHoursValue] = useState(dayjs('2022-04-17T21:00'))
  const [formData, setFormData] = useState({
    clinicName: '',
    licenseNumber: currentCustomer?.licenseNumber || '',
    specialization: currentCustomer?.specialization || '',
    yearOfExp: currentCustomer?.yearOfExp || '',
    phone: currentCustomer?.phone || '',
    website: '',
    openingHours: '',
    servicesOffered: '',
    address: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchClinicInfo = async () => {
      if (currentCustomer?.id) {
        const hasExistingInfo = currentCustomer?.specialization ||
          currentCustomer?.yearOfExp ||
          localStorage.getItem(`clinic_info_${currentCustomer.id}`)
        if (!hasExistingInfo) {
          return
        }

        try {
          const clinicData = await getClinicInfoByVetIdAPI(currentCustomer.id)
          if (clinicData) {
            navigate('/vet-appointments')
          }
        } catch (error) {
          console.log('No clinic info found for this vet')
        }
      }
    }

    fetchClinicInfo()
  }, [currentCustomer, navigate])

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleOpeningTimeChange = (newValue) => {
    setOpeningHoursValue(newValue)
    updateOpeningHours(newValue, closingHoursValue)
  }

  const handleClosingTimeChange = (newValue) => {
    setClosingHoursValue(newValue)
    updateOpeningHours(openingHoursValue, newValue)
  }

  const updateOpeningHours = (startTime, endTime) => {
    if (startTime && endTime) {
      const startTimeString = startTime.format('HH:mm')
      const endTimeString = endTime.format('HH:mm')
      setFormData(prev => ({
        ...prev,
        openingHours: `${startTimeString} - ${endTimeString}`
      }))
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const clinicData = {
        clinicName: formData.clinicName,
        address: formData.address,
        yearOfExp: formData.yearOfExp,
        specialization: formData.specialization,
        openingHours: formData.openingHours,
        servicesOffered: formData.servicesOffered,
        veterinarianId: currentCustomer?.id
      }

      if (clinicInfo?.id) {
        await updateClinicInfoAPI(clinicInfo.id, clinicData)
        toast.success('Clinic information updated successfully!')
        navigate('/vet-appointments')
      } else {
        const newClinic = await createClinicInfoAPI(clinicData)
        setClinicInfo(newClinic)
        toast.success('Clinic information created successfully!')
        navigate('/vet-appointments')
        localStorage.setItem(`clinic_info_${currentCustomer.id}`, 'true')
      }
    } catch (error) {
      console.error('Error saving clinic info:', error)
      toast.error('Failed to save clinic information. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <FormControl fullWidth>
                      <InputLabel>Specialization</InputLabel>
                      <Select
                        value={formData.specialization}
                        label="Specialization"
                        onChange={handleInputChange('specialization')}
                      >
                        {Object.values(SpecializationEnum).map((spec) => (
                          <MenuItem key={spec} value={spec}>
                            {spec}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      type="number"
                      value={formData.yearOfExp}
                      onChange={handleInputChange('yearOfExp')}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Clinic Information */}
            <Grid size={{ xs: 12, md: 6 }}>
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
                      placeholder="Enter your clinic name"
                    />
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <TimeField
                        label="Opening Hours"
                        value={openingHoursValue}
                        onChange={handleOpeningTimeChange}
                        sx={{ flex: 1 }}
                      />
                      <Typography variant="body1" sx={{ mx: 1 }}>-</Typography>
                      <TimeField
                        label="Closing Hours"
                        value={closingHoursValue}
                        onChange={handleClosingTimeChange}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Services Offered"
                      value={formData.servicesOffered}
                      onChange={handleInputChange('servicesOffered')}
                      placeholder="List the services your clinic provides"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Address Information */}
            {/* <Grid size={12}>
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
            </Grid> */}

            {/* Save Button */}
            <Grid size={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" size="large" onClick={() => navigate(-1)} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  )
}

export default VetSettings
