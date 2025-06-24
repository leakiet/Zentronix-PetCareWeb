import React from 'react'
import { Box, Typography } from '@mui/material'
import theme from '~/theme'
function HealthyChoice() {
  return (
    <Box
      sx={{
        flex: 1,
        background: '#fff8ed',
        borderRadius: 4,
        p: 4,
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 12px #0001'
      }}
    >
      <Typography variant="h5" sx={{ color: theme.colorSchemes.light.palette.text.primary, fontWeight: 700, mb: 1, textAlign: 'center' }}>
        Tô healthy của bạn
      </Typography>
      <Typography sx={{ color: theme.colorSchemes.light.palette.text.primary, fontSize: 14, mb: 2, textAlign: 'center' }}>
        Lựa chọn nguyên liệu và xốt để tính toán calo cho bữa ăn healthy của bạn
      </Typography>
      <Box sx={{ width: '100%', borderBottom: '1px dashed #7a2333', mb: 3 }} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" src="/src/assets/empty-bowl.svg" alt="empty bowl" sx={{ width: 180, opacity: 0.2, mb: 2 }} />
        <Typography sx={{ color: theme.colorSchemes.light.palette.text.primary, fontWeight: 500, textAlign: 'center' }}>
          Chọn nguyên liệu để tính toán calo
        </Typography>
      </Box>
    </Box>
  )
}

export default HealthyChoice