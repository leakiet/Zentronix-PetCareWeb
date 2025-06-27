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
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import toast from 'react-hot-toast'
import { resetPasswordAPI } from '~/apis'

function ResetPwForm({ onSubmit, userId }) {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  // const userId = location.state?.userId

  const submitLogIn = (data) => {
    const { userPassword } = data
    toast.promise(
      resetPasswordAPI({ userId, userPassword }), {
        pending: 'Updating password...',
        success: 'Password updated successfully!',
        error: 'Failed to update password.'
      }
    ).then(res => {
      // console.log(res)
      //Đoạn này phải kiểm tra không có lỗi mới redirect về route /
      if (!res.error) {
        // navigate('/account/login')
        onSubmit()
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
            <Typography variant="h4" align="center">YOUR NEW PASSWORD</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Enter your new password..."
                type="password"
                variant="outlined"
                {...register('userPassword', { required: FIELD_REQUIRED_MESSAGE, pattern: PASSWORD_RULE })}
                error={!!errors.userPassword}
                helperText={errors.userPassword?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.userPassword?.type === 'pattern' ? PASSWORD_RULE_MESSAGE : ''}
              />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Enter confirm password..."
                type="password"
                variant="outlined"
                {...register('confirmPassword', { required: FIELD_REQUIRED_MESSAGE, pattern: PASSWORD_RULE, validate: (value) => value == getValues('userPassword') })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.confirmPassword?.type === 'pattern' ? PASSWORD_CONFIRMATION_MESSAGE : ''}
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

export default ResetPwForm
