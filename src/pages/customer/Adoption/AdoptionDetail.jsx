import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppBar from '~/components/AppBar/AppBar'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import WcIcon from '@mui/icons-material/Wc'
import PetsIcon from '@mui/icons-material/Pets'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import { fetchAdoptionListingsByIdAPI, getRequestsByAdoptionListingIdAPI } from '~/apis'
import Footer from '~/components/Footer/Footer'
import AdoptionModal from '~/components/Modals/AdoptionModal/AdoptionModal'
import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { USER_ROLE } from '~/utils/constants'
import { toast } from 'react-toastify'

const AdoptionDetail = () => {
  const theme = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [adoptionRequests, setAdoptionRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAllRequests, setShowAllRequests] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const owner = useSelector(selectCurrentCustomer)

  const checkRoleOwner = () => {
    if (owner && owner.role === USER_ROLE.PET_OWNER) {
      return owner.id
    }
    return false
  }

  const handleAdoptClick = () => {
    if (!owner) {
      navigate('/login')
      return
    }
    if (owner.role !== USER_ROLE.PET_OWNER) {
      toast.error('You do not have permission to adopt. Only Pet Owners can adopt.')
      return
    }
    setModalOpen(true)
  }

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await fetchAdoptionListingsByIdAPI(id)
        setListing(data)
        const requests = await getRequestsByAdoptionListingIdAPI(id)
        setAdoptionRequests(requests)
      } catch (err) {
        setError('Failed to load adoption listing')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchListing()
    }
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    )
  }

  if (!listing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6">No listing found</Typography>
      </Box>
    )
  }

  const displayedRequests = showAllRequests ? adoptionRequests : adoptionRequests.slice(0, 5)

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} key={listing.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="400"
                image={listing.image}
                alt={listing.petName}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} key={listing.id}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                {listing.petName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} /> Age: {listing.age}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <WcIcon sx={{ mr: 1, fontSize: 20 }} /> Gender: {listing.gender}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PetsIcon sx={{ mr: 1, fontSize: 20 }} /> Breed: {listing.breed?.name || 'Unknown'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <CategoryIcon sx={{ mr: 1, fontSize: 20 }} /> Species: {listing.species}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <HealthAndSafetyIcon sx={{ mr: 1, fontSize: 20 }} /> Health Status: {listing.status}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} /> Shelter: {listing.shelter?.firstName} {listing.shelter?.lastName} ({listing.shelter?.email})
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 20 }} /> Phone: {listing.shelter?.phone || 'Not provided'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <HomeIcon sx={{ mr: 1, fontSize: 20 }} /> Address: {listing.shelter?.address?.street || ''} {listing.shelter?.address?.ward || ''} {listing.shelter?.address?.city || ''} {listing.shelter?.address?.latitude || ''} {listing.shelter?.address?.longitude || ''}
              </Typography>
              {/* <Chip
                label={listing.adoptionStatus}
                color={listing.adoptionStatus === 'AVAILABLE' ? 'success' : 'default'}
                sx={{ mb: 2, fontWeight: 'bold' }}
              /> */}
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FavoriteIcon />}
              sx={{ borderRadius: 2, fontWeight: 'bold' }}
              onClick={handleAdoptClick}
              disabled={!checkRoleOwner()}
            >
              Adopt Now
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
              {listing.description}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
              Adoption Requests ({adoptionRequests.length})
            </Typography>
            {adoptionRequests.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  {displayedRequests.map((request) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={request.id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 3,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 6
                          },
                          bgcolor: theme.palette.background.paper
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {request.user?.firstName} {request.user?.lastName}
                              </Typography>
                              <Chip
                                label={request.status}
                                color={request.status === 'PENDING' ? 'warning' : request.status === 'APPROVED' ? 'success' : 'error'}
                                size="small"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          </Stack>
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', wordWrap: 'break-word' }}>
                            <MessageIcon sx={{ mr: 1, fontSize: 16 }} />
                            {request.message}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Distance: {request.distance}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {adoptionRequests.length > 5 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowAllRequests(!showAllRequests)}
                      sx={{ borderRadius: 2 }}
                    >
                      {showAllRequests ? 'See Less' : 'See More'}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                No adoption requests yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <AdoptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        listingId={id}
        shelterId={listing?.shelter?.id}
        ownerId={1}
      />
      <Footer />
    </Box>
  )
}

export default AdoptionDetail