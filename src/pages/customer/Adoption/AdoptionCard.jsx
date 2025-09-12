import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import WcIcon from '@mui/icons-material/Wc'
import PetsIcon from '@mui/icons-material/Pets'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import theme from '~/theme'

const AdoptionCard = ({ listing }) => {

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: 6
        },
        background: theme.palette.primary.card,
        overflow: 'hidden'
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={listing.image}
        alt={listing.petName}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ minHeight: 240 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            {listing.petName}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {listing.description}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <CalendarTodayIcon sx={{ mr: 1, fontSize: 16 }} /> Age: {listing.age} | <WcIcon sx={{ mr: 1, fontSize: 16 }} /> Gender: {listing.genderPet}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <PetsIcon sx={{ mr: 1, fontSize: 16 }} /> Breed: {listing.breed.name} | <CategoryIcon sx={{ mr: 1, fontSize: 16 }} /> Species: {listing.species.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1, fontSize: 16 }} /> Location: {listing.location}
          </Typography>

          <Chip
            label={listing.status}
            color={listing.status === 'AVAILABLE' ? 'success' : 'default'}
            sx={{ mb: 2, fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FavoriteIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Adopt
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AdoptionCard