import { useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PaymentIcon from '@mui/icons-material/Payment'

function Cart() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const cartItems = [
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 1, addedAt: '2025-05-29T14:00:00' },
    { id: 2, name: 'Tai nghe Sony WH-1000XM5', price: 8500000, quantity: 2, addedAt: '2025-05-28T10:00:00' },
    { id: 3, name: 'Điện thoại iPhone 14 Pro', price: 30000000, quantity: 1, addedAt: '2025-05-27T15:30:00' }
  ]

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleRemoveItem = (itemId) => {
    handleCloseMenu()
  }

  const handleViewItem = (itemId) => {
    handleCloseMenu()
  }

  const handleCheckout = () => {
    handleCloseMenu()
  }

  return (
    <Box
      onMouseLeave={handleCloseMenu}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Tooltip title="cart">
        <Badge
          color="secondary"
          badgeContent={cartItems.length}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-cart"
          aria-controls={open ? 'basic-cart-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          // onMouseOver={handleOpenMenu}
        >
          <ShoppingCartIcon sx={{ color: (theme) => theme.palette.text.primary }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-cart-drop-down"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-cart' }}
      >
        {cartItems.length === 0 && (
          <MenuItem sx={{ minWidth: 200, maxWidth: 360 }}>
            Giỏ hàng của bạn đang trống.
          </MenuItem>
        )}

        {cartItems.map((item, index) => (
          <Box key={item.id}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}
            >
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><ShoppingCartIcon fontSize="small" /></Box>
                  <Box>
                    <Typography variant="body2"><strong>{item.name}</strong></Typography>
                    <Typography variant="body2">Giá: {item.price.toLocaleString('vi-VN')} VNĐ</Typography>
                    <Typography variant="body2">Số lượng: {item.quantity}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    className="interceptor-loading"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewItem(item.id)}
                  >
                    Xem
                  </Button>
                  <Button
                    className="interceptor-loading"
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Xóa
                  </Button>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(item.addedAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {index !== cartItems.length - 1 && <Divider />}
          </Box>
        ))}

        {cartItems.length > 0 && (
          <MenuItem>
            <Button
              className="interceptor-loading"
              variant="contained"
              color="success"
              size="small"
              startIcon={<PaymentIcon />}
              onClick={handleCheckout}
              sx={{ width: '100%' }}
            >
              Thanh toán
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default Cart