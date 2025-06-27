import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  OTP_RULE,
  OTP_RULE_MESSAGE
} from '~/utils/validators'
import toast from 'react-hot-toast'
import { verifyOtpCodeAPI } from '~/apis'

function OtpForm({ onNext, userId }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const userId = location.state?.userId

  const submitLogIn = (data) => {
    const { otpCode } = data
    toast.promise(
      verifyOtpCodeAPI(userId, otpCode), {
        pending: 'Verifying OTP...',
        success: 'OTP verified successfully!',
        error: 'Failed to verify OTP.'
      }
    ).then(res => {
      // console.log(res)
      //Đoạn này phải kiểm tra không có lỗi mới redirect về route /
      if (!res.error) {
        // navigate('/account/reset-password/new-password', { state: { userId } })
        onNext(userId)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)} >
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 480, maxWidth: 480, marginTop: '1em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="h4" align="center">VERIFY OTP</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Please enter your OTP..."
                type="text"
                variant="outlined"
                {...register('otpCode', { required: FIELD_REQUIRED_MESSAGE, pattern: OTP_RULE })}
                error={!!errors.otpCode}
                helperText={errors.otpCode?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.otpCode?.type === 'pattern' ? OTP_RULE_MESSAGE : ''}
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Proceed
            </Button>
          </CardActions>
          {/* <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to Nexus Service Marketing System?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
            </Link>
          </Box> */}
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Link to="/account/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}> Back to Login</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default OtpForm
