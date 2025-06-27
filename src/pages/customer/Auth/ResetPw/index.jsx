import { useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ResetPwForm from './ResetPwForm'
import OtpForm from './OtpForm'
import AccountForm from './AccountForm'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const steps = ['Account Verify', 'OTP Verify', 'New Password']

const ResetPw = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  const handleNext = (userId) => {
    setUserId(userId)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  const handleSubmit = () => {
    toast.success('Please login to continue')
    navigate('/account/login')
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <AccountForm onNext={handleNext} />
    case 1:
      return <OtpForm onNext={handleNext} userId={userId} />
    case 2:
      return <ResetPwForm onSubmit={handleSubmit} userId={userId} />
    default:
      return 'Unknown step'
    }
  }

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '1rem',
          borderRadius: '1rem'
        }}
        variant="h2"
        gutterBottom
      >
        Reset Password
      </Typography>
      <Box sx={{ fontSize: '1.5rem', width: '70%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Box sx={{
                  border: '1px solid',
                  backgroundColor: 'primary.light',
                  padding: '0.5rem',
                  borderRadius: '0.5rem'
                }}>
                  {label}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          {getStepContent(activeStep)}
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPw