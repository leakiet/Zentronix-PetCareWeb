import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { mealPackages } from '~/apis/mockData'
import { selectCurrentMeal } from '~/redux/meal/mealSlice'
import SearchIcon from '@mui/icons-material/Search'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SaveIcon from '@mui/icons-material/Save'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import theme from '~/theme'
import CardMenu from '~/components/FoodCard/CardMenu'
import { calcCustomTotal, getSuggestedMeals } from '~/utils/nutrition'

const DrawerInfo = ({ onClose }) => {
  const selected = useSelector(selectCurrentMeal)
  const customTotal = calcCustomTotal(selected)
  const suggestedMeals = getSuggestedMeals(customTotal, mealPackages)

  const handleOrderCustom = () => {
    alert('You have successfully ordered a custom meal!')
  }

  const handleSaveCustom = () => {
    alert('Your custom meal has been saved!')
  }

  const handleCloseDrawer = () => {
    onClose()
  }


  return (
    <Box sx={{ p: 3, width: '100%', bgcolor: theme.palette.primary.card }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon sx={{ color: theme.palette.primary.secondary }} />
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Healthy Meals Just For You</Typography>
          </Box>
          <Box sx={{ width: '10rem', height: '0.2rem', bgcolor: theme.palette.primary.secondary, borderRadius: 2 }} />
        </Box>
        <IconButton
          onClick={handleCloseDrawer}
          sx={{
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.text
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* card */}
      <Box sx={{ mx: 2 }}>
        <Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FastfoodIcon sx={{ color: theme.palette.primary.secondary }} />
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Suggestions for meals similar to the one you just created</Typography>
          </Box>
          <Grid container spacing={2}>
            {suggestedMeals.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <CardMenu item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: theme.palette.primary.card }}>
          <Box sx={{ width: '90%', height: '0.2rem', mx: 'auto', mb: 4, bgcolor: theme.palette.text.primary, borderRadius: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <LocalOfferIcon sx={{ color: theme.palette.primary.secondary }} />
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Or order your custom meal</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <TrendingUpIcon sx={{ color: theme.palette.primary.secondary }} />
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Calories: {Math.round(customTotal.calories)} kcal |
              Protein: {Math.round(customTotal.protein)}g |
              Carbs: {Math.round(customTotal.carbs)}g |
              Fat: {Math.round(customTotal.fat)}g
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<ShoppingCart />}
              sx={{ mt: 2, borderRadius: 5 }}
              onClick={handleOrderCustom}
            >
              Order custom meal
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<SaveIcon />}
              sx={{ mt: 2, borderRadius: 5 }}
              onClick={handleSaveCustom}
            >
              Save custom meal
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DrawerInfo