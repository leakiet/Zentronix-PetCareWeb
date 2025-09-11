import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import theme from '~/theme'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotalQuantity, selectCartTotalPrice, selectCartTotalItems, removeFromCart } from '~/redux/cart/cartSlice'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
  }
}))

const CartItem = ({ item, onItemClick, onRemoveItem }) => {
  return (
    <MenuItem
      key={item.cartId}
      onClick={onItemClick}
      sx={{
        px: 2,
        py: 1.5,
        display: 'block',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
        minHeight: 'auto',
        cursor: 'pointer'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', position: 'relative' }}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onRemoveItem(item.cartId)
          }}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' },
            width: 24,
            height: 24,
            zIndex: 1
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Avatar
          src={item.image}
          alt={item.name}
          sx={{ width: 60, height: 60, borderRadius: 1, flexShrink: 0 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{
            fontWeight: 500,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {item.totalPrice.toLocaleString()} VND
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Quantity:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
    </MenuItem>
  )
}

const Cart = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const totalItems = useSelector(selectCartTotalItems)
  const totalAmount = useSelector(selectCartTotalPrice)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleViewCart = () => {
    setAnchorEl(null)
    navigate('/cart')
  }

  const handleItemClick = () => {
    setAnchorEl(null)
    navigate('/cart')
  }

  const handleRemoveItem = (cartId) => {
    setItemToRemove(cartId)
    setConfirmDialogOpen(true)
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
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Cart">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={anchorEl ? 'cart-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <StyledBadge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="cart-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              width: 320,
              maxHeight: 490,
              borderRadius: 3,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {totalItems} PRODUCTS
          </Typography>
          <Button
            variant="text"
            onClick={handleViewCart}
            sx={{
              color: theme.palette.primary.main,
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            VIEW CART
          </Button>
        </Box>

        {totalItems === 0 ? (
          <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            maxHeight: 240,
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '3px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)'
              }
            }
          }}>
            {cartItems.map((item) => (
              <CartItem
                key={item.cartId}
                item={item}
                onItemClick={handleItemClick}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </Box>
        )}

        <Divider />

        {totalItems > 0 && (
          <Box sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              TOTAL:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {totalAmount.toLocaleString()} VND
            </Typography>
          </Box>
        )}

        {totalItems > 0 && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleViewCart}
              sx={{
                backgroundColor: theme.palette.primary.secondary,
                borderRadius: 3,
                color: 'white',
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        )}
      </Menu>

      <ConfirmModal
        open={confirmDialogOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Confirm Remove Item"
        description="Are you sure you want to remove this item from the cart?"
        btnName="Remove"
      />
    </>
  )
}

export default Cart