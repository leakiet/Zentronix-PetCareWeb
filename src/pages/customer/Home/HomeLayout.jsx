import AppBar from '~/components/AppBar/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Footer from '~/components/Footer/Footer'
const HomeLayout = () => {

  return (
    <Box>
      <AppBar/>
      <Box>
        <Box>
          <Typography>
                    Home
          </Typography>

        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}
export default HomeLayout