import { Box, Typography, Grid, Button } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalItems, updateCartItemQuantity, removeFromCart } from '~/redux/cart/cartSlice'
import CartSummary from './CartSummary'
import CartItem from './CartItem'
import { useState } from 'react'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)

  const cartItems = useSelector(selectCartItems)
  const totalItems = useSelector(selectCartTotalItems)

  const handleBackToMenu = () => {
    navigate('/menu')
  }

  const updateQuantity = (cartId, newQuantity) => {
    dispatch(updateCartItemQuantity({ cartId, quantity: newQuantity }))
  }

  const handleRemoveItem = (cartId) => {
    setItemToRemove(cartId)
    setConfirmDialogOpen(true)
  }

  const handleDecrease = (cartId) => {
    const item = cartItems.find(item => item.cartId === cartId)
    if (item && item.quantity > 1) {
      updateQuantity(cartId, item.quantity - 1)
    } else {
      handleRemoveItem(cartId)
    }
  }

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeFromCart(itemToRemove))
    }
    setConfirmDialogOpen(false)
    setItemToRemove(null)
  }

  const handleCancelRemove = () => {
    setConfirmDialogOpen(false)
    setItemToRemove(null)
  }

  return (
    <Box>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight }}>
        <Box sx={{ mx: 2 }}>
          <Box sx={{ pt: 2, pb: 1, ml: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToMenu}
              sx={{ borderRadius: 5, color: theme.palette.text.primary }}
              aria-label="Back to Menu"
            >
              Back to Menu
            </Button>
          </Box>

          {totalItems === 0 ? (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              textAlign: 'center',
              bgcolor: theme.palette.background.main,
              borderRadius: 5,
              mx: 2,
              p: 4
            }}>
              <Box sx={{
                bgcolor: 'white',
                borderRadius: '50%',
                p: 3,
                mb: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <Typography variant="h1" sx={{ fontSize: '4rem', opacity: 0.3 }}>
                  🛒
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom color="text.primary" sx={{ fontWeight: 600 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '400px' }}>
                Looks like you haven&apos;t added any products to your cart yet. Start shopping!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleBackToMenu}
                  sx={{
                    borderRadius: 5,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none'
                  }}
                >
                  Browse Menu
                </Button>
              </Box>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" color="text.primary" sx={{ fontWeight: 600 }}>
                      Your Cart
                    </Typography>
                    <Box sx={{
                      bgcolor: 'primary.light',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 3,
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}>
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </Box>
                  </Box>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.cartId}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onDecrease={handleDecrease}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{
                  p: 2,
                  position: 'sticky',
                  top: theme.fitbowl.appBarHeight,
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  width: '100%',
                  marginTop: 'auto'
                }}>
                  <CartSummary />
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <Footer />
      <ConfirmModal
        open={confirmDialogOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Confirm Remove Item"
        description="Are you sure you want to remove this item from the cart?"
        btnName="Remove"
      />
    </Box>
  )
}

export default Cart
