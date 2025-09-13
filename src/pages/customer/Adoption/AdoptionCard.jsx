import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import WcIcon from '@mui/icons-material/Wc'
import PetsIcon from '@mui/icons-material/Pets'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'

const AdoptionCard = ({ listing }) => {
  const navigate = useNavigate()

  const handleDetailsClick = () => {
    navigate(`/adoption/${listing.id}`)
  }

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
        overflow: 'hidden',
        cursor: 'pointer' // Thêm cursor pointer để chỉ ra có thể click
      }}
      onClick={handleDetailsClick} // Thêm onClick để navigate khi click vào card
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


          <Typography variant="body2" sx={{ mb: 1 }}>
            Age: {listing.age}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender: {listing.gender}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Breed: {listing.breed.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Species: {listing.species}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Address: {listing.shelter?.address?.street || ''} {listing.shelter?.address?.ward || ''} {listing.shelter?.address?.city || ''} {listing.shelter?.address?.latitude || ''} {listing.shelter?.address?.longitude || ''}
          </Typography>

          <Chip
            label={listing.adoptionStatus}
            color={listing.adoptionStatus === 'AVAILABLE' ? 'success' : 'default'}
            sx={{ mb: 2, fontWeight: 'bold' }}
          />
        </Box>

        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<FavoriteIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Adoption
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
            onClick={(e) => {
              e.stopPropagation() // Ngăn event bubble lên card
              handleDetailsClick()
            }}
          >
            Details
          </Button>
        </Box> */}
      </CardContent>
    </Card>
  )
}

export default AdoptionCard