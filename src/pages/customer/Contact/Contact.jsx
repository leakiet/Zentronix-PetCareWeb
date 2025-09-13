import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'
import contactApi from '~/apis/contactApi'
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  Pets,
  Support,
  LocalHospital
} from '@mui/icons-material'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus(null)

    try {
      await contactApi.sendContactForm(formData)

      setSubmitStatus('success')
      setSubmitMessage('Thank you for contacting us! Your message has been sent successfully. We\'ll get back to you within 24 hours.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly at support@furshield.vn.')
      console.error('Contact form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ backgroundColor: theme.colorSchemes.light.palette.background.default }}>
      <AppBar />
      <Box sx={{ maxWidth: '1280px', mx: 'auto', py: 6, mt: theme.fitbowl.appBarHeight }}>

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', my: { xs: 6, md: 8 }, px: 2 }} data-aos="fade-up">
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: theme.colorSchemes.light.palette.text.textSub, mb: 2 }}
          >
            GET IN TOUCH
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: theme.colorSchemes.light.palette.text.primary,
              lineHeight: 1.2,
              mb: 3
            }}
          >
            Contact Fur Shield
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              color: theme.colorSchemes.light.palette.text.textSub,
              fontSize: '1.2rem'
            }}
          >
            Have questions about your pet's health? Need adoption advice? Our team of experts is here to help you provide the best care for your furry friends.
          </Typography>
        </Box>

        {/* Contact Information Cards */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }} data-aos="fade-up">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Phone sx={{ fontSize: 48, color: theme.palette.primary.secondary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Phone Support
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.textSub, mb: 2 }}>
                  24/7 Emergency Hotline
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  +84 123 456 789
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Email sx={{ fontSize: 48, color: theme.palette.primary.secondary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Email Support
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.textSub, mb: 2 }}>
                  Response within 24 hours
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  support@furshield.vn
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <LocationOn sx={{ fontSize: 48, color: theme.palette.primary.secondary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Visit Our Office
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.textSub, mb: 2 }}>
                  Ho Chi Minh City, Vietnam
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  123 Pet Care Street
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 3,
                  p: 3,
                  border: `2px solid ${theme.palette.primary.secondary}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <AccessTime sx={{ fontSize: 48, color: theme.palette.primary.secondary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Business Hours
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.textSub, mb: 1 }}>
                  Monday - Friday
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  8:00 AM - 6:00 PM
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
                  Emergency: 24/7
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Contact Form and Services */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid size={{ xs: 12, md: 8 }} data-aos="fade-right">
              <Card sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}>
                  Send us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Tell us about your pet's needs..."
                  />
                  {submitStatus && (
                    <Alert
                      severity={submitStatus}
                      sx={{ mb: 3 }}
                      onClose={() => setSubmitStatus(null)}
                    >
                      {submitMessage}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    disabled={isLoading}
                    sx={{
                      bgcolor: theme.palette.primary.secondary,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      '&:hover': {
                        bgcolor: 'rgba(0, 179, 137, 0.9)'
                      },
                      '&:disabled': {
                        bgcolor: theme.palette.grey[400]
                      }
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* Services Sidebar */}
            <Grid size={{ xs: 12, md: 4 }} data-aos="fade-left">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}>
                  Our Services
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.primary.secondary}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LocalHospital sx={{ color: theme.palette.primary.secondary }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Emergency Care
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
                          24/7 veterinary emergency services
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.primary.secondary}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Support sx={{ color: theme.palette.primary.secondary }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          AI Consultation
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
                          Instant AI-powered pet advice
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

                  <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.primary.secondary}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Pets sx={{ color: theme.palette.primary.secondary }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Adoption Support
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.textSub }}>
                          Find your perfect pet companion
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Box>

              {/* Quick Stats */}
              <Card sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.primary.main, color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Fur Shield by Numbers
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">✓ 10,000+ Pets Protected</Typography>
                  <Typography variant="body2">✓ 50+ Certified Veterinarians</Typography>
                  <Typography variant="body2">✓ 24/7 Emergency Support</Typography>
                  <Typography variant="body2">✓ AI-Powered Health Monitoring</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Contact
