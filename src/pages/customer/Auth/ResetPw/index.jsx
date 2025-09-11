import { useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ResetPwForm from './ResetPwForm'
import OtpForm from './OtpForm'
import AccountForm from './AccountForm'
import { useNavigate } from 'react-router-dom'
import theme from '~/theme'
const steps = ['Account Verify', 'OTP Verify', 'New Password']

const ResetPw = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  const handleNext = (data) => {
    setEmail(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  const handleSubmit = () => {
    navigate('/login?passwordReseted=true')
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <AccountForm onNext={handleNext} />
    case 1:
      return <OtpForm onNext={handleNext} email={email} />
    case 2:
      return <ResetPwForm onSubmit={handleSubmit} email={email} />
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
      <Box sx={{
        fontSize: '1.5rem',
        width: '100%'
      }}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          {getStepContent(activeStep)}
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPw