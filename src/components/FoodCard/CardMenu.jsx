import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCartItemQuantity, removeFromCart, selectCartItems } from '~/redux/cart/cartSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'


const CardMenu = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)

  const cartItems = useSelector(selectCartItems)
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id) || null

  const handleNavigateToDetail = (slug) => {
    navigate(`/menu/${slug}`)
  }

  const handleAddToCart = () => {
    dispatch(addToCart(item))
  }

  const handleIncrease = () => {
    if (!cartItem) return
    dispatch(updateCartItemQuantity({ cartId: cartItem.cartId, quantity: cartItem.quantity + 1 }))
  }

  const handleDecrease = () => {
    if (!cartItem) return
    if (cartItem.quantity > 1) {
      dispatch(updateCartItemQuantity({ cartId: cartItem.cartId, quantity: cartItem.quantity - 1 }))
    } else {
      setItemToRemove(cartItem.cartId)
      setConfirmDialogOpen(true)
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 5,
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: theme.palette.primary.card,
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{ objectFit: 'cover', cursor: 'pointer', p: 2, width: '100%', height: 200 }}
            onClick={() => handleNavigateToDetail(item.slug)}
          />
        </Box>
        <CardContent sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary,
              cursor: 'pointer'
            }} onClick={() => handleNavigateToDetail(item.slug)}>
              {item.name}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                my: 1,
                height: '40px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}
            >
              {item.description}
            </Typography>
          </Box>
          <Box sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" sx={{
              fontWeight: 800,
              color: theme.palette.text.textSub
            }}>
              {formatPrice(item.price)}
            </Typography>
            {cartItem ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={handleDecrease}
                  sx={{
                    color: theme.palette.primary.secondary,
                    '&:hover': {
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white'
                    }
                  }}
                >
                  <RemoveIcon fontSize="medium" />
                </IconButton>
                <Typography sx={{ mx: 1, fontWeight: 600 }}>
                  {cartItem.quantity}
                </Typography>
                <IconButton
                  onClick={handleIncrease}
                  sx={{
                    color: theme.palette.primary.secondary,
                    '&:hover': {
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white'
                    }
                  }}
                >
                  <AddIcon fontSize="medium" />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={handleAddToCart}
                sx={{
                  color: theme.palette.primary.secondary,
                  '&:hover': {
                    bgcolor: theme.palette.primary.secondary,
                    color: 'white'
                  }
                }}
              >
                <ShoppingCart fontSize="medium" />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
      <ConfirmModal
        open={confirmDialogOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Confirm Remove Item"
        content="Are you sure you want to remove this item from the cart?"
      />
    </>
  )
}

export default CardMenu