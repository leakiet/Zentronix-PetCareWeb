import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'
import {
  HealthAndSafety,
  Search,
  Favorite,
  Verified
} from '@mui/icons-material'

const PetCareSteps = () => {
  const navigate = useNavigate()

  const careSteps = {
    assess: {
      step: 1,
      title: 'Health Assessment',
      description: 'Complete health profile and initial assessment for your pet.',
      icon: <HealthAndSafety sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=2070&auto=format&fit=crop'
    },
    monitor: {
      step: 2,
      title: 'Daily Monitoring',
      description: 'AI-powered tracking of health metrics and behavior patterns.',
      icon: <Search sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop'
    },
    care: {
      step: 3,
      title: 'Personalized Care',
      description: 'Customized care plans tailored to your pet\'s specific needs.',
      icon: <Favorite sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop'
    },
    protect: {
      step: 4,
      title: 'Ongoing Protection',
      description: 'Continuous monitoring and expert support for your pet\'s well-being.',
      icon: <Verified sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop'
    }
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            Your Pet Care Journey
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.secondary,
              fontWeight: 'bold'
            }}
          >
            FOUR STEPS TO COMPLETE PET PROTECTION
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {Object.values(careSteps).map((step, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={step.step}>
              <Box
                sx={{
                  position: 'relative',
                  height: '450px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundImage: `url(${step.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {step.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: theme.palette.primary.secondary,
                      mb: 1
                    }}
                  >
                    STEP {step.step}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#fff',
                      mb: 2
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#fff',
                      lineHeight: 1.6,
                      opacity: 0.9
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            sx={{
              bgcolor: theme.palette.primary.secondary,
              px: 4,
              py: 1.5,
              borderRadius: 8,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(0, 179, 137, 0.9)'
              }
            }}
          >
            Start Your Pet Care Journey
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default PetCareSteps
