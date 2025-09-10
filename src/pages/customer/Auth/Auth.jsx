import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetPw from './ResetPw'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useConfirm } from 'material-ui-confirm'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'

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
    const warningMessage = 'Ban có chắc chắn muốn quay lại trang chủ không?'
    const { confirmed } = await confirm({
      title: 'Xác nhận quay lại trang chủ',
      description: warningMessage,
      confirmationText: 'Quay lại',
      cancellationText: 'Tiếp tục'
    })
    if (confirmed) navigate('/')
  }

  return (
    <Box>
      <Box sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
        {isResetPw && <ResetPw />}


        <Box to="/" sx={{
          marginTop: '1em',
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1
        }}>
          <ArrowBackIcon fontSize="small" />
          <Link onClick={confirmBack} variant="body1">Go back</Link>
        </Box>


      </Box>
    </Box>
  )
}

export default Auth