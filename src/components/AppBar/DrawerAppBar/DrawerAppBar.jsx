import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout'
const DrawerAppBar = ({
  drawerOpen,
  toggleDrawer,
  t
}) => {

  const navItems = [
    { text: t('home'), path: '/' },
    { text: t('menu'), path: '/menu' },
    { text: t('caloCalculator'), path: '/calo-calculator' },
    { text: t('orderChecking'), path: '/order-checking' },
    { text: t('catering'), path: '/catering' },
    { text: t('blog'), path: '/blog' }
  ]

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 250,
          height: '100%',
          paddingX: 2,
          paddingY: 4,
          color: 'white',
          backgroundColor: (theme) => theme.palette.primary.main,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        role="presentation"
      >
        {/* Profile */}

        {/* Navigation List */}
        <List>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Tooltip title="Remy Sharp" >
                <Avatar alt="Cindy Baker" sx={{ width: 80, height: 80 }} />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: 'black', mt: 1 }}>Remy Sharp</Typography>
            </Box>
          </Box>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
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
                }}
              >
                <ListItemText sx={{ color: (theme) => theme.palette.text.primary }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box>
          <Box sx={{
            display: 'flex',
            gap: 1,
            cursor: 'pointer',
            padding: '0.5rem 1.2rem 1rem',
            width: '50%',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.text.hover,
              borderRadius: '50px'
            }
          }}>
            <LogoutIcon sx={{ color: (theme) => theme.palette.text.primary, mt: 1 }} />
            <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary, mt: 1 }}>{t('logout')}</Typography>
          </Box>
        </Box>

        {/* Search */}
        {/* <Box sx={{ mt: 2, px: 2 }}>
            <TextField
              id="outlined-search"
              label="Search gạch"
              type="text"
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon
                        sx={{
                          color: searchValue ? 'white' : 'transparent',
                          fontSize: 'small',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSearchValue('')}
                      />
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                minWidth: 150,
                maxWidth: 200,
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
          </Box> */}
      </Box>
    </Drawer>
  )
}

export default DrawerAppBar