import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider
} from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { getRequestsByAdoptionListingIdAPI, updateAdoptionRequestStatusAPI, approveAdoptionRequestAndRejectOthersAPI } from '~/apis'
import { toast } from 'react-toastify'
import theme from '~/theme'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

const AdoptionRequestDetail = () => {
  const { id } = useParams()
  const listingId = id
  const user = useSelector(selectCurrentCustomer)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10)

  useEffect(() => {
    if (listingId) {
      fetchRequests()
    } else {
      setLoading(false)
    }
  }, [listingId])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await getRequestsByAdoptionListingIdAPI(listingId)
      setRequests(data)
    } catch (err) {
      setError('Failed to load adoption requests.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (requestId, status) => {
    try {
      setUpdating(requestId)
      await updateAdoptionRequestStatusAPI({ requestId, status })
      toast.success(`Request ${status.toLowerCase()} successfully!`)
      await fetchRequests()
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const handleApproveAndRejectOthers = async (requestId, ownerId) => {
    try {
      setUpdating(requestId)
      await approveAdoptionRequestAndRejectOthersAPI(requestId, ownerId)
      toast.success('Request approved and others rejected successfully!')
      await fetchRequests()
    } catch (err) {
      console.error(err)
      toast.error('Failed to approve request and reject others.')
    } finally {
      setUpdating(null)
    }
  }

  const visibleRequests = requests.slice(0, visibleCount)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  const listing = requests[0]?.adoptionListing

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3, background: theme.palette.background.main }}>
        {listing && (
          <>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              Adoption Listing Details
            </Typography>
            <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="600"
                image={listing.image}
                alt={listing.petName}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {listing.petName} ({listing.breed.name})
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Age: {listing.age} years | Gender: {listing.gender}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Description:</strong> {listing.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Species:</strong> {listing.species} | Status: {listing.status} | Adoption Status: {listing.adoptionStatus}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Adoption Requests
        </Typography>
        {visibleRequests.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 5 }}>
            No adoption requests found.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {visibleRequests.map((request) => (
                <Grid item xs={12} md={6} lg={4} key={request.id}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2 }}>{request.user.fullName.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {request.user.fullName}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {request.user.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Message:</strong> {request.message}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Distance:</strong> {request.distance}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Status:</strong> {request.status}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Chip
                          label={request.status}
                          color={
                            request.status === 'PENDING' ? 'warning' :
                              request.status === 'APPROVED' ? 'success' : 'error'
                          }
                          size="small"
                        />
                        {request.status === 'PENDING' && (
                          <Box>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<CheckCircle />}
                              onClick={() => handleApproveAndRejectOthers(request.id, request.user.id)}
                              disabled={updating === request.id}
                              sx={{ mr: 1 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Cancel />}
                              onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                              disabled={updating === request.id}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {visibleCount < requests.length && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setVisibleCount(prev => prev + 10)}
                >
                  View More
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
      <Footer />
    </Box>
  )
}

export default AdoptionRequestDetail
