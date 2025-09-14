import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { selectCartItems, selectCartTotalPrice } from '~/redux/cart/cartSlice'
import { createOrderAPI } from '~/apis'
import { toast } from 'react-toastify'
import { clearCart } from '~/redux/cart/cartSlice'
import { useDispatch } from 'react-redux'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentCustomer = useSelector(selectCurrentCustomer)
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectCartTotalPrice)
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [isLoading, setIsLoading] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [customAddress, setCustomAddress] = useState({
    street: '',
    ward: '',
    city: '',
    latitude: null,
    longitude: null
  })

  // Vietnamese Address states
  const [provinces, setProvinces] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)
  const [addressVerificationStatus, setAddressVerificationStatus] = useState('') // '', 'verifying', 'verified', 'failed'

  // Confirm Modal states
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmDescription, setConfirmDescription] = useState('')
  const [confirmBtnName, setConfirmBtnName] = useState('')

  // Helper function to open confirm modal
  const openConfirmModal = (title, description, btnName, action) => {
    setConfirmTitle(title)
    setConfirmDescription(description)
    setConfirmBtnName(btnName)
    setConfirmAction(() => action)
    setConfirmModalOpen(true)
  }

  // Helper function to close confirm modal
  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
    setConfirmAction(null)
    setConfirmTitle('')
    setConfirmDescription('')
    setConfirmBtnName('')
  }

  // Handler for confirm action
  const handleConfirmAction = async () => {
    if (confirmAction) {
      await confirmAction()
    }
    closeConfirmModal()
  }

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  // Redirect if not logged in
  if (!currentCustomer) {
    navigate('/login')
    return null
  }

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/menu')
    return null
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  // Vietnamese Address API functions
  const fetchProvinces = async () => {
    try {
      setIsLoadingAddress(true)
      const response = await fetch('https://provinces.open-api.vn/api/v2/p')
      if (!response.ok) throw new Error('Failed to fetch provinces')
      const data = await response.json()
      setProvinces(data)
    } catch {
      toast.error('Failed to load provinces')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  const fetchWards = async (provinceCode) => {
    try {
      setIsLoadingAddress(true)
      const response = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
      if (!response.ok) throw new Error('Failed to fetch wards')
      const data = await response.json()
      setWards(data.wards || [])
    } catch {
      toast.error('Failed to load wards')
    } finally {
      setIsLoadingAddress(false)
    }
  }

  // Handle province change
  const handleProvinceChange = (event, newValue) => {
    setSelectedProvince(newValue)
    setSelectedWard(null)
    setWards([])
    if (newValue) {
      fetchWards(newValue.code)
    }
  }

  // Handle ward change
  const handleWardChange = (event, newValue) => {
    setSelectedWard(newValue)
  }

  // Geocode address using OpenStreetMap Nominatim API
  const geocodeAddress = async (street, wardName, provinceName) => {
    if (!street || !provinceName) return

    setAddressVerificationStatus('verifying')

    try {
      const addressString = `${street}, ${wardName}, ${provinceName}, Vietnam`
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressString)}&limit=1`
      )
      const data = await response.json()

      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        }
      }
      return null
    } catch {
      return null
    }
  }

  const handleCustomAddressChange = (field, value) => {
    setCustomAddress(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleVerifyAddress = async () => {
    if (!customAddress.street || !selectedProvince) {
      toast.error('Please enter street address and select province/city')
      return
    }

    setIsLoading(true)
    setAddressVerificationStatus('verifying')

    try {
      const coordinates = await geocodeAddress(
        customAddress.street,
        selectedWard?.name || '',
        selectedProvince.name
      )

      if (coordinates) {
        setCustomAddress(prev => ({
          ...prev,
          ward: selectedWard?.name || '',
          city: selectedProvince.name,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        }))
        setAddressVerificationStatus('verified')
      } else {
        setAddressVerificationStatus('failed')
      }
    } catch {
      setAddressVerificationStatus('failed')
      toast.error('Failed to verify address. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseVerifiedAddress = () => {
    if (addressVerificationStatus === 'verified') {
      setIsEditingAddress(false)
    }
  }

  const handlePlaceOrder = async () => {
    // Check if using custom address and if it's verified
    if (isEditingAddress && addressVerificationStatus !== 'verified') {
      toast.error('Please verify your address before placing the order')
      return
    }

    // Check if profile address exists
    const hasProfileAddress = currentCustomer.address?.street || currentCustomer.street
    if (!isEditingAddress && !hasProfileAddress) {
      toast.error('Please enter a shipping address before placing the order')
      return
    }

    // Show confirm modal
    openConfirmModal(
      'Confirm Order',
      `Are you sure you want to place this order for $${totalPrice?.toFixed(2)}? This action cannot be undone.`,
      'Place Order',
      async () => {
        setIsLoading(true)

        try {
          // Prepare order data
          const orderData = {
            petOwnerId: currentCustomer.id,
            orderItems: cartItems.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              unitPrice: item.price
            })),
            shippingAddress: isEditingAddress ? {
              street: customAddress.street,
              ward: customAddress.ward,
              city: customAddress.city,
              latitude: customAddress.latitude,
              longitude: customAddress.longitude
            } : {
              street: currentCustomer.address?.street || currentCustomer.street || '',
              ward: currentCustomer.address?.ward || currentCustomer.ward || '',
              city: currentCustomer.address?.city || currentCustomer.city || '',
              latitude: currentCustomer.address?.latitude ? parseFloat(currentCustomer.address.latitude) : (currentCustomer.latitude ? parseFloat(currentCustomer.latitude) : null),
              longitude: currentCustomer.address?.longitude ? parseFloat(currentCustomer.address.longitude) : (currentCustomer.longitude ? parseFloat(currentCustomer.longitude) : null)
            },
            paymentMethod: paymentMethod
          }

          // Create order
          const response = await createOrderAPI(orderData)

          // Clear cart after successful order
          dispatch(clearCart())

          toast.success(`Order ${response.orderCode || `#${response.id}`} placed successfully!`)

          // Navigate to order confirmation or orders page
          navigate('/customer/orders', {
            state: {
              orderId: response.id,
              orderCode: response.orderCode,
              orderData: response
            }
          })

        } catch {
          toast.error('Failed to place order. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          mb: 4,
          fontWeight: 700,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Customer Information & Shipping Address */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, height: '560px', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              👤 Customer Information
            </Typography>
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#424242',
                  mb: 1
                }}
              >
                {currentCustomer.firstName} {currentCustomer.lastName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#616161',
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                📧 {currentCustomer.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#616161',
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                📱 {currentCustomer.phone}
              </Typography>
              {currentCustomer.companyName && (
                <Typography
                  variant="body1"
                  sx={{
                    color: '#616161',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  🏢 {currentCustomer.companyName}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              📍 Shipping Address
            </Typography>

            {!isEditingAddress ? (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Street:</strong> {currentCustomer.address?.street || currentCustomer.street || 'Not provided'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Ward:</strong> {currentCustomer.address?.ward || currentCustomer.ward || 'Not provided'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>City:</strong> {currentCustomer.address?.city || currentCustomer.city || 'Not provided'}
                </Typography>

                {(currentCustomer.address?.street || currentCustomer.street) && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Ready for delivery
                  </Alert>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsEditingAddress(true)}
                  sx={{ mb: 2 }}
                >
                  Enter Different Address
                </Button>

                {(!currentCustomer.address?.street && !currentCustomer.address?.ward && !currentCustomer.address?.city &&
                  !currentCustomer.street && !currentCustomer.ward && !currentCustomer.city) && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                      No shipping address found. Please update your profile or enter a different address.
                  </Alert>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Enter New Address:
                </Typography>

                {/* Province/City Selection */}
                <Box sx={{ marginBottom: '1em' }}>
                  <Autocomplete
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    options={provinces}
                    getOptionLabel={(option) => option.name || ''}
                    loading={isLoadingAddress}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Province/City"
                        placeholder="Select province/city"
                      />
                    )}
                    fullWidth
                  />
                </Box>

                {/* Ward Selection */}
                <Box sx={{ marginBottom: '1em' }}>
                  <Autocomplete
                    value={selectedWard}
                    onChange={handleWardChange}
                    options={wards}
                    getOptionLabel={(option) => option.name || ''}
                    loading={isLoadingAddress}
                    disabled={!selectedProvince}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ward/District"
                        placeholder="Select ward/district"
                      />
                    )}
                    fullWidth
                  />
                </Box>

                {/* Street Address */}
                <Box sx={{ marginBottom: '1em' }}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={customAddress.street}
                    onChange={(e) => handleCustomAddressChange('street', e.target.value)}
                    placeholder="Enter street address"
                  />
                </Box>

                {/* Address Verification Status */}
                {addressVerificationStatus === 'verifying' && (
                  <Box sx={{
                    marginBottom: '1em',
                    padding: '0.5em',
                    backgroundColor: '#e3f2fd',
                    borderRadius: 1,
                    border: '1px solid #2196f3'
                  }}>
                    <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                      🔄 Verifying address...
                    </Typography>
                  </Box>
                )}

                {addressVerificationStatus === 'verified' && (
                  <Box sx={{
                    marginBottom: '1em',
                    padding: '0.5em',
                    backgroundColor: '#e8f5e8',
                    borderRadius: 1,
                    border: '1px solid #4caf50'
                  }}>
                    <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                      ✅ Address verified
                    </Typography>
                  </Box>
                )}

                {addressVerificationStatus === 'failed' && (
                  <Box sx={{
                    marginBottom: '1em',
                    padding: '0.5em',
                    backgroundColor: '#ffebee',
                    borderRadius: 1,
                    border: '1px solid #f44336'
                  }}>
                    <Typography variant="caption" sx={{ color: '#c62828', fontWeight: 'bold' }}>
                      ❌ Address verification failed
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {addressVerificationStatus !== 'verified' ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleVerifyAddress}
                      disabled={isLoading || !selectedProvince || !customAddress.street}
                    >
                      {isLoading ? 'Verifying...' : 'Verify Address'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleUseVerifiedAddress}
                      color="success"
                    >
                      Use This Address
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setIsEditingAddress(false)
                      setSelectedProvince(null)
                      setSelectedWard(null)
                      setWards([])
                      setCustomAddress({
                        street: '',
                        ward: '',
                        city: '',
                        latitude: null,
                        longitude: null
                      })
                      setAddressVerificationStatus('')
                    }}
                  >
                    Cancel
                  </Button>
                </Box>

                {addressVerificationStatus === 'verified' && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    ✅ Address verified
                  </Alert>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, height: '560px' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            {/* Cart Items */}
            <Box sx={{ mb: 3 }}>
              {cartItems.map((item) => (
                <Card key={item.cartId} sx={{ mb: 2, display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80, objectFit: 'cover' }}
                    image={item.image || '/placeholder-image.jpg'}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: 1, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price?.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Total: ${item.totalPrice?.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${totalPrice?.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Payment Method */}
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="Cash on Delivery (COD)"
                />
                <FormControlLabel
                  value="ONLINE"
                  control={<Radio />}
                  label="Online Payment"
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'ONLINE' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Online payment feature is coming soon. For now, orders will be processed as COD.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/menu')}
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Continue Shopping
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={
            isLoading ||
            (!currentCustomer.address?.street && !currentCustomer.street && !isEditingAddress) ||
            (isEditingAddress && addressVerificationStatus !== 'verified')
          }
          size="medium"
          sx={{
            minWidth: 160,
            px: 3,
            py: 1,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-1px)',
              backgroundColor: 'primary.dark'
            },
            '&:disabled': {
              backgroundColor: 'grey.400',
              color: 'grey.700'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {isLoading ? 'Placing Order...' : `Place Order - $${totalPrice?.toFixed(2)}`}
        </Button>
      </Box>

      {(!currentCustomer.address?.street && !currentCustomer.address?.ward && !currentCustomer.address?.city &&
        !currentCustomer.street && !currentCustomer.ward && !currentCustomer.city && !isEditingAddress) && (
        <Alert severity="warning" sx={{ mt: 2 }}>
            Please update your shipping address in your profile or enter a different address above.
        </Alert>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title={confirmTitle}
        description={confirmDescription}
        btnName={confirmBtnName}
      />
    </Container>
  )
}

export default Checkout
