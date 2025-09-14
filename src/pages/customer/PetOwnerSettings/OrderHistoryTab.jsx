import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear'
import FilterListIcon from '@mui/icons-material/FilterList'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { fetchOrdersByPetOwnerAPI } from '~/apis'

function OrderHistoryTab() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const currentCustomer = useSelector(selectCurrentCustomer)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentCustomer?.id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await fetchOrdersByPetOwnerAPI(currentCustomer.id)
        setOrders(response || [])
        setFilteredOrders(response || [])
      } catch {
        setError('Failed to load order history. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentCustomer?.id])

  // Filter orders based on status and date range
  useEffect(() => {
    let filtered = [...orders]

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order =>
        (order.status || 'pending').toLowerCase() === statusFilter.toLowerCase()
      )
    }

    // Filter by date range
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      filtered = filtered.filter(order => {
        const orderDate = order.orderDate ? new Date(order.orderDate) : null
        return orderDate && orderDate >= fromDate
      })
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999) // Include the entire day
      filtered = filtered.filter(order => {
        const orderDate = order.orderDate ? new Date(order.orderDate) : null
        return orderDate && orderDate <= toDate
      })
    }

    setFilteredOrders(filtered)
  }, [orders, statusFilter, dateFrom, dateTo])

  const handleClearFilters = () => {
    setStatusFilter('all')
    setDateFrom('')
    setDateTo('')
  }
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

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Order History
      </Typography>

      {/* Filter Controls */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FilterListIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: 'fit-content' }}>
            Filters
          </Typography>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="From Date"
            type="date"
            size="small"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <TextField
            label="To Date"
            type="date"
            size="small"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <Button
            variant="outlined"
            size="small"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            sx={{ minWidth: 'fit-content' }}
          >
            Clear Filters
          </Button>
        </Box>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading order history...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : filteredOrders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orders.length === 0
              ? 'Your pet product orders will appear here'
              : 'Try adjusting your filter criteria'
            }
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredOrders.length} of {orders.length} orders
          </Typography>

          <Grid container spacing={2}>
            {filteredOrders.map((order) => (
              <Grid size={{ xs: 12 }} key={order.id}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Header Row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getStatusIcon(order.status || 'pending')}
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                            {order.orderCode || `Order #${order.id}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={order.status || 'Pending'}
                        color={getStatusColor(order.status || 'pending')}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>

                    {/* Items Section */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        Items ({order.orderItems?.length || 0})
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                        {order.orderItems?.map((item) => (
                          <Card key={item.id} variant="outlined" sx={{ minWidth: 200, flexShrink: 0 }}>
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                {item.productImage && (
                                  <Box
                                    component="img"
                                    src={item.productImage}
                                    alt={item.productName}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      objectFit: 'cover',
                                      borderRadius: 1,
                                      border: '1px solid #e0e0e0'
                                    }}
                                  />
                                )}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                                    {item.productName || 'Product'}
                                  </Typography>
                                  {item.productDescription && (
                                    <Typography variant="caption" color="text.secondary" sx={{
                                      display: 'block',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {item.productDescription.length > 30
                                        ? `${item.productDescription.substring(0, 30)}...`
                                        : item.productDescription}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                  Qty: {item.quantity}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                  ${(item.totalPrice)?.toFixed(2)}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        )) || []}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Footer Row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          Total: ${order.totalAmount?.toFixed(2) || '0.00'}
                        </Typography>
                        {order.shippingAddress && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            📍 {order.shippingAddress.street}, {order.shippingAddress.ward}, {order.shippingAddress.city}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                          Payment: {order.paymentMethod || 'COD'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default OrderHistoryTab
