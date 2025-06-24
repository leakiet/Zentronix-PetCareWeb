import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { categories } from '~/apis/mockData'
import AutoCompleteSearchItem from '~/pages/customer/Blogs/BlogFilter/SearchItem/AutoCompleteSearchItem'

const CategoryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f5f7fa',
  color: 'black',
  fontWeight: 600,
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  borderRadius: '20px',
  border: '1px solid #e0e0e0',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
    borderColor: theme.palette.grey[400]
  },
  fontSize: '0.8rem',
  boxShadow: 'none'
}))


const BlogFilter = () => {
//   const handleSearch = () => {
//     console.log('Search clicked')
//   }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, maxWidth: 800, mb: 5 }}>
        {categories.map((category, index) => (
          <CategoryButton key={index}>
            {category}
          </CategoryButton>
        ))}
      </Box>

      <Box sx={{ maxWidth: 400, mb: 5 }}>
        <AutoCompleteSearchItem />
      </Box>
    </Box>
  )
}

export default BlogFilter