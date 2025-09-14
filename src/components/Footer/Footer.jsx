import { useState, useEffect } from 'react'
import ChatBox from '~/components/AIChat/ChatBox'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import theme from '~/theme'
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub
} from '@mui/icons-material'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.primary.secondary,
        color: 'white',
        borderTop: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        animation: isVisible
          ? 'slideUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)'
          : 'none',
        '@keyframes slideUp': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {/* Social Media */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 5 },
          py: 3,
          borderBottom: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: { xs: 'none', md: 'block' },
            fontWeight: 500,
            letterSpacing: '0.5px'
          }}
        >
Connect with Fur Shield on social media:
        </Typography>
        <Box>
          {[
            { icon: <Facebook />, link: 'https://facebook.com/furshield', name: 'Facebook' },
            { icon: <Twitter />, link: 'https://twitter.com/furshield', name: 'Twitter' },
            { icon: <Instagram />, link: 'https://instagram.com/furshield', name: 'Instagram' },
            { icon: <LinkedIn />, link: 'https://linkedin.com/company/furshield', name: 'LinkedIn' },
            { icon: <GitHub />, link: 'https://github.com/furshield', name: 'GitHub' }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              aria-label={`Follow Fur Shield on ${item.name}`}
              sx={{
                mx: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#81c784',
                  transform: 'translateY(-3px) scale(1.1)'
                }
              }}
            >
              {item.icon}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Pet Care Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.primary.text,
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              Fur Shield
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                lineHeight: 1.6,
                fontSize: '0.9rem'
              }}
            >
              Your trusted companion for comprehensive pet care solutions,
              from nutrition and health monitoring to adoption services and veterinary support.
            </Typography>

            {/* App Store Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 3,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Link
                href="https://apps.apple.com/app/fur-shield/id123456789" // Placeholder - update with actual App Store ID
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block', mr: 2 }}
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download Fur Shield on App Store"
                  style={{
                    height: '45px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=com.furshield.app" // Placeholder - update with actual package name
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block' }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Download Fur Shield on Google Play"
                  style={{
                    height: '45px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              </Link>
            </Box>
          </Grid>

          {/* Tính năng */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.primary.text,
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Features
            </Typography>
            {[
              { label: 'AI Pet Consultation', href: '/chat' },
              { label: 'Nutrition Guidance', href: '/about-us' },
              { label: 'Pet Health Tracking', href: '/about-us' },
              { label: 'Adoption Services', href: '/adoption' },
              { label: 'Veterinary Support', href: '/schedule' }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                variant="body2"
                display="block"
                color="inherit"
                sx={{
                  mb: 1.5,
                  opacity: 0.8,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.primary.text,
                    transform: 'translateX(5px)'
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </Grid>
          <ChatBox />

          {/* Useful Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.primary.text,
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Useful Links
            </Typography>
            {[
              { label: 'About Us', href: '/about-us' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Support', href: '/contact' }
            ].map(
              (item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  variant="body2"
                  display="block"
                  color="inherit"
                  sx={{
                    mb: 1.5,
                    opacity: 0.8,
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: theme.palette.primary.text,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: theme.palette.primary.text,
                fontWeight: 600
              }}
            >
              Get In Touch
            </Typography>
            <Box component="address" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Ho Chi Minh City, Vietnam
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Email:{' '}
                <Link href="mailto:support@furshield.vn" color="inherit">
                  support@furshield.vn
                </Link>
              </Typography>
              <Typography variant="body2">
                Phone:{' '}
                <Link href="tel:+84123456789" color="inherit">
                  +84 123 456 789
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Quick Stats */}
          <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.text,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Quick Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    ✓ 10,000+ Pets Protected
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    ✓ 50+ Certified Veterinarians
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    ✓ 24/7 Emergency Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    ✓ AI-Powered Health Monitoring
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.text,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Business Hours
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    🕒 Monday - Friday: 8:00 AM - 6:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    🕒 Saturday: 9:00 AM - 4:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    🕒 Sunday: Closed
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontWeight: 'bold' }}>
                    🚨 Emergency: 24/7 Available
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.text,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Stay Connected
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    opacity: 0.8,
                    lineHeight: 1.6,
                    mb: 2
                  }}
                >
                  Subscribe to our newsletter for pet care tips, health updates, and exclusive offers.
                </Typography>
                
              </Box>
            </Grid>
          </Grid>
        </Grid>
        </Container>

      {/* Copyright */}
      <Box
        sx={{
          py: 3,
          backgroundColor: 'rgba(27, 94, 32, 0.3)',
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.text,
                fontSize: '0.875rem'
              }}
            >
              © {new Date().getFullYear()} Fur Shield. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography
                variant="body2"
                component={Link}
                href="#"
                sx={{
                  color: 'white',
                  opacity: 0.8,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                href="#"
                sx={{
                  color: 'white',
                  opacity: 0.8,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                component={Link}
                href="/contact"
                sx={{
                  color: 'white',
                  opacity: 0.8,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    opacity: 1,
                    textDecoration: 'underline'
                  }
                }}
              >
                Contact Us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
