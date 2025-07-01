import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'

const CaloCalculator = () => {
  return (
    <>
      <Box>
        <AppBar/>
        <Box sx={{ mt: theme.fitbowl.appBarHeight }}>
          calo calculator
        </Box>
        <Footer/>
      </Box>
    </>
  )
}

export default CaloCalculator