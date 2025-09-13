import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
import DrawerAppBarItem from './DrawerAppBarItem'
import { Link } from 'react-router-dom'

const DrawerAppBar = ({ drawerOpen, toggleDrawer }) => {
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


  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
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
              <Tooltip title="Remy Sharp">
                <Avatar alt="User Avatar" sx={{ width: 80, height: 80 }} />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: 'black', mt: 1 }}>Remy Sharp</Typography>
            </Box>
          </Box>

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Home"
            path="/"
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

        <Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              cursor: 'pointer',
              padding: '0.5rem 1.2rem 1rem',
              width: '50%',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.text.hover,
                borderRadius: '50px'
              }
            }}
          >
            <LogoutIcon sx={{ color: (theme) => theme.palette.text.primary, mt: 1 }} />
            <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary, mt: 1 }}>
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerAppBar