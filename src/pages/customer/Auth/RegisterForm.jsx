// TrungQuanDev: https://youtube.com/@trungquandev
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE, PHONE_NUMBER_RULE, PHONE_NUMBER_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { registerCustomerAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import PasswordField from '~/components/Form/PasswordField'
import PasswordStrengthIndicator from '~/components/Form/PasswordStrengthIndicator'
import { USER_ROLE } from '~/utils/constants'

function VetShelterRegisterForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [role, setRole] = useState('')

  const { register, handleSubmit, formState: { errors }, getValues, watch } = useForm()

  const watchPassword = watch('password', '')

  const handleChange = (event) => {
    setRole(event.target.value)
  }

  const submitRegister = (data) => {
    const { role, companyName, firstName, lastName, phone, email, password } = data
    toast.promise(registerCustomerAPI({ role, companyName, firstName, lastName, phone, email, password }), {
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
        <MuiCard sx={{ minWidth: 380, marginTop: '6em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
            <Typography variant="h4" align="center">Register</Typography>
          </Box>

          {/* Form fields */}
          <Box sx={{ padding: '0.5em 1em 1em 1em' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Your Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Choose Your Role"
                onChange={handleChange}
              >
                <MenuItem value={USER_ROLE.PET_OWNER}>Pet Owner</MenuItem>
                <MenuItem value={USER_ROLE.VET}>Veterinarian</MenuItem>
                <MenuItem value={USER_ROLE.SHELTER}>Animal Shelter</MenuItem>
              </Select>
            </FormControl>

            {(role === USER_ROLE.SHELTER || role === USER_ROLE.VET) && (
              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  // autoComplete="nope"
                  fullWidth
                  label="Enter Company Name..."
                  type="text"
                  variant="outlined"
                  error={!!errors['companyName']}
                  {...register('companyName', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName='companyName' />
              </Box>
            )}

            <Box sx={{
              marginTop: '1em',
              display: 'flex',
              flexDirection: 'row',
              gap: 2
            }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Enter First Name..."
                  type="text"
                  variant="outlined"
                  error={!!errors['firstName']}
                  {...register('firstName', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName='firstName' />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Enter Last Name..."
                  type="text"
                  variant="outlined"
                  error={!!errors['lastName']}
                  {...register('lastName', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName='lastName' />
              </Box>
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                fullWidth
                label="Enter Phone..."
                type="text"
                variant="outlined"
                error={!!errors['phone']}
                {...register('phone', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PHONE_NUMBER_RULE,
                    message: PHONE_NUMBER_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='phone' />
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName='email' />
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <PasswordField
                label="Enter Password..."
                error={!!errors['password']}
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
              <FieldErrorAlert errors={errors} fieldName='password' />
              <PasswordStrengthIndicator password={watchPassword} />
            </Box>

            <Box sx={{ marginTop: '1em' }}>
              <PasswordField
                label="Enter Password Confirmation..."
                error={!!errors['passwordConfirmation']}
                register={register}
                registerName="passwordConfirmation"
                registerOptions={{
                  validate: (value) => value === getValues('password') || PASSWORD_CONFIRMATION_MESSAGE
                }}
              />
              <FieldErrorAlert errors={errors} fieldName='passwordConfirmation' />
            </Box>
          </Box>

          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Register
            </Button>
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
