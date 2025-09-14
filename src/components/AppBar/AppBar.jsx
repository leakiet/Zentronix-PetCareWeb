import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { useState } from 'react'
import DrawerAppBar from '~/components/AppBar/DrawerAppBar/DrawerAppBar'
import Profile from '~/components/AppBar/Menu/Profile'
import Cart from '~/components/AppBar/Cart/Cart'
import NavItem from '~/components/AppBar/Menu/NavItem'
import { Link } from 'react-router-dom'
// import CaloCalculator from '~/components/AppBar/Menu/CaloCalculator'
// import Notification from '~/components/AppBar/Notifications/Notifications'
// import NotificationsShelter from './Notifications/NotificationsShelter'
import Notifications from '~/components/AppBar/Notifications/Notifications'

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }
  return (
    <AppBar sx={{
      backgroundColor: (theme) => theme.palette.background.main, height: (theme) => theme.fitbowl.appBarHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              textTransform: 'uppercase',
              fontSize: '2rem',
              textDecoration: 'none',
              color: (theme) => theme.palette.primary.secondary
            }}
          >
            Fur Shield
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <DrawerAppBar
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon sx={{ color: (theme) => theme.palette.primary.main }} />
              </IconButton>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Sacramento, cursive',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: (theme) => theme.palette.primary.secondary,
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              Fur Shield
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <Notifications />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Cart />
            </Box>


          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <NavItem to="/menu" label="PRODUCTS" handleCloseNavMenu={handleCloseNavMenu} />
            <NavItem to="/about-us" label="ABOUT US" handleCloseNavMenu={handleCloseNavMenu} />
            <NavItem to="/schedule" label="SCHEDULE" handleCloseNavMenu={handleCloseNavMenu} />
            <NavItem to="/adoption" label="ADOPTION" handleCloseNavMenu={handleCloseNavMenu} />
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Notifications />
              <Cart />
              {/* <NotificationsShelter /> */}
              <Profile />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
