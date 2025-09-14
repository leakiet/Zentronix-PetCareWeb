import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Alert
} from '@mui/material'
import AdoptionPetCard from './AdoptionPetCard'

/**
 * Component to display a list of pet adoption cards
 * @param {Object} adoptionData - AdoptionListingsAiResponse containing message and adoption array
 * @param {Function} onAdoptClick - Callback when adopt button is clicked on any pet
 */
function AdoptionListingsDisplay({ adoptionData, onAdoptClick }) {
  if (!adoptionData || !adoptionData.adoption || adoptionData.adoption.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        {adoptionData?.message || 'No pets available for adoption at this time.'}
      </Alert>
    )
  }



  const handleAdoptClick = (pet) => {
    if (onAdoptClick) {
      onAdoptClick(pet)
    }
  }

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {/* Optional message from AI */}
      {adoptionData.message && (
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
            borderLeft: 4,
            borderLeftColor: 'primary.main'
          }}
        >
          {adoptionData.message}
        </Typography>
      )}

      {/* Pet Cards Grid */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {adoptionData.adoption.map((pet, index) => (
          <Grid item xs={12} sm={6} md={6} key={pet.id || index}>
            <AdoptionPetCard
              pet={pet}
              onAdoptClick={handleAdoptClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Footer message */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: 'center', fontStyle: 'italic' }}
      >
        Contact shelters directly for adoption inquiries
      </Typography>
    </Box>
  )
}

export default AdoptionListingsDisplay
