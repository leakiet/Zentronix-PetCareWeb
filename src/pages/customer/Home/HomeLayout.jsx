import AppBar from '~/components/AppBar/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import PetsIcon from '@mui/icons-material/Pets'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import SupportIcon from '@mui/icons-material/Support'
import { HealthAndSafety, Pets, Support } from '@mui/icons-material'
import Footer from '~/components/Footer/Footer'
import Testimonials from './Testimonials/Testimonials'
import PetCareSteps from './PetCareSteps/PetCareSteps'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'
import VideoTop from './Hero/Hero'
const HomeLayout = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <AppBar />
      {/* Hero Section */}
      <Box
        sx={{
          mt: theme.fitbowl.appBarHeight,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.secondary} 100%)`,
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <VideoTop/>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              mb: 6,
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            FUR SHIELD PET CARE SERVICES
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 5,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <HealthAndSafetyIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Pet Health Monitoring
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Comprehensive health tracking and monitoring for your beloved pets with AI-powered insights and regular check-ups.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.secondary,
                    color: theme.palette.primary.secondary,
                    borderRadius: 10,
                    '&:hover': {
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white'
                    }
                  }}
                >
                  Start Monitoring
                </Button>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 5,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <PetsIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Pet Adoption Services
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Find your perfect companion through our verified adoption platform with detailed pet profiles and matching system.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/adoption')}
                  sx={{
                    borderColor: theme.palette.primary.secondary,
                    color: theme.palette.primary.secondary,
                    borderRadius: 10,
                    '&:hover': {
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white'
                    }
                  }}
                >
                  Find Your Pet
                </Button>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 5,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <SupportIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.secondary,
                    mb: 2
                  }}
                />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Smart AI Pet Consultation
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Get instant AI-powered advice for your pet&apos;s health, nutrition, and behavior concerns from certified pet care experts.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/chat')}
                  sx={{
                    borderColor: theme.palette.primary.secondary,
                    color: theme.palette.primary.secondary,
                    borderRadius: 10,
                    '&:hover': {
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white'
                    }
                  }}
                >
                  Get Expert Help
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pet Care Steps Section */}
      <PetCareSteps />

      {/* Why Choose Fur Shield Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}
          >
            Why Choose Fur Shield?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              mb: 6,
              color: theme.palette.text.textSub,
              fontWeight: 400
            }}
          >
            Advanced technology meets compassionate care for your beloved pets
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 4,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <HealthAndSafety
                  sx={{
                    fontSize: 64,
                    color: theme.palette.primary.secondary,
                    mb: 3
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  AI-Powered Health Monitoring
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Advanced artificial intelligence continuously monitors your pet&apos;s health, detecting potential issues before they become serious problems.
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 4,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Pets
                  sx={{
                    fontSize: 64,
                    color: theme.palette.primary.secondary,
                    mb: 3
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Expert Veterinary Network
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Access to certified veterinarians and specialists through our extensive network, ensuring your pet receives the best possible care.
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 4,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Support
                  sx={{
                    fontSize: 64,
                    color: theme.palette.primary.secondary,
                    mb: 3
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  24/7 Emergency Support
                </Typography>
                <Typography sx={{ mb: 3, color: theme.palette.text.textSub }}>
                  Round-the-clock emergency support when you need it most. Our team is always ready to help with urgent pet care situations.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          <Box textAlign="center" sx={{ mt: 6 }}>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: theme.palette.text.textSub,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Join thousands of pet owners who trust Fur Shield to provide exceptional care for their beloved companions.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/about-us')}
              sx={{
                borderColor: theme.palette.primary.secondary,
                color: theme.palette.primary.secondary,
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: 10,
                '&:hover': {
                  bgcolor: theme.palette.primary.secondary,
                  color: 'white'
                }
              }}
            >
              Learn More About Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 'bold'
            }}
          >
            Ready to give your pet the care they deserve?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9
            }}
          >
            Comprehensive pet health monitoring and expert AI consultation!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            sx={{
              bgcolor: theme.palette.primary.secondary,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                color: theme.palette.primary.main
              },
              borderRadius: 10
            }}
          >
            Start Consultation
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                OUR MISSION
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontWeight: 'bold',
                  color: theme.palette.primary.main
                }}
              >
                Protecting and nurturing the bond between pets and their owners
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: theme.palette.text.textSub
                }}
              >
                Through comprehensive pet care solutions including health monitoring,
                adoption services, and expert AI consultation, Fur Shield is committed
                to ensuring your pets live healthy, happy lives while strengthening
                the human-animal bond.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontStyle: 'italic',
                  color: theme.palette.primary.main
                }}
              >
                Pet care is not just about health, but also about understanding and loving our animal companions.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about-us')}
                sx={{
                  borderColor: theme.palette.primary.secondary,
                  color: theme.palette.primary.secondary,
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  borderRadius: 10,
                  '&:hover': {
                    bgcolor: theme.palette.primary.secondary,
                    color: 'white'
                  }
                }}
              >
                Learn more
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2070&auto=format&fit=crop"
                alt="Happy pets with their owners"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Testimonials />

      <Footer />
    </Box>
  )
}
export default HomeLayout