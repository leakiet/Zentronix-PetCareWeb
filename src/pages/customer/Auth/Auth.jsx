import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PetsIcon from '@mui/icons-material/Pets'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetPw from './ResetPw'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useConfirm } from 'material-ui-confirm'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import authBg from '~/assets/images/auth-bg.png'
import theme from '~/theme'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isResetPw = location.pathname === '/reset-password'
  const confirm = useConfirm()
  const navigate = useNavigate()

  const currentCustomer = useSelector(selectCurrentCustomer)
  if (currentCustomer) {
    return <Navigate to="/" replace />
  }

  const confirmBack = async (e) => {
    e.preventDefault()
    const warningMessage = 'Bạn có chắc chắn muốn quay lại trang chủ không?'
    const { confirmed } = await confirm({
      title: 'Xác nhận quay lại trang chủ',
      description: warningMessage,
      confirmationText: 'Quay lại',
      cancellationText: 'Tiếp tục'
    })
    if (confirmed) navigate('/')
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Back to Home Link */}
      <Box
        component={Link}
        to="/"
        onClick={confirmBack}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          textDecoration: 'none',
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          zIndex: 10,
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: theme.palette.primary.light,
            transform: 'translateY(-2px)',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }
        }}
      >
        <ArrowBackIcon fontSize="small" />
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Go back</Typography>
      </Box>

      {/* Main Content */}
      {isLogin ? (
        <Grid container sx={{ height: '100vh' }}>
          {/* Left Side - FurShield Branding - Only for Login */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Pet Background Image */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${authBg})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f8f9fa' // Same as right side
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: 'white',
                px: 4
              }}
            >
              <PetsIcon sx={{ fontSize: 36, color: '#FFD700' }} />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', lg: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                FUR SHIELD
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.contrastText,
                  fontSize: { xs: '1.2rem', lg: '1.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
                }}
              >
                Your Complete Pet Care Companion
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Auth Forms - Login */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: { xs: 2, sm: 3 },
              backgroundColor: '#f8f9fa',
              minHeight: '100vh'
            }}
          >
            <Box sx={{
              width: '100%',
              maxWidth: 450,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {/* Welcome Message */}
              <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    mb: 2,
                    fontSize: { xs: '1.75rem', sm: '2rem' }
                  }}
                >
                  Welcome to FurShield
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  Sign in to your account
                </Typography>
              </Box>

              {/* Auth Form */}
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <LoginForm />
              </Box>

              {/* Additional Links */}
              <Box sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  New to FurShield?{' '}
                  <Link
                    to="/register"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        /* Centered Auth Forms for Register and Reset Password */
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 2, sm: 3 },
            backgroundColor: '#f8f9fa'
          }}
        >
          <Box sx={{
            width: '100%',
            maxWidth: 450,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Welcome Message */}
            <Box sx={{ textAlign: 'center', m: 1, width: '100%' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2rem' }
                }}
              >
                Welcome to FurShield
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {isRegister && 'Create your new account'}
                {isResetPw && 'Reset your password'}
              </Typography>
            </Box>

            {/* Auth Form */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {isRegister && <RegisterForm />}
              {isResetPw && <ResetPw />}
            </Box>

            {/* Additional Links */}
            <Box sx={{ textAlign: 'center', mt: 2, width: '100%' }}>
              {isRegister && (
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              )}
              {isResetPw && (
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Auth