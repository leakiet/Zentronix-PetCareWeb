import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[200],
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Social Media Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' } }}>
          Connect with us on social media:
        </Typography>
        <Box>
          {[
            { icon: <Facebook />, link: '#' },
            { icon: <Twitter />, link: '#' },
            { icon: <Google />, link: '#' },
            { icon: <Instagram />, link: '#' },
            { icon: <LinkedIn />, link: '#' },
            { icon: <GitHub />, link: '#' }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              color="inherit"
              sx={{ mx: 1, '&:hover': { color: 'primary.main' } }}
            >
              {item.icon}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={5}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Company Name
            </Typography>
            <Typography variant="body2">
              This is where you can organize footer content. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.
            </Typography>
          </Grid>

          {/* Products */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            {['Angular', 'React', 'Vue', 'Laravel'].map((product, index) => (
              <Link
                key={index}
                href="#!"
                variant="body2"
                display="block"
                color="inherit"
                sx={{ mb: 1 }}
              >
                {product}
              </Link>
            ))}
          </Grid>

          {/* Useful Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            {['Pricing', 'Settings', 'Orders', 'Help'].map((link, index) => (
              <Link
                key={index}
                href="#!"
                variant="body2"
                display="block"
                color="inherit"
                sx={{ mb: 1 }}
              >
                {link}
              </Link>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              New York, NY 10012, US
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +01 234 567 88
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Fax: +01 234 567 89
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Section */}
      <Box
        sx={{
          mt: 3,
          py: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">
          © 2023 Copyright:{' '}
          <Link href="https://mui.com/" color="inherit">
            MUI.com
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer