import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'

function OrderHistoryTab({ orders }) {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />
    case 'shipped':
      return <LocalShippingIcon sx={{ color: 'info.main' }} />
    case 'pending':
      return <PendingIcon sx={{ color: 'warning.main' }} />
    default:
      return <ShoppingCartIcon sx={{ color: 'primary.main' }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
    case 'delivered':
      return 'success'
    case 'shipped':
      return 'info'
    case 'pending':
      return 'warning'
    default:
      return 'primary'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your pet product orders will appear here
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid size={{ xs: 12, md: 6 }} key={order.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getStatusIcon(order.status)}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                        Order #{order.id}
                      </Typography>
                    </Box>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Pet:</strong> {order.petName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Items:
                  </Typography>
                  <List dense sx={{ mb: 2 }}>
                    {order.items.map((item) => (
                      <ListItem key={item.id} sx={{ px: 0 }}>
                        <ListItemText
                          primary={`${item.name} (x${item.quantity})`}
                          secondary={formatCurrency(item.total)}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Total: {formatCurrency(order.totalAmount)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default OrderHistoryTab
