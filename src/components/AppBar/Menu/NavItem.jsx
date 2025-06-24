import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ to, label, handleCloseNavMenu, t }) => {
  const location = useLocation()
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)

  return (
    <Box>
      <Button
        component={Link}
        to={to}
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
          backgroundColor: isActive ? (theme) => theme.palette.text.hover : 'transparent',
          borderRadius: isActive ? '50px' : '0',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.text.hover,
            borderRadius: '50px'
          }
        }}
      >
        {t(`navBar.${label}`)}
      </Button>
    </Box>
  )
}

export default NavItem