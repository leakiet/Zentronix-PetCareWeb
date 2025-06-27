import { Box, Typography } from '@mui/material'
import theme from '~/theme'
function HealthyChoice() {
  return (
    <Box
      sx={{
        flex: 1,
        background: theme.palette.primary.card,
        borderRadius: 4,
        p: 2,
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 12px ' + theme.palette.primary.text
      }}
    >
      <Typography variant="h5" sx={{ color: theme.colorSchemes.light.palette.text.primary, fontWeight: 700, mb: 1, textAlign: 'center' }}>
        Your healthy bowl
      </Typography>
      <Typography sx={{ color: theme.colorSchemes.light.palette.text.primary, fontSize: 14, mb: 2, textAlign: 'center' }}>
        Choose ingredients and sauces to calculate the calories for your healthy meal
      </Typography>
      <Box sx={{ width: '100%', borderBottom: '1px dashed ' + theme.palette.primary.text, mb: 3 }} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" src='https://res.cloudinary.com/quyendev/image/upload/v1750996461/icons8-vegetables-bag-100_1_qocndf.png' alt="empty bowl" sx={{ width: 180, opacity: 0.2, mb: 2 }} />
        <Typography sx={{ color: theme.colorSchemes.light.palette.text.primary, fontWeight: 500, textAlign: 'center' }}>
          Choose ingredients to calculate calories
        </Typography>
      </Box>
    </Box>
  )
}

export default HealthyChoice