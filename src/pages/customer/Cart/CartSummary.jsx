import { Box, Typography, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalQuantity, selectCartTotalPrice, removeFromCart, clearCart } from '~/redux/cart/cartSlice'

const CartSummary = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const totalPrice = useSelector(selectCartTotalPrice)

  const removeItem = (cartId) => {
    dispatch(removeFromCart(cartId))
  }

  const clearAllItems = () => {
    dispatch(clearCart())
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <Box sx={{
      p: 3,
      bgcolor: 'white',
      borderRadius: 5
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" color="text.primary">
          Cart Summary
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={clearAllItems}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '0.8rem',
            borderColor: 'error.main',
            color: 'error.main',
            '&:hover': {
              borderColor: 'error.dark',
              bgcolor: 'error.light'
            }
          }}
        >
          Clear All
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.primary" sx={{ mb: 1, fontWeight: 500 }}>
          Items in Cart:
        </Typography>
        {cartItems.map((item) => (
          <Box
            key={item.cartId}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              px: 2,
              mb: 1,
              bgcolor: 'white',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="500" color="text.primary">
                {item.name} (x{item.quantity})
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatPrice(item.price)} each
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight="bold" color="primary.main">
                {formatPrice(item.totalPrice)}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeItem(item.cartId)}
                sx={{
                  color: 'error.main',
                  '&:hover': { bgcolor: 'error.light' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ borderBottom: '1.5px dashed', my: 2 }}></Box>

      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {formatPrice(totalPrice)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Price ({totalQuantity} items)
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          borderRadius: 5,
          py: 1.5,
          fontSize: '1.1rem',
          textTransform: 'none'
        }}
      >
        Proceed to Checkout
      </Button>

      <Button
        fullWidth
        variant="outlined"
        sx={{
          mt: 1,
          borderRadius: 5,
          py: 1,
          fontSize: '1rem',
          textTransform: 'none'
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  )
}

export default CartSummary