import { Box, Typography, IconButton, Avatar, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

const CartItem = ({ item, onUpdateQuantity, onDecrease, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 5,
      p: 3,
      mb: 2,
      border: '1px solid',
      borderColor: 'grey.200',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderColor: 'primary.light'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={item.image}
            alt={item.name}
            sx={{ width: 60, height: 60, borderRadius: 2 }}
          />
          <Box>
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatPrice(item.price)} each
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 0.5 }}>
            {formatPrice(item.totalPrice)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderBottom: '1.5px dashed', my: 2 }}></Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Quantity:
          </Typography>
          <IconButton
            onClick={() => onDecrease(item.cartId)}
            size="small"
            sx={{
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'grey.200' },
              border: '1px solid',
              borderColor: 'grey.300'
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mx: 2, minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
            {item.quantity}
          </Typography>
          <IconButton
            onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
            size="small"
            sx={{
              bgcolor: 'primary.light',
              color: 'white',
              '&:hover': { bgcolor: 'primary.main' },
              border: '1px solid',
              borderColor: 'primary.main'
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onRemove(item.cartId)}
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'error.light'
            }
          }}
        >
          Remove
        </Button>
      </Box>
    </Box>
  )
}

export default CartItem