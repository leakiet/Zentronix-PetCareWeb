import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  return (
    <Box sx={{ backgroundColor: theme.colorSchemes.light.palette.background.default }}>
      <AppBar />
      <Box sx={{ maxWidth: '1280px', mx: 'auto', py: 6, mt: theme.fitbowl.appBarHeight }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', my: { xs: 20, md: 25 }, px: 2 }} data-aos="fade-up">
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: theme.colorSchemes.light.palette.text.textSub, mb: 2 }}
          >
            OUR STORY
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: theme.colorSchemes.light.palette.text.primary,
              lineHeight: 1.2
            }}
          >
            At Fur Shield, every pet care solution is a promise to protect and nurture the human-animal bond.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              maxWidth: '800px',
              mx: 'auto',
              color: theme.colorSchemes.light.palette.text.textSub,
              fontSize: '1.2rem'
            }}
          >
            We're your trusted partner in pet wellness, providing comprehensive AI-driven solutions that protect and care for your beloved companions, tailored to their unique needs and personalities.
          </Typography>
          {/* <Button
            variant="text"
            sx={{
              mt: 3,
              color: theme.colorSchemes.light.palette.primary.secondary,
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Scroll to Discover
          </Button> */}
        </Box>

        {/* Mission Section (Text over Image) */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: '600px', md: '600px' },
            display: 'flex',
            overflow: 'hidden',
            width: { xs: '100vw', md: '100vw' },
            left: { md: '50%' },
            right: { md: '50%' },
            marginLeft: { md: '-50vw' },
            marginRight: { md: '-50vw' },
            maxWidth: { xs: '100%', md: '100vw' },
            alignItems: 'center',
            justifyContent: 'center'
          }}
          data-aos="fade-up"
        >
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2070&auto=format&fit=crop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              filter: 'brightness(0.5)'
            }}
            alt="Happy pets and owners"
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 3,
              p: { xs: 2, md: 8 },
              borderRadius: '10px',
              maxWidth: { xs: '95vw', sm: '90vw', md: '800px' },
              width: { xs: '95vw', sm: '90vw', md: 'auto' },
              mx: 'auto',
              color: '#fff',
              textAlign: 'center',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: '#fff', mb: 3 }}
            >
              OUR MISSION
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                color: '#fff',
                mb: 3,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              We help you build a loving and protective relationship with your pets.
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.8 }}>
              Using advanced AI, Fur Shield creates comprehensive pet care solutions including health monitoring, adoption services, and expert consultation tailored to your pet's unique needs and characteristics. We aim to inspire a deeper connection between you and your pets, empowering you to make conscious choices that protect and nurture your animal companions.
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.8, mt: 2 }}>
              Our vision is a world where every pet receives the care and protection they deserve, strengthening the human-animal bond one loving connection at a time.
            </Typography>
          </Box>
        </Box>

        {/* Values Section (Hover Effect) */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 8, textAlign: 'center' }} data-aos="fade-up">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: theme.colorSchemes.light.palette.text.primary,
              mb: 6
            }}
          >
            OUR VALUES
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} data-aos="zoom-in">
              <Box
                sx={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover .valueText': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 179, 137, 0.8)' // theme.colorSchemes.light.palette.primary.secondary
                  }
                }}
              >
                <Box
                  className="valueText"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#fff', mb: 2 }}
                  >
                    Compassionate Care
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    Every interaction with Fur Shield is filled with genuine care and empathy, ensuring your pet receives the love and attention they deserve.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} data-aos="zoom-in" data-aos-delay="100">
              <Box
                sx={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover .valueText': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 179, 137, 0.8)'
                  }
                }}
              >
                <Box
                  className="valueText"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#fff', mb: 2 }}
                  >
                    Personalized Approach
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    We recognize that every pet is unique, providing tailored care solutions that address their individual needs, personality, and health requirements.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} data-aos="zoom-in" data-aos-delay="200">
              <Box
                sx={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2070&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover .valueText': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 179, 137, 0.8)'
                  }
                }}
              >
                <Box
                  className="valueText"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#fff', mb: 2 }}
                  >
                    Trusted Partnership
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    We build lasting partnerships with pet owners, becoming a trusted companion in your journey of responsible pet care and companionship.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} data-aos="zoom-in" data-aos-delay="300">
              <Box
                sx={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover .valueText': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 179, 137, 0.8)'
                  }
                }}
              >
                <Box
                  className="valueText"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#fff', mb: 2 }}
                  >
                    Expert Guidance
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    Our team of veterinary experts and pet care specialists provide clear, actionable guidance to help you make informed decisions for your pet's health and well-being.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Technique Section */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 8 }} data-aos="fade-up">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop"
                style={{ width: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                alt="AI technology for pet care"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} data-aos="fade-left">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, color: theme.colorSchemes.light.palette.text.primary }}
                >
                  OUR AI TECHNOLOGY
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: theme.colorSchemes.light.palette.primary.secondary }}
                >
                  Smart Care, Smart Pets!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.colorSchemes.light.palette.text.textSub, lineHeight: 1.8 }}
                >
                  Our AI technology intelligently monitors your pet's health patterns, analyzing behavior, nutrition, and wellness data. Each insight is carefully processed to provide personalized recommendations that keep your pets healthy and happy.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.colorSchemes.light.palette.text.textSub, lineHeight: 1.8 }}
                >
                  We use advanced machine learning algorithms with veterinary expertise, ensuring accurate assessments and no artificial shortcuts, letting the true needs of your pets guide our recommendations.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Philosophy Section */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 8, textAlign: 'center' }} data-aos="fade-up">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: theme.colorSchemes.light.palette.text.primary,
              mb: 6
            }}
          >
            Our Philosophy to Responsible Pet Care
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }} data-aos="zoom-in">
              <Box sx={{ p: 3, borderRadius: '10px', height: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2070&auto=format&fit=crop"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', mb: 2 }}
                  alt="Pet health monitoring"
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.colorSchemes.light.palette.text.primary, mb: 2 }}
                >
                  Health Monitoring Excellence
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colorSchemes.light.palette.text.textSub }}
                >
                  Our AI-powered health monitoring provides comprehensive insights, tracking vital signs and behavior patterns for proactive pet care.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} data-aos="zoom-in" data-aos-delay="100">
              <Box sx={{ p: 3, borderRadius: '10px', height: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=2070&auto=format&fit=crop"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', mb: 2 }}
                  alt="Pet adoption"
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.colorSchemes.light.palette.text.primary, mb: 2 }}
                >
                  Adoption Support Network
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colorSchemes.light.palette.text.textSub }}
                >
                  We connect loving homes with pets in need, using AI matching algorithms to ensure the perfect companionship for both pets and owners.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} data-aos="zoom-in" data-aos-delay="200">
              <Box sx={{ p: 3, borderRadius: '10px', height: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', mb: 2 }}
                  alt="Veterinary care"
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.colorSchemes.light.palette.text.primary, mb: 2 }}
                >
                  Expert Veterinary Network
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colorSchemes.light.palette.text.textSub }}
                >
                  Our network of certified veterinarians provides expert consultation and emergency support, ensuring your pets receive the best medical care.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default AboutUs