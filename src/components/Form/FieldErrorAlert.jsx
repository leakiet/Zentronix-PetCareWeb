import { Box, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null
  return (
    <Box display="flex" alignItems="center" sx={{ mt: '0.25em' }}>
      <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: '0.75rem', mr: '0.25em' }} />
      <Typography sx={{ color: 'error.main', fontSize: '0.75rem', '.MuiAlert-message': { overflow: 'hidden' } }}>
        {errors[fieldName]?.message}
      </Typography>
    </Box>
  )
}

export default FieldErrorAlert
