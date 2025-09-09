import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutCustomerApi } from '~/redux/user/customerSlice'
import { useConfirm } from 'material-ui-confirm'

function ProfileNavBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const confirm = useConfirm()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    const { confirmed } = await confirm({
      title: 'Are you sure you want to logout?',
      cancellationText: 'Cancel',
      confirmationText: 'Log out'
    })
    if (confirmed) {
      dispatch(logoutCustomerApi())
        .then(() => {
          navigate('/login')
        })
    }
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 3,
      position: 'relative',
      zIndex: 10
    }}>
      {/* Left: Website name */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
        >
          Pet Care
        </Typography>
      </Box>

      {/* Center: Agent & Profile buttons */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button component={Link} to="/agent" color="primary" variant="outlined">Agent</Button>
        <Button component={Link} to="/profile" color="primary" variant="contained">Profile</Button>
      </Box>

      {/* Right: Account icon with dropdown */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton
          color="primary"
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'account-button'
          }}
        >
          <MenuItem onClick={handleLogout} sx={{
            '&:hover': {
              color: 'warning.dark',
              '& .logout-icon': {
                color: 'warning.dark'
              }
            }
          }}>
            <ListItemIcon>
              <Logout className='logout-icon' fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default ProfileNavBar
