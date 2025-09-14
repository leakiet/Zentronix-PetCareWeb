import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'
import {
  ExpandMore,
  Search,
  Help,
  Pets,
  HealthAndSafety,
  Support,
  LocalHospital,
  QuestionAnswer
} from '@mui/icons-material'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const faqData = [
    {
      category: 'General Questions',
      icon: <Help sx={{ color: theme.palette.primary.secondary }} />,
      questions: [
        {
          id: 'general-1',
          question: 'What is Fur Shield?',
          answer: 'Fur Shield is a comprehensive pet care platform that provides AI-powered health monitoring, adoption services, veterinary consultation, and emergency support for pet owners. We combine technology with expert veterinary care to ensure your pets receive the best possible protection and care.'
        },
        {
          id: 'general-2',
          question: 'How does the AI consultation work?',
          answer: 'Our AI consultation system analyzes your pet&apos;s symptoms, behavior patterns, and health data to provide instant recommendations. While AI provides initial guidance, all critical health concerns are escalated to certified veterinarians for professional medical advice.'
        },
        {
          id: 'general-3',
          question: 'Is Fur Shield available 24/7?',
          answer: 'Yes! Our emergency hotline and AI consultation services are available 24/7. However, our veterinary offices operate Monday-Friday from 8:00 AM to 6:00 PM. Emergency veterinary care is always available through our network of partner clinics.'
        }
      ]
    },
    {
      category: 'Pet Health Monitoring',
      icon: <HealthAndSafety sx={{ color: theme.palette.primary.secondary }} />,
      questions: [
        {
          id: 'health-1',
          question: 'How accurate is the health monitoring system?',
          answer: 'Our AI-powered health monitoring system has been trained on millions of pet health records and achieves 95% accuracy in detecting common health issues. However, it should be used as a complementary tool alongside regular veterinary check-ups, not as a replacement for professional medical care.'
        },
        {
          id: 'health-2',
          question: 'What health metrics can be tracked?',
          answer: 'We can track vital signs (heart rate, temperature, breathing), activity levels, eating habits, behavior patterns, and weight changes. Our system also monitors for signs of illness, stress, or unusual behavior that might indicate health concerns.'
        },
        {
          id: 'health-3',
          question: 'How often should I update my pet\'s health data?',
          answer: 'We recommend updating your pet&apos;s health data daily for the most accurate monitoring. The system will alert you if any concerning patterns are detected and suggest when veterinary consultation is needed.'
        }
      ]
    },
    {
      category: 'Pet Adoption',
      icon: <Pets sx={{ color: theme.palette.primary.secondary }} />,
      questions: [
        {
          id: 'adoption-1',
          question: 'How do I find the right pet for my lifestyle?',
          answer: 'Our AI matching system considers your lifestyle, living situation, activity level, and preferences to recommend pets that would be the best fit for you. We also provide detailed profiles of each pet including their personality, medical history, and care requirements.'
        },
        {
          id: 'adoption-2',
          question: 'What is the adoption process like?',
          answer: 'The adoption process includes an initial application, home visit assessment, meeting with the pet, and a trial period. All adopted pets come with complete medical records, vaccination history, and a 30-day health guarantee.'
        },
        {
          id: 'adoption-3',
          question: 'Are all pets in your adoption program healthy?',
          answer: 'All pets in our adoption program receive comprehensive veterinary examinations, vaccinations, and any necessary treatments before being made available for adoption. We ensure every pet is healthy and ready for their forever home.'
        }
      ]
    },
    {
      category: 'Emergency Services',
      icon: <LocalHospital sx={{ color: theme.palette.primary.secondary }} />,
      questions: [
        {
          id: 'emergency-1',
          question: 'What should I do in a pet emergency?',
          answer: 'Call our 24/7 emergency hotline immediately at +84 123 456 789. Our emergency team will provide immediate guidance and direct you to the nearest emergency veterinary clinic. Stay calm and provide as much information as possible about your pet\'s condition.'
        },
        {
          id: 'emergency-2',
          question: 'How quickly can I get emergency veterinary care?',
          answer: 'Our network of emergency veterinary clinics ensures that help is available within 30 minutes in most urban areas. For life-threatening emergencies, emergency services can be at your location within 15-20 minutes.'
        },
        {
          id: 'emergency-3',
          question: 'Are emergency services covered by insurance?',
          answer: 'Emergency services are typically covered by most pet insurance policies. We work with all major insurance providers and can help you navigate the claims process during emergency situations.'
        }
      ]
    },
    {
      category: 'Support & Services',
      icon: <Support sx={{ color: theme.palette.primary.secondary }} />,
      questions: [
        {
          id: 'support-1',
          question: 'How do I contact customer support?',
          answer: 'You can reach our customer support team through multiple channels: phone (+84 123 456 789), email (support@furshield.vn), or through our website contact form. Our support team is available Monday-Friday, 8:00 AM - 6:00 PM.'
        },
        {
          id: 'support-2',
          question: 'Do you offer mobile veterinary services?',
          answer: 'Yes, we offer mobile veterinary services for routine check-ups, vaccinations, and minor treatments. Our mobile vets can come to your home or office for your convenience. Emergency mobile services are available for critical situations.'
        },
        {
          id: 'support-3',
          question: 'Can I schedule recurring veterinary appointments?',
          answer: 'Absolutely! We offer recurring appointment scheduling for vaccinations, dental cleanings, health check-ups, and preventive care. Our system will send you reminders and can automatically reschedule if needed.'
        }
      ]
    }
  ]

  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

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
            FREQUENTLY ASKED QUESTIONS
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
            Got Questions? We&apos;ve Got Answers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              color: theme.colorSchemes.light.palette.text.textSub,
              fontSize: '1.2rem',
              mb: 4
            }}
          >
            Find answers to the most common questions about Fur Shield&apos;s pet care services, from health monitoring to adoption support.
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: '600px', mx: 'auto' }} data-aos="fade-up" data-aos-delay="200">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: theme.palette.primary.secondary, mr: 1 }} />,
                sx: {
                  borderRadius: 3,
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.secondary
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
          </Box>
        </Box>

        {/* FAQ Categories */}
        <Container maxWidth="lg">
          {filteredFaqs.map((category, categoryIndex) => (
            <Box key={category.category} sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay={categoryIndex * 100}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                {category.icon}
                <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                  {category.category}
                </Typography>
              </Box>

              {category.questions.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleChange(faq.id)}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.primary.secondary}`,
                    '&:before': { display: 'none' },
                    boxShadow: 'none'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: theme.palette.primary.secondary }} />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center'
                      }
                    }}
                  >
                    <QuestionAnswer sx={{ mr: 2, color: theme.palette.primary.secondary }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.textSub, lineHeight: 1.7 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}

          {filteredFaqs.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }} data-aos="fade-up">
              <Typography variant="h5" sx={{ color: theme.palette.text.textSub, mb: 2 }}>
                No results found for &quot;{searchTerm}&quot;
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.textSub }}>
                Try adjusting your search terms or browse our categories above.
              </Typography>
            </Box>
          )}
        </Container>

        {/* Still Need Help Section */}
        <Box
          sx={{
            py: 8,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            textAlign: 'center'
          }}
          data-aos="fade-up"
        >
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Still Need Help?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, fontSize: '1.1rem' }}>
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you with any questions about your pet&apos;s care.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    borderRadius: 3,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Support
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: theme.palette.primary.secondary,
                    borderRadius: 3,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(0, 179, 137, 0.9)'
                    }
                  }}
                  onClick={() => window.location.href = '/chat'}
                >
                  AI Consultation
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    borderRadius: 3,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white'
                    }
                  }}
                  onClick={() => window.location.href = 'tel:+84123456789'}
                >
                  Call Emergency
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default FAQ
