import AppBar from '~/components/AppBar/AppBar'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { newsItems } from '~/apis/mockData'
import NewsCard from './BlogList/BlogList'
import BlogFilter from './BlogFilter/BlogFilter'
import Footer from '~/components/Footer/Footer'
const RedUnderline = styled(Box)(({ theme }) => ({
  height: '4px',
  width: '60px',
  backgroundColor: '#e31b23',
  marginBottom: theme.spacing(4),
  borderRadius: '2px'
}))


const BlogLayout = () => {
  const handleSearch = () => {
    console.log('Search clicked')
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      <AppBar />
      <Box
        sx={{
          mt: (theme) => theme.fitbowl.appBarHeight,
          maxWidth: 1600,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          pt: { xs: 4, md: 6 },
          pb: { xs: 8, md: 10 }
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1.5,
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.08em'
          }}
        >
          BLOG
        </Typography>
        <RedUnderline />

        <BlogFilter />

        <Grid container spacing={{ xs: 2, md: 4 }}>
          <NewsCard item={newsItems} />
        </Grid>
      </Box>
      <Footer/>
    </Box>
  )
}

export default BlogLayout