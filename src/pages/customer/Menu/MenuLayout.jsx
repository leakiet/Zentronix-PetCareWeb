import { Box, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import { mealPackages } from '~/apis/mockData'
import theme from '~/theme'
import MenuList from './MenuList/MenuList'
function MenuLayout() {
  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: 2, py: 6, mt: theme.fitbowl.appBarHeight }}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 300,
            letterSpacing: '0.1em',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Choose <span style={{ fontWeight: 800, color: theme.palette.primary.secondary }}>MEAL PACKAGE</span>
        </Typography>
        <Box sx={{ width: '6rem', height: '0.4rem', bgcolor: theme.palette.primary.secondary, mx: 'auto', mb: 8 }} />
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: '48rem', mx: 'auto', mb: 10, fontSize: { xs: '1rem', md: '1.15rem' }, color: theme.palette.text.textSub }}
        >
          Fitfood provides many meal packages and accompanying foods to meet your needs
        </Typography>
        <Box>
          <MenuList pkg={mealPackages} />
        </Box>
      </Box>
    </Box>
  )
}

export default MenuLayout