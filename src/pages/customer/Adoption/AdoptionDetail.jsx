import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AppBar from '~/components/AppBar/AppBar'
import { adoptionListing } from '~/apis/mockData'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import WcIcon from '@mui/icons-material/Wc'
import PetsIcon from '@mui/icons-material/Pets'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const AdoptionDetail = () => {
  const theme = useTheme()
  const listing = adoptionListing[0] // Assuming first listing for demo, replace with actual data

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
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {listing.description}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} /> Age: {listing.age}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <WcIcon sx={{ mr: 1, fontSize: 20 }} /> Gender: {listing.genderPet}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PetsIcon sx={{ mr: 1, fontSize: 20 }} /> Breed: {listing.breed.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <CategoryIcon sx={{ mr: 1, fontSize: 20 }} /> Species: {listing.species.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} /> Location: {listing.location}
              </Typography>
              <Chip
                label={listing.status}
                color={listing.status === 'AVAILABLE' ? 'success' : 'default'}
                sx={{ mb: 2, fontWeight: 'bold' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FavoriteIcon />}
                sx={{ borderRadius: 2, fontWeight: 'bold' }}
              >
                Adopt Now
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AdoptionDetail