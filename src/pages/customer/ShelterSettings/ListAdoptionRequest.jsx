import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { fetchAdoptionListingsByShelterIdAPI, updateAdoptionRequestStatusAPI } from '~/apis'
import { toast } from 'react-toastify'
import theme from '~/theme'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

const ListAdoptionRequest = () => {
  const user = useSelector(selectCurrentCustomer)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('ALL')

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
      const data = await fetchAdoptionListingsByShelterIdAPI(user.id)
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
      await fetchRequests()
    } catch (err) {
      toast.error('Failed to update request status.')
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const filteredRequests = selectedStatus === 'ALL' ? requests : requests.filter(listing => listing.adoptionStatus === selectedStatus)

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
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3, background: theme.palette.background.main }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Adoption Listings for Your Shelter
        </Typography>
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Filter by Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="ADOPTED">Adopted</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>
        {filteredRequests.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 5, height: '60vh' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              No adoption listings found.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredRequests.map((listing) => (
              <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={listing.id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        label={listing.adoptionStatus}
                        color={
                          listing.adoptionStatus === 'PENDING' ? 'warning' :
                            listing.adoptionStatus === 'ADOPTED' ? 'success' : 'default'
                        }
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        component={Link}
                        to={`/shelter-settings/${listing.id}`}
                      >
                        View Requests
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </Box>
  )
}

export default ListAdoptionRequest
