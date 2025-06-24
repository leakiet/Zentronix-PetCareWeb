import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

const Home = ({ handleCloseNavMenu, t }) => {
  return (
    <Box>
      <Box
        component={Link}
        to="/"
        onClick={handleCloseNavMenu}
        sx={{
          my: 2,
          color: (theme) => theme.palette.text.primary,
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          fontWeight: 400,
          fontSize: '1rem',
          fontSmoothing: 'antialiased',
          transition: 'all 0.3s ease-in-out',
          padding: '0.5rem 1rem',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.text.hover,
            borderRadius: '50px'
          }
        }}
      >
        {t('home')}
      </Box>
    </Box>
  )
}

export default Home