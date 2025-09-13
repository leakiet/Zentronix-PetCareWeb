import { Box, Typography, Button, Card, CardContent, Grid, Chip, Avatar, Rating, Divider } from '@mui/material'
import { useState, useEffect } from 'react'
import theme from '~/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import VetList from './VetList'
import { useNavigate } from 'react-router-dom'

const VetSuggestion = ({ onVetSelect, onBack, appointmentData }) => {
  const [suggestedVets, setSuggestedVets] = useState([])
  const [allVets, setAllVets] = useState([])
  const [showAllVets, setShowAllVets] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Mock data - in real app, this would come from API
  const mockVets = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      specialization: 'General Practice',
      experience: '8 years',
      rating: 4.8,
      reviewCount: 156,
      location: 'Downtown Clinic',
      distance: '2.3 km',
      availability: 'Available today',
      price: '$80-120',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      specialties: ['General Practice', 'Surgery', 'Dentistry'],
      workingHours: 'Mon-Fri: 8AM-6PM',
      isRecommended: true,
      matchReason: 'Specializes in routine checkups and vaccinations'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      specialization: 'Emergency Medicine',
      experience: '12 years',
      rating: 4.9,
      reviewCount: 203,
      location: 'Emergency Pet Hospital',
      distance: '1.8 km',
      availability: 'Available now',
      price: '$120-180',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      specialties: ['Emergency Medicine', 'Surgery', 'Critical Care'],
      workingHours: '24/7 Emergency',
      isRecommended: true,
      matchReason: 'Expert in emergency cases and urgent care'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      specialization: 'Dermatology',
      experience: '6 years',
      rating: 4.7,
      reviewCount: 89,
      location: 'Pet Dermatology Center',
      distance: '3.1 km',
      availability: 'Available tomorrow',
      price: '$100-150',
      image: 'https://images.unsplash.com/photo-1594824388852-8a0b1b4b9b8b?w=150&h=150&fit=crop&crop=face',
      specialties: ['Dermatology', 'Allergy Treatment', 'Skin Surgery'],
      workingHours: 'Mon-Thu: 9AM-5PM',
      isRecommended: false,
      matchReason: 'Specialist in skin conditions and allergies'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Wilson',
      specialization: 'Internal Medicine',
      experience: '15 years',
      rating: 4.9,
      reviewCount: 234,
      location: 'Advanced Pet Care',
      distance: '4.2 km',
      availability: 'Available this week',
      price: '$90-130',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      specialties: ['Internal Medicine', 'Cardiology', 'Oncology'],
      workingHours: 'Mon-Fri: 7AM-7PM',
      isRecommended: true,
      matchReason: 'Expert in complex medical conditions'
    },
    {
      id: 5,
      firstName: 'Lisa',
      lastName: 'Anderson',
      specialization: 'Behavioral Medicine',
      experience: '10 years',
      rating: 4.6,
      reviewCount: 67,
      location: 'Pet Behavior Clinic',
      distance: '5.5 km',
      availability: 'Available next week',
      price: '$70-100',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      specialties: ['Behavioral Medicine', 'Training', 'Anxiety Treatment'],
      workingHours: 'Tue-Sat: 10AM-6PM',
      isRecommended: false,
      matchReason: 'Specialist in behavioral issues and training'
    }
  ]

  useEffect(() => {
    const fetchVets = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const filteredVets = mockVets.filter(vet => {
        const reason = appointmentData?.reason?.toLowerCase() || ''
        if (reason.includes('emergency')) return vet.specialization.toLowerCase().includes('emergency')
        if (reason.includes('skin')) return vet.specialization.toLowerCase().includes('dermatology')
        if (reason.includes('behavior')) return vet.specialization.toLowerCase().includes('behavioral')
        if (reason.includes('routine') || reason.includes('checkup') || reason.includes('vaccination'))
          return vet.specialization.toLowerCase().includes('general')
        return true
      })

      const sortedVets = filteredVets.sort((a, b) => {
        if (a.isRecommended && !b.isRecommended) return -1
        if (!a.isRecommended && b.isRecommended) return 1
        return b.rating - a.rating
      })

      setSuggestedVets(sortedVets.slice(0, 3))
      setAllVets(sortedVets)
      setLoading(false)
    }

    fetchVets()
  }, [appointmentData])

  // 👉 Khi chọn Vet thì push sang /appointment và truyền state
  const handleSelectVet = (vet) => {
    navigate('/appointment', {
      state: {
        appointmentData,
        selectedVet: vet
      }
    })
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.textSub }}>
          Finding the best veterinarians for your pet...
        </Typography>
      </Box>
    )
  }


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

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.textSub }}>
          Finding the best veterinarians for your pet...
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: theme.palette.primary.main,
            mr: 2
          }}
        >
          Back
        </Button>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold'
          }}
        >
          Recommended Veterinarians
        </Typography>
      </Box>

      {/* Appointment Summary */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          border: `2px solid ${theme.palette.primary.secondary}`,
          borderRadius: 3
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Appointment Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Pet:</strong> {appointmentData?.petName || 'Selected Pet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Reason:</strong> {appointmentData?.reason || 'Not specified'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Location:</strong> {appointmentData?.userLocation ? 'Near you' : 'Any location'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Priority:</strong> {appointmentData?.reason?.toLowerCase().includes('emergency') ? 'High' : 'Normal'}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Recommended Vets */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: theme.palette.primary.main,
            fontWeight: 'bold'
          }}
        >
          Our Recommendations
        </Typography>
        
        <Grid container spacing={3}>
          {suggestedVets.map((vet) => (
            <Grid size={{ xs: 12, md: 4 }} key={vet.id}>
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
                  {/* Recommended Badge */}
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

                  {/* Vet Info */}
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
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Dr. {vet.firstName} {vet.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {vet.specialization}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

                  {/* Match Reason */}
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: theme.palette.primary.main,
                      fontStyle: 'italic'
                    }}
                  >
                    {getMatchReason(vet)}
                  </Typography>

                  {/* Details */}
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
                    <Typography variant="body2" color="text.secondary">
                      Price: {vet.price}
                    </Typography>
                  </Box>

                  {/* Specialties */}
                  <Box sx={{ mb: 2 }}>
                    {vet.specialties.slice(0, 2).map((specialty) => (
                      <Chip
                        key={specialty}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        sx={{
                          mr: 1,
                          mb: 1,
                          borderColor: theme.palette.primary.secondary,
                          color: theme.palette.primary.main
                        }}
                      />
                    ))}
                  </Box>

                  {/* Select Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectVet(vet)
                    }}
                  >
                    Select This Vet
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Show All Vets Toggle */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => setShowAllVets(!showAllVets)}
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: 'white'
            }
          }}
        >
          {showAllVets ? 'Show Only Recommendations' : 'View All Available Vets'}
        </Button>
      </Box>

      {/* All Vets List */}
      {showAllVets && (
        <VetList
          vets={allVets}
          onVetSelect={onVetSelect}
          appointmentData={appointmentData}
        />
      )}
    </Box>
  )
}

export default VetSuggestion
