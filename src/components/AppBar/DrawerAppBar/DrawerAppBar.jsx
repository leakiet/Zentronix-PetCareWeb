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
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'

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

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
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
            label="Menu"
            path="/menu"
          />

          <ListItem disablePadding >
            <ListItemButton
              onClick={handleClick}
              sx={navItemStyle}
            >
              <ListItemText sx={{ color: (theme) => theme.palette.text.primary }} primary="Calculator" />
              {open ? <ExpandLess sx={{ color: (theme) => theme.palette.text.primary }}/> : <ExpandMore sx={{ color: (theme) => theme.palette.text.primary }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to='/smart-meal-planner'
                  onClick={toggleDrawer(false)}
                  sx={navItemStyle}
                >
                  <ListItemText sx={{ color: (theme) => theme.palette.text.primary }} primary="Smart Meal Planner" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to='/calo-calculator'
                  onClick={toggleDrawer(false)}
                  sx={navItemStyle}
                >
                  <ListItemText sx={{ color: (theme) => theme.palette.text.primary }} primary="Calo Calculator" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Order Checking"
            path="/order-checking"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Catering"
            path="/catering"
          />

          <DrawerAppBarItem
            toggleDrawer={toggleDrawer}
            navItemStyle={navItemStyle}
            label="Blog"
            path="/blog"
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