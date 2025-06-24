import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import theme from '~/theme'
const Card = ({ image, label }) => {
  const [count, setCount] = useState(0)

  const handleDecrease = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0))
  }
  const handleIncrease = () => {
    setCount(prev => prev + 1)
  }

  return (
    <Box
      sx={{
        background: '#f6f0e3',
        borderRadius: 4,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 160,
        maxWidth: 280,
        width: '100%',
        mb: 1,
        border: '1.5px solid #e0c9b2',
        boxShadow: '0 2px 12px 0 rgba(122,35,51,0.07)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(122,35,51,0.13)',
          borderColor: '#7a2333'
        }
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: theme.colorSchemes.light.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5
        }}
      >
        <img src={image} alt={label} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%' }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton size="small" onClick={handleDecrease} sx={{ border: '1px solid #e0c9b2', background: '#fff', mx: 0.5 }}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <TextField
          value={count}
          size="small"
          inputProps={{
            style: { textAlign: 'center', width: 32, padding: 4 },
            readOnly: true
          }}
          sx={{ mx: 0.5, '& .MuiInputBase-root': { borderRadius: 2, background: '#fff' } }}
        />
        <IconButton size="small" onClick={handleIncrease} sx={{ border: '1px solid #e0c9b2', background: '#fff', mx: 0.5 }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography sx={{ color: '#7a2333', fontWeight: 500, textAlign: 'center', fontSize: 16 }}>
        {label}
      </Typography>
    </Box>
  )
}

export default Card