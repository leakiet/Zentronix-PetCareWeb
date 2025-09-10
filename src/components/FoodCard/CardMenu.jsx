import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'


const CardMenu = ({ item }) => {
  const navigate = useNavigate()

  const handleNavigateToDetail = (slug) => {
    navigate(`/menu/${slug}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 5,
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        backgroundColor: theme.palette.primary.card,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{ objectFit: 'cover', cursor: 'pointer', p: 2, width: '100%' }}
          onClick={() => handleNavigateToDetail(item.slug)}
        />
        {/* <Typography variant='h6' sx={{
          fontWeight: 500,
          position: 'absolute',
          height: '40px',
          width: '40px',
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.9rem',
          borderRadius: '50%',
          top: 10,
          left: 20,
          color: theme.palette.text.primary,
          bgcolor: theme.palette.primary.secondary,
          cursor: 'pointer'
        }} onClick={() => handleNavigateToDetail(item.slug)}>
          {item.category}
        </Typography> */}
      </Box>
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h5' sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.text.primary,
            cursor: 'pointer'
          }} onClick={() => handleNavigateToDetail(item.slug)}>
            {item.name}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              my: 1,
              height: '40px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'normal'
            }}
          >
            {item.description}
          </Typography>
        </Box>
        <Box sx={{
          mt: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{
            fontWeight: 800,
            color: theme.palette.text.textSub
          }}>
            {formatPrice(item.price)}
          </Typography>
          <IconButton
            sx={{
              color: theme.palette.primary.secondary,
              '&:hover': {
                bgcolor: theme.palette.primary.secondary,
                color: 'white'
              }
            }}
          >
            <ShoppingCart fontSize="medium" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardMenu