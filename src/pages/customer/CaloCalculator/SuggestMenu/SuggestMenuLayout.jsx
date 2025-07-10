import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import theme from '~/theme'
import Footer from '~/components/Footer/Footer'
import Grid from '@mui/material/Grid'
const SuggestMenuLayout = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const gender = params.get('gender')
  const age = params.get('age')
  const weight = params.get('weight')
  const height = params.get('height')
  const exerciseLevel = params.get('exerciseLevel')
  const goal = params.get('goal')
  const allergies = params.get('allergies')
  return (
    <Box>
      <AppBar/>
      <Box sx={{ mt: theme.fitbowl.appBarHeight }}>
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Box>
                
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Box>
                
              </Box>s
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default SuggestMenuLayout