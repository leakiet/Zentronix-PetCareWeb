import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import { Link } from 'react-router-dom'
import Zoom from '@mui/material/Zoom'

function Unauthorized() {
  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 4
        }}>
          <Avatar sx={{ bgcolor: 'error.main', width: 80, height: 80 }}>
            <LockIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h3" component="h1" gutterBottom>
            Access Denied
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
            You don&apos;t have permission to access this page. This page is restricted to specific user roles.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            Please contact your administrator if you believe this is an error, or return to your appropriate dashboard.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/"
            >
              Go to Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Container>
  )
}

export default Unauthorized
