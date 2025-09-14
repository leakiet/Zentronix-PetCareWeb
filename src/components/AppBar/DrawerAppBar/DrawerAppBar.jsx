import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import Login from '@mui/icons-material/Login'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Person from '@mui/icons-material/Person'
import Divider from '@mui/material/Divider'
import DrawerAppBarItem from './DrawerAppBarItem'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentCustomer, logoutCustomerApi } from '~/redux/user/customerSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link, useNavigate } from 'react-router-dom'
import { USER_ROLE } from '~/utils/constants'

const DrawerAppBar = ({ drawerOpen, toggleDrawer }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentCustomer = useSelector(selectCurrentCustomer)
  const confirm = useConfirm()

  const navItemStyle = {
    position: 'relative',
    overflow: 'hidden',
    padding: '0.5rem 1rem',
    fontWeight: 900,
    fontSize: '2rem',
    fontSmoothing: 'antialiased',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: (theme) => theme.palette.text.hover,
      borderRadius: '50px'
    }
  }

  const handleLogout = async () => {
    const { confirmed } = await confirm({
      title: 'Are you sure you want to logout?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })
    if (confirmed) {
      dispatch(logoutCustomerApi())
        .then(() => {
          navigate('/login')
          toggleDrawer(false)()
        })
    }
  }

  const linkTo = () => {
    if (currentCustomer?.role === USER_ROLE.PET_OWNER) return '/pet-owner-settings'
    if (currentCustomer?.role === USER_ROLE.VET) return '/vet-settings'
    if (currentCustomer?.role === USER_ROLE.SHELTER) return '/shelter-settings'
    return '/onboarding'
  }

  const handleSettingsClick = () => {
    navigate(linkTo())
    toggleDrawer(false)()
  }

  const handleLoginClick = () => {
    navigate('/login')
    toggleDrawer(false)()
  }

  const handleRegisterClick = () => {
    navigate('/register')
    toggleDrawer(false)()
  }

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          paddingX: 2,
          paddingY: 4,
          color: 'white',
          backgroundColor: (theme) => theme.palette.background.main,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        role="presentation"
      >
        <List>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Tooltip title={currentCustomer?.lastName || 'Guest'}>
                <Avatar
                  alt={currentCustomer ? `${currentCustomer.firstName} ${currentCustomer.lastName}` : 'User Avatar'}
                  sx={{ width: 80, height: 80 }}
                />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: 'black', mt: 1 }}>
                {currentCustomer ? `${currentCustomer.firstName} ${currentCustomer.lastName}` : 'Guest'}
              </Typography>
            </Box>
          </Box>

          {/* Navigation Items */}
          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Home"
            path="/"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Products"
            path="/menu"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="About Us"
            path="/about-us"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Contact"
            path="/contact"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="FAQ"
            path="/faq"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Schedule"
            path="/schedule"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Adoption"
            path="/adoption"
          />
        </List>

        {/* Profile Actions Section */}
        <Box>
          {!currentCustomer ? (
            // Guest user actions
            <>
              <Box
                onClick={handleLoginClick}
                sx={{
                  display: 'flex',
                  gap: 1,
                  cursor: 'pointer',
                  padding: '0.5rem 1.2rem',
                  mb: 1,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.text.hover,
                    borderRadius: '50px'
                  }
                }}
              >
                <Login sx={{ color: (theme) => theme.palette.text.primary }} />
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                  Login
                </Typography>
              </Box>

              <Box
                onClick={handleRegisterClick}
                sx={{
                  display: 'flex',
                  gap: 1,
                  cursor: 'pointer',
                  padding: '0.5rem 1.2rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.text.hover,
                    borderRadius: '50px'
                  }
                }}
              >
                <PersonAdd sx={{ color: (theme) => theme.palette.text.primary }} />
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                  Register
                </Typography>
              </Box>
            </>
          ) : (
            // Logged in user actions
            <>
              <Box
                onClick={handleSettingsClick}
                sx={{
                  display: 'flex',
                  gap: 1,
                  cursor: 'pointer',
                  padding: '0.5rem 1.2rem',
                  mb: 1,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.text.hover,
                    borderRadius: '50px'
                  }
                }}
              >
                <Person sx={{ color: (theme) => theme.palette.text.primary }} />
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                  Settings
                </Typography>
              </Box>

              <Box
                onClick={handleLogout}
                sx={{
                  display: 'flex',
                  gap: 1,
                  cursor: 'pointer',
                  padding: '0.5rem 1.2rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.text.hover,
                    borderRadius: '50px'
                  }
                }}
              >
                <LogoutIcon sx={{ color: (theme) => theme.palette.text.primary }} />
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                  Logout
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerAppBar