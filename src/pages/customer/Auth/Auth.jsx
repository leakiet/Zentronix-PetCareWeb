import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import AppBar from '~/components/AppBar/AppBar'
import RegisterForm from './RegisterForm'
// import AccountForm from './ResetPw/AccountForm'
// import OtpForm from './ResetPw/OtpForm'
// import ResetPwForm from './ResetPw/ResetPwForm'
import ResetPw from './ResetPw'
import bgImage from '~/assets/images/Account-login-bg.jpeg'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isResetPw = location.pathname === '/reset-password'

  return (
    <Box>
      <AppBar />
      <Box sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundBlendMode: 'overlay',
        // backgroundColor: 'rgba(255, 255, 255, 0.55)',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}>
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
        {/* {isResetPw && <ResetPw />} */}


      </Box>
    </Box>
  )
}

export default Auth