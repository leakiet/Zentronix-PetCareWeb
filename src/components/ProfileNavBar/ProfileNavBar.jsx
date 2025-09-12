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
import theme from '~/theme'

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
      body: 'You will be redirected to the login page.',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 3,
      zIndex: 10
    }}>
      {/* Left: Website name */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          component={Link}
          to="/"
          sx={{ 
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: '2rem'
          }}
        >
          FUR SHIELD
        </Typography>
      </Box>

      {/* Center: Agent & Profile buttons */}

      {/* Right: Account icon with dropdown */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
          slotProps={{
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
