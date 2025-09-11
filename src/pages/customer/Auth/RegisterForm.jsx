import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE, PHONE_NUMBER_RULE, PHONE_NUMBER_RULE_MESSAGE } from '~/utils/validators'
import { registerCustomerAPI } from '~/apis'
import { toast } from 'react-toastify'
import PasswordField from '~/components/Form/PasswordField'
import PasswordStrengthIndicator from '~/components/Form/PasswordStrengthIndicator'
import { USER_ROLE } from '~/utils/constants'

function VetShelterRegisterForm() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
  const [isLoadingCoords, setIsLoadingCoords] = useState(false)
  const [step, setStep] = useState(0) // 0: Personal, 1: Address, 2: Security

  // Address states
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)

  // Validation states
  const [stepErrors, setStepErrors] = useState({})

  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm()

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (step < 2) setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  // Validation functions
  const validateCurrentStep = () => {
    const currentValues = getValues()
    const newErrors = {}

    if (step === 0) {
      // Validate Personal Information
      if (!role) {
        newErrors.role = 'Please select your role'
      }
      if (!currentValues.firstName?.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!currentValues.lastName?.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!currentValues.phone?.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!PHONE_NUMBER_RULE.test(currentValues.phone)) {
        newErrors.phone = PHONE_NUMBER_RULE_MESSAGE
      }
      if (!currentValues.email?.trim()) {
        newErrors.email = 'Email is required'
      } else if (!EMAIL_RULE.test(currentValues.email)) {
        newErrors.email = EMAIL_RULE_MESSAGE
      }
      if ((role === USER_ROLE.SHELTER || role === USER_ROLE.VET) && !currentValues.companyName?.trim()) {
        newErrors.companyName = 'Company name is required'
      }
    } else if (step === 1) {
      // Validate Address Information
      if (!selectedProvince) {
        newErrors.province = 'Please select a province/city'
      }
      if (!selectedDistrict) {
        newErrors.district = 'Please select a district'
      }
      if (!selectedWard) {
        newErrors.ward = 'Please select a ward'
      }
      if (!currentValues.street?.trim()) {
        newErrors.street = 'Street address is required'
      }
    } else if (step === 2) {
      // Validate Security Information
      if (!currentValues.password?.trim()) {
        newErrors.password = 'Password is required'
      } else if (!PASSWORD_RULE.test(currentValues.password)) {
        newErrors.password = PASSWORD_RULE_MESSAGE
      }
      if (!currentValues.passwordConfirmation?.trim()) {
        newErrors.passwordConfirmation = 'Please confirm your password'
      } else if (currentValues.password !== currentValues.passwordConfirmation) {
        newErrors.passwordConfirmation = PASSWORD_CONFIRMATION_MESSAGE
      }
    }

    setStepErrors(newErrors)

    // If there are errors, show toast and return false
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fill in all required fields correctly')
      return false
    }

    return true
  }

  // Address API functions
  const fetchProvinces = async () => {
    try {
      setIsLoadingAddress(true)
      const response = await fetch('https://provinces.open-api.vn/api/p/')
      if (!response.ok) throw new Error('Failed to fetch provinces')
      const data = await response.json()
      setProvinces(data)
    } catch (error) {
      console.error('Error fetching provinces:', error)
      toast.error('Failed to load provinces')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  const fetchDistricts = async (provinceCode) => {
    try {
      setIsLoadingAddress(true)
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      if (!response.ok) throw new Error('Failed to fetch districts')
      const data = await response.json()
      setDistricts(data.districts || [])
    } catch (error) {
      console.error('Error fetching districts:', error)
      toast.error('Failed to load districts')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  const fetchWards = async (districtCode) => {
    try {
      setIsLoadingAddress(true)
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      if (!response.ok) throw new Error('Failed to fetch wards')
      const data = await response.json()
      setWards(data.wards || [])
    } catch (error) {
      console.error('Error fetching wards:', error)
      toast.error('Failed to load wards')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  // Handle province change
  const handleProvinceChange = (provinceCode) => {
    setSelectedProvince(provinceCode)
    setSelectedDistrict('')
    setSelectedWard('')
    setDistricts([])
    setWards([])
    if (provinceCode) {
      fetchDistricts(provinceCode)
    }
  }

  // Handle district change
  const handleDistrictChange = (districtCode) => {
    setSelectedDistrict(districtCode)
    setSelectedWard('')
    setWards([])
    if (districtCode) {
      fetchWards(districtCode)
    }
  }

  // Handle ward change
  const handleWardChange = (wardCode) => {
    setSelectedWard(wardCode)
  }

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  const watchPassword = watch('password', '')
  const watchStreet = watch('street', '')

  const handleChange = (event) => {
    setRole(event.target.value)
  }

  // Function to get coordinates from OpenStreetMap
  const getCoordinatesFromAddress = async (street, wardName, districtName, provinceName) => {
    if (!street || !provinceName) return

    setIsLoadingCoords(true)
    try {
      const address = `${street}, ${wardName}, ${districtName}, ${provinceName}, Vietnam`
      const encodedAddress = encodeURIComponent(address)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`)

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates')
      }

      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        setCoordinates({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        })
        toast.success('Coordinates retrieved successfully!')
      } else {
        toast.warning('Could not find coordinates for this address')
        setCoordinates({ latitude: null, longitude: null })
      }
    } catch {
      toast.error('Failed to get coordinates. Please check your address.')
      setCoordinates({ latitude: null, longitude: null })
    } finally {
      setIsLoadingCoords(false)
    }
  }

  // Auto-fetch coordinates when address fields change
  useEffect(() => {
    const selectedProvinceData = provinces.find(p => p.code === selectedProvince)
    const selectedDistrictData = districts.find(d => d.code === selectedDistrict)
    const selectedWardData = wards.find(w => w.code === selectedWard)

    if (watchStreet && selectedProvinceData) {
      const timeoutId = setTimeout(() => {
        getCoordinatesFromAddress(
          watchStreet,
          selectedWardData?.name || '',
          selectedDistrictData?.name || '',
          selectedProvinceData.name
        )
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timeoutId)
    }
  }, [watchStreet, selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards])

  const submitRegister = (data) => {
    // Get selected address names
    const selectedProvinceData = provinces.find(p => p.code === selectedProvince)
    const selectedDistrictData = districts.find(d => d.code === selectedDistrict)
    const selectedWardData = wards.find(w => w.code === selectedWard)

    const {
      role,
      companyName,
      firstName,
      lastName,
      phone,
      email,
      password,
      street
    } = data

    // Prepare address data
    const address = {
      street: street || '',
      ward: selectedWardData?.name || '',
      district: selectedDistrictData?.name || '',
      city: selectedProvinceData?.name || '',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    }

    toast.promise(registerCustomerAPI({
      role,
      companyName,
      firstName,
      lastName,
      phone,
      email,
      password,
      address
    }), {
      pending: 'Registering...',
      success: 'Registration successful! Please check your email to verify your account.',
      error: 'Registration failed. Please try again.'
    }).then(user => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 440, marginTop: '1em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
            <Typography variant="h4" align="center">Register</Typography>
          </Box>

          {/* Step Indicator */}
          <Box sx={{ padding: '0.5em', textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {[0, 1, 2].map((stepIndex) => (
                <Box
                  key={stepIndex}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: stepIndex <= step ? 'primary.main' : 'grey.300',
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Form fields */}
          <Box sx={{ padding: '0.5em 1em 1em 1em' }}>
            {/* Step 0: Role and Personal Information */}
            {step === 0 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Choose Your Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Choose Your Role"
                    onChange={handleChange}
                    error={!!stepErrors.role}
                  >
                    <MenuItem value={USER_ROLE.PET_OWNER}>Pet Owner</MenuItem>
                    <MenuItem value={USER_ROLE.VET}>Veterinarian</MenuItem>
                    <MenuItem value={USER_ROLE.SHELTER}>Animal Shelter</MenuItem>
                  </Select>
                </FormControl>
                {stepErrors.role && (
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                    <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                    <Typography variant="caption" color="error">
                      {stepErrors.role}
                    </Typography>
                  </Box>
                )}

                {(role === USER_ROLE.SHELTER || role === USER_ROLE.VET) && (
                  <Box sx={{ marginTop: '1em' }}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      type="text"
                      variant="outlined"
                      error={!!errors['companyName'] || !!stepErrors.companyName}
                      {...register('companyName', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />
                    {stepErrors.companyName && (
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                        <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                        <Typography variant="caption" color="error">
                          {stepErrors.companyName}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Personal Information */}
                <Box sx={{ marginTop: '1em' }}>
                  <Typography variant="h6" sx={{ marginBottom: '0.5em', fontWeight: 'bold' }}>
                    Personal Information
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label="First Name"
                        type="text"
                        variant="outlined"
                        error={!!errors['firstName'] || !!stepErrors.firstName}
                        {...register('firstName', {
                          required: FIELD_REQUIRED_MESSAGE
                        })}
                      />
                      {stepErrors.firstName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                          <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                          <Typography variant="caption" color="error">
                            {stepErrors.firstName}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        error={!!errors['lastName'] || !!stepErrors.lastName}
                        {...register('lastName', {
                          required: FIELD_REQUIRED_MESSAGE
                        })}
                      />
                      {stepErrors.lastName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                          <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                          <Typography variant="caption" color="error">
                            {stepErrors.lastName}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ marginTop: '1em' }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      type="text"
                      variant="outlined"
                      error={!!errors['phone'] || !!stepErrors.phone}
                      {...register('phone', {
                        required: FIELD_REQUIRED_MESSAGE,
                        pattern: {
                          value: PHONE_NUMBER_RULE,
                          message: PHONE_NUMBER_RULE_MESSAGE
                        }
                      })}
                    />
                    {stepErrors.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                        <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                        <Typography variant="caption" color="error">
                          {stepErrors.phone}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ marginTop: '1em' }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      error={!!errors['email'] || !!stepErrors.email}
                      {...register('email', {
                        required: FIELD_REQUIRED_MESSAGE,
                        pattern: {
                          value: EMAIL_RULE,
                          message: EMAIL_RULE_MESSAGE
                        }
                      })}
                    />
                    {stepErrors.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                        <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                        <Typography variant="caption" color="error">
                          {stepErrors.email}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </>
            )}

            {/* Step 1: Address Information */}
            {step === 1 && (
              <>
                <Typography variant="h6" sx={{ marginBottom: '0.5em', fontWeight: 'bold' }}>
                  Address Information
                </Typography>

                {/* Province/City Selection */}
                <Box sx={{ marginTop: '1em' }}>
                  <FormControl fullWidth error={!!stepErrors.province}>
                    <InputLabel>Province/City</InputLabel>
                    <Select
                      value={selectedProvince}
                      label="Province/City"
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      disabled={isLoadingAddress}
                    >
                      {provinces.map((province) => (
                        <MenuItem key={province.code} value={province.code}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {stepErrors.province && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.province}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* District Selection */}
                <Box sx={{ marginTop: '1em' }}>
                  <FormControl fullWidth disabled={!selectedProvince} error={!!stepErrors.district}>
                    <InputLabel>District</InputLabel>
                    <Select
                      value={selectedDistrict}
                      label="District"
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={isLoadingAddress || !selectedProvince}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district.code} value={district.code}>
                          {district.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {stepErrors.district && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.district}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Ward Selection */}
                <Box sx={{ marginTop: '1em' }}>
                  <FormControl fullWidth disabled={!selectedDistrict} error={!!stepErrors.ward}>
                    <InputLabel>Ward</InputLabel>
                    <Select
                      value={selectedWard}
                      label="Ward"
                      onChange={(e) => handleWardChange(e.target.value)}
                      disabled={isLoadingAddress || !selectedDistrict}
                    >
                      {wards.map((ward) => (
                        <MenuItem key={ward.code} value={ward.code}>
                          {ward.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {stepErrors.ward && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.ward}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Street Address */}
                <Box sx={{ marginTop: '1em' }}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    type="text"
                    variant="outlined"
                    error={!!errors['street'] || !!stepErrors.street}
                    {...register('street', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                  />
                  {stepErrors.street && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.street}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Coordinates Display */}
                {(coordinates.latitude && coordinates.longitude) && (
                  <Box sx={{
                    marginTop: '1em',
                    padding: '0.5em',
                    backgroundColor: '#e8f5e8',
                    borderRadius: 1,
                    border: '1px solid #4caf50'
                  }}>
                    <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                      📍 Coordinates: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
                    </Typography>
                  </Box>
                )}

                {isLoadingCoords && (
                  <Box sx={{
                    marginTop: '1em',
                    padding: '0.5em',
                    backgroundColor: '#fff3e0',
                    borderRadius: 1,
                    border: '1px solid #ff9800'
                  }}>
                    <Typography variant="caption" sx={{ color: '#f57c00' }}>
                      🔄 Getting coordinates...
                    </Typography>
                  </Box>
                )}
              </>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <>
                <Typography variant="h6" sx={{ marginBottom: '0.5em', fontWeight: 'bold' }}>
                  Security
                </Typography>

                <Box sx={{ marginTop: '1em' }}>
                  <PasswordField
                    label="Password"
                    error={!!errors['password'] || !!stepErrors.password}
                    register={register}
                    registerName="password"
                    registerOptions={{
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    }}
                  />
                  {stepErrors.password && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.password}
                      </Typography>
                    </Box>
                  )}
                  <PasswordStrengthIndicator password={watchPassword} />
                </Box>

                <Box sx={{ marginTop: '1em' }}>
                  <PasswordField
                    label="Confirm Password"
                    error={!!errors['passwordConfirmation'] || !!stepErrors.passwordConfirmation}
                    register={register}
                    registerName="passwordConfirmation"
                    registerOptions={{
                      validate: (value) => value === getValues('password') || PASSWORD_CONFIRMATION_MESSAGE
                    }}
                  />
                  {stepErrors.passwordConfirmation && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
                      <Typography variant="caption" color="error">
                        {stepErrors.passwordConfirmation}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>

          {/* Navigation Buttons */}
          <CardActions sx={{ padding: '0 1em 1em 1em', justifyContent: 'space-between' }}>
            {step > 0 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                sx={{ minWidth: '100px' }}
              >
                Previous
              </Button>
            )}

            <Box sx={{ flex: 1 }} />

            {step < 2 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                sx={{ minWidth: '100px' }}
              >
                Next
              </Button>
            ) : (
              <Button
                className='interceptor-loading'
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ minWidth: '100px' }}
              >
                Register
              </Button>
            )}
          </CardActions>

          {/* Login link */}
          <Box sx={{
            padding: '0 1em 1em 1em',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography>Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontWeight: 'bold', color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Log in!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default VetShelterRegisterForm
