import { Box, Typography, Card, CardContent, Grid, Avatar, Rating, Chip, Button, Divider } from '@mui/material'
import { useState } from 'react'
import theme from '~/theme'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import StarIcon from '@mui/icons-material/Star'

const VetList = ({ vets, onVetSelect, appointmentData }) => {
  const [sortBy, setSortBy] = useState('rating')
  const [filterSpecialty, setFilterSpecialty] = useState('all')

  const specialties = ['all', 'General Practice', 'Emergency Medicine', 'Dermatology', 'Behavioral Medicine', 'Internal Medicine']

  const filteredVets = vets.filter(vet => {
    if (filterSpecialty === 'all') return true
    return vet.specialization === filterSpecialty
  })

  const sortedVets = [...filteredVets].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      case 'price':
        return parseFloat(a.price.replace(/[^0-9]/g, '')) - parseFloat(b.price.replace(/[^0-9]/g, ''))
      case 'availability':
        return a.availability.localeCompare(b.availability)
      default:
        return 0
    }
  })

  const getMatchReason = (vet) => {
    const reason = appointmentData?.reason?.toLowerCase() || ''
    
    if (reason.includes('emergency') || reason.includes('urgent')) {
      return 'Expert in emergency cases and urgent care'
    } else if (reason.includes('skin') || reason.includes('dermatology')) {
      return 'Specialist in skin conditions and allergies'
    } else if (reason.includes('behavior') || reason.includes('training')) {
      return 'Specialist in behavioral issues and training'
    } else if (reason.includes('routine') || reason.includes('checkup') || reason.includes('vaccination')) {
      return 'Specializes in routine checkups and vaccinations'
    }
    
    return vet.matchReason || 'Experienced veterinarian for your pet\'s needs'
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        }}
      >
        All Available Veterinarians
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Filter by Specialty:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {specialties.map((specialty) => (
                <Chip
                  key={specialty}
                  label={specialty === 'all' ? 'All' : specialty}
                  onClick={() => setFilterSpecialty(specialty)}
                  variant={filterSpecialty === specialty ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: filterSpecialty === specialty ? theme.palette.primary.main : 'transparent',
                    color: filterSpecialty === specialty ? 'white' : theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: filterSpecialty === specialty ? theme.palette.primary.dark : theme.palette.primary.light
                    }
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Sort by:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {[
                { value: 'rating', label: 'Rating' },
                { value: 'distance', label: 'Distance' },
                { value: 'price', label: 'Price' },
                { value: 'availability', label: 'Availability' }
              ].map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => setSortBy(option.value)}
                  variant={sortBy === option.value ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: sortBy === option.value ? theme.palette.primary.secondary : 'transparent',
                    color: sortBy === option.value ? 'white' : theme.palette.primary.secondary,
                    borderColor: theme.palette.primary.secondary,
                    '&:hover': {
                      bgcolor: sortBy === option.value ? theme.palette.primary.dark : theme.palette.primary.light
                    }
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {sortedVets.map((vet) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={vet.id}>
            <Card
              sx={{
                height: '100%',
                border: `2px solid ${vet.isRecommended ? theme.palette.primary.secondary : '#e0e0e0'}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  borderColor: theme.palette.primary.main
                }
              }}
              onClick={() => onVetSelect(vet)}
            >
              <CardContent sx={{ p: 3 }}>
                {vet.isRecommended && (
                  <Chip
                    label="Recommended"
                    color="primary"
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={vet.image}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      border: `2px solid ${theme.palette.primary.secondary}`
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      Dr. {vet.firstName} {vet.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {vet.specialization} • {vet.experience}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating
                        value={vet.rating}
                        readOnly
                        precision={0.1}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {vet.rating} ({vet.reviewCount} reviews)
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    fontStyle: 'italic',
                    minHeight: '2.5em'
                  }}
                >
                  {getMatchReason(vet)}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.textSub }} />
                    <Typography variant="body2" color="text.secondary">
                      {vet.location} • {vet.distance}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.textSub }} />
                    <Typography variant="body2" color="text.secondary">
                      {vet.availability}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Price: {vet.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hours: {vet.workingHours}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Specialties:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {vet.specialties.map((specialty) => (
                      <Chip
                        key={specialty}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.primary.secondary,
                          color: theme.palette.primary.main,
                          fontSize: '0.75rem'
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark
                    }
                  }}
                >
                  Select This Vet
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {sortedVets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <MedicalServicesIcon
            sx={{
              fontSize: 64,
              color: theme.palette.text.textSub,
              mb: 2
            }}
          />
          <Typography variant="h6" sx={{ color: theme.palette.text.textSub }}>
            No veterinarians found matching your criteria
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
            Try adjusting your filters or check back later
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default VetList
