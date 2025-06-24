import React from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
    </Box>
  )
}
export default HomeLayout