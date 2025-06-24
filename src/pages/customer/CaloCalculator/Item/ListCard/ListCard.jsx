import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Card from './Card/Card'
import Typography from '@mui/material/Typography'
import theme from '~/theme'
const ListCard = ({ title, index }) => {
  return (
    <Box>
      <Box sx={{
        my: 4
      }}>
        <Typography variant="h5" display="flex" alignItems="center" gap={1}>
          <Box>
            <Typography variant="h6" sx={{
              borderRadius: '50% !important',
              border: '1px solid ' + theme.colorSchemes.light.palette.text.primary,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.7,
              color: 'white',
              backgroundColor: theme.colorSchemes.light.palette.text.primary
            }}>{index}</Typography>
          </Box>
          {title}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: { xs: 2, md: 3 } }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                image="https://res.cloudinary.com/quyendev/image/upload/v1750412902/rddyt77xawppdjxywsc0.jpg"
                label="Bánh mì"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}
export default ListCard