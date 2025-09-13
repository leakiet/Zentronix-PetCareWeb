import Box from '@mui/material/Box'
import { CircularProgress, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'

export default function PageLoadingSpinner({ caption }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      width: '100vw',
      height: '100vh'
    }}>
      <AppBar />
      <CircularProgress />
      <Typography>{caption}</Typography>
    </Box>
  )
}
