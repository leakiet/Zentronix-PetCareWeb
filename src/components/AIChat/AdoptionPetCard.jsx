import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button
} from '@mui/material'
import { Pets, Male, Female } from '@mui/icons-material'

/**
 * Component to display individual pet adoption information in a card format
 * @param {Object} pet - Pet data from AdoptionListingsResponse
 * @param {Function} onAdoptClick - Callback when adopt button is clicked
 */
function AdoptionPetCard({ pet, onAdoptClick }) {
  const navigate = useNavigate()
  console.log('AdoptionPetCard rendered for pet:', pet.petName, pet)

  const handleAdoptClick = () => {
    console.log('Adopt clicked for pet:', pet.petName, 'ID:', pet.id || pet.petId)

    // Navigate to adoption detail page
    const petId = pet.id || pet.petId
    if (petId) {
      navigate(`/adoption/${petId}`)
    } else {
      console.error('Pet ID not found:', pet)
    }

    // Still call parent callback if provided (for additional logic)
    if (onAdoptClick) {
      onAdoptClick(pet)
    }
  }

  return (
    <Card sx={{
      maxWidth: '100%',
      mb: 2,
      mx: 'auto',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      {/* Pet Image */}
      <CardMedia
        component="img"
        height="180"
        image={pet.image || '/placeholder-pet.jpg'}
        alt={pet.petName}
        sx={{
          objectFit: 'cover',
          bgcolor: 'grey.100'
        }}
      />

      <CardContent sx={{ pb: 1 }}>
        {/* Pet Name and Basic Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Pets sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {pet.petName}
          </Typography>
        </Box>

        {/* Species and Breed */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <strong>Species:</strong> {pet.species}
          </Typography>
          {pet.breed?.name && (
            <Typography variant="body2" color="text.secondary">
              <strong>Breed:</strong> {pet.breed.name}
            </Typography>
          )}
        </Box>

        {/* Age and Gender */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip
            label={`${pet.age} years old`}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Chip
            icon={pet.gender === 'MALE' ? <Male /> : <Female />}
            label={pet.gender === 'MALE' ? 'Male' : 'Female'}
            size="small"
            variant="outlined"
            color={pet.gender === 'MALE' ? 'primary' : 'secondary'}
          />
        </Box>

        {/* Description */}
        {pet.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {pet.description}
          </Typography>
        )}

        {/* Adopt Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleAdoptClick}
          sx={{
            mt: 1,
            fontWeight: 600,
            textTransform: 'none'
          }}
        >
          Learn More & Adopt
        </Button>
      </CardContent>
    </Card>
  )
}

export default AdoptionPetCard
