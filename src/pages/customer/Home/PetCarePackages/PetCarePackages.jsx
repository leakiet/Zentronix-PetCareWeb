import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'
import {
  HealthAndSafety,
  Pets,
  Support,
  Star
} from '@mui/icons-material'

const PetCarePackages = () => {
  const navigate = useNavigate()

  const carePackages = [
    {
      title: 'Basic Care',
      price: '29,000 VND/month',
      icon: <HealthAndSafety sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      features: [
        'Health monitoring dashboard',
        'Basic AI consultation (5/month)',
        'Emergency hotline access',
        'Monthly health reports',
        'Email support'
      ],
      popular: false,
      buttonText: 'Get Started'
    },
    {
      title: 'Premium Care',
      price: '59,000 VND/month',
      icon: <Pets sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      features: [
        'Everything in Basic Care',
        'Unlimited AI consultation',
        'Priority emergency response',
        'Weekly veterinary check-ins',
        'Mobile vet services (2/month)',
        '24/7 phone support'
      ],
      popular: true,
      buttonText: 'Most Popular'
    },
    {
      title: 'Ultimate Protection',
      price: '99,000 VND/month',
      icon: <Support sx={{ fontSize: 48, color: theme.palette.primary.secondary }} />,
      features: [
        'Everything in Premium Care',
        'Home veterinary visits',
        'Advanced health analytics',
        'Emergency transportation',
        'Pet insurance coordination',
        'Dedicated care coordinator'
      ],
      popular: false,
      buttonText: 'Go Ultimate'
    }
  ]

  return (
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
          Choose Your Care Package
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
          Comprehensive pet care solutions tailored to your needs
        </Typography>

        <Grid container spacing={4}>
          {carePackages.map((pkg, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  borderRadius: 3,
                  border: pkg.popular ? `2px solid ${theme.palette.primary.secondary}` : '1px solid #e0e0e0',
                  boxShadow: pkg.popular ? '0 8px 25px rgba(0, 179, 137, 0.15)' : '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {pkg.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: theme.palette.primary.secondary,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Star sx={{ fontSize: 16 }} />
                    MOST POPULAR
                  </Box>
                )}

                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 3 }}>
                    {pkg.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: theme.palette.primary.main
                    }}
                  >
                    {pkg.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      color: theme.palette.primary.secondary
                    }}
                  >
                    {pkg.price}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    {pkg.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          mb: 1,
                          color: theme.palette.text.textSub,
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          '&:before': {
                            content: '"✓"',
                            color: theme.palette.primary.secondary,
                            fontWeight: 'bold',
                            mr: 1
                          }
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>

                  <Button
                    variant={pkg.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    onClick={() => navigate('/contact')}
                    sx={{
                      borderRadius: 8,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      ...(pkg.popular ? {
                        bgcolor: theme.palette.primary.secondary,
                        '&:hover': {
                          bgcolor: 'rgba(0, 179, 137, 0.9)'
                        }
                      } : {
                        borderColor: theme.palette.primary.secondary,
                        color: theme.palette.primary.secondary,
                        '&:hover': {
                          bgcolor: theme.palette.primary.secondary,
                          color: 'white'
                        }
                      })
                    }}
                  >
                    {pkg.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
            All packages include our core AI health monitoring technology and 24/7 emergency support.
            Cancel or change your plan anytime.
          </Typography>
          <Button
            variant="text"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              color: theme.palette.primary.secondary,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: 'rgba(0, 179, 137, 0.1)'
              }
            }}
          >
            Compare All Features
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default PetCarePackages
