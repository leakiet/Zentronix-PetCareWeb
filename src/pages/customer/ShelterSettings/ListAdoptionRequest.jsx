import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  Divider
} from '@mui/material'
import { CheckCircle, Cancel, Pending } from '@mui/icons-material'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { getRequestsByShelterIdAPI, updateAdoptionRequestStatusAPI } from '~/apis'
import { toast } from 'react-toastify'

const ADOPTION_REQUEST_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

const ListAdoptionRequest = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentCustomer)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(null) // ID của request đang update

  useEffect(() => {
    if (user && user.role === 'SHELTER') {
      fetchRequests()
    } else {
      setError('You are not authorized to view this page.')
      setLoading(false)
    }
  }, [user])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await getRequestsByShelterIdAPI(user.id)
      setRequests(data)
    } catch (err) {
      setError('Failed to load adoption requests.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (requestId, status) => {
    try {
      setUpdating(requestId)
      await updateAdoptionRequestStatusAPI({ requestId, status })
      toast.success(`Request ${status.toLowerCase()} successfully!`)
      // Refresh list
      await fetchRequests()
    } catch (err) {
      toast.error('Failed to update request status.')
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Adoption Requests for Your Shelter
      </Typography>
      {requests.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 5 }}>
          No adoption requests found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.map((request) => (
            <Grid item xs={12} md={6} lg={4} key={request.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={request.adoptionListing.image}
                  alt={request.adoptionListing.petName}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {request.adoptionListing.petName} ({request.adoptionListing.breed.name})
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Age: {request.adoptionListing.age} years | Gender: {request.adoptionListing.gender}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      {request.user.firstName?.[0] || 'U'}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {request.user.fullName}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Message:</strong> {request.message}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Distance:</strong> {request.distance}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip
                      icon={
                        request.status === ADOPTION_REQUEST_STATUS.ACCEPTED ? <CheckCircle /> :
                          request.status === ADOPTION_REQUEST_STATUS.REJECTED ? <Cancel /> : <Pending />
                      }
                      label={request.status}
                      color={
                        request.status === ADOPTION_REQUEST_STATUS.ACCEPTED ? 'success' :
                          request.status === ADOPTION_REQUEST_STATUS.REJECTED ? 'error' : 'warning'
                      }
                      size="small"
                    />
                    {request.status === ADOPTION_REQUEST_STATUS.PENDING && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleUpdateStatus(request.id, ADOPTION_REQUEST_STATUS.ACCEPTED)}
                          disabled={updating === request.id}
                        >
                          {updating === request.id ? 'Updating...' : 'Accept'}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUpdateStatus(request.id, ADOPTION_REQUEST_STATUS.REJECTED)}
                          disabled={updating === request.id}
                        >
                          {updating === request.id ? 'Updating...' : 'Reject'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ListAdoptionRequest
