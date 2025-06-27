import { Link } from 'react-router-dom'
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
  ACCOUNT_ID_RULE,
  ACCOUNT_ID_RULE_MESSAGE
} from '~/utils/validators'
import toast from 'react-hot-toast'
import { sendOtpCodeAPI } from '~/apis'

function AccountForm({ onNext }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitLogIn = (data) => {
    const { userId } = data
    toast.promise(
      sendOtpCodeAPI({ userId }), {
        pending: 'Sending OTP code...',
        success: 'OTP code sent successfully!',
        error: 'Failed to send OTP code.'
      }
    ).then(res => {
      // console.log(res)
      //Đoạn này phải kiểm tra không có lỗi mới redirect về route /
      if (!res.error) {
        // navigate('/account/reset-password/otp', { state: { userId } })
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
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="h4" align="center">YOUR ACCOUNT ID</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Please enter your Account ID..."
                type="text"
                variant="outlined"
                {...register('userId', { required: FIELD_REQUIRED_MESSAGE, pattern: ACCOUNT_ID_RULE })}
                error={!!errors.userId}
                helperText={errors.userId?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.userId?.type === 'pattern' ? ACCOUNT_ID_RULE_MESSAGE : ''}
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

export default AccountForm
