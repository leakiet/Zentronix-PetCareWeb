import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import PET_IMG from '~/assets/images/auth-bg.png'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '90vh',
        minHeight: 400,
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 1,
          left: 0,
          top: 0
        }}
        src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,0.6)',
          zIndex: 2,
          left: 0,
          top: 0
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 4, md: 8 }
        }}
      >

        <Box
          sx={{
            flex: { xs: 'none', md: 1 },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '50%' }
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
              mb: { xs: 2, md: 4 },
              opacity: 0.9,
              position: 'relative'
            }}
          >
            FUR SHIELD EXPERIENCE
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: { xs: 2, md: 4 },
              position: 'relative'
            }}
          >
            Your trusted pet care companion
          </Typography>
        </Box>

        <Box
          sx={{
            flex: { xs: 'none', md: 1 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: { xs: '100%', md: '50%' }
          }}
        >
          <Box
            component="img"
            src={PET_IMG}
            alt="Pet Care Hero Image"
            sx={{
              width: { xs: '80%', sm: '60%', md: '100%' },
              maxWidth: { xs: 300, sm: 400, md: 500 },
              height: 'auto',
              borderRadius: { xs: 2, md: 4 },
              boxShadow: {
                xs: '0 4px 20px rgba(0,0,0,0.3)',
                md: '0 8px 32px rgba(0,0,0,0.4)'
              },
              objectFit: 'cover',
              position: 'relative',
              zIndex: 1,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: { xs: 'none', md: 'scale(1.05)' }
              }
            }}
          />
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          zIndex: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 3 },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: 'bold',
            borderRadius: 10,
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 1 },
            textTransform: 'none',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            minWidth: { xs: '100%', sm: 'auto' }
          }}
          onClick={() => navigate('/chat')}
        >
          Start Consultation
        </Button>
        <Typography
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.1rem' },
            opacity: 0.85,
            flex: 1,
            maxWidth: { xs: '100%', sm: 'none' }
          }}
        >
          Discover our comprehensive pet care services!
        </Typography>
      </Box>
    </Box>
  )
}

export default Hero
