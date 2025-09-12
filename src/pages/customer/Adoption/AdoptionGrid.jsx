import { Grid } from '@mui/material'
import AdoptionCard from './AdoptionCard'

const AdoptionGrid = ({ filteredListings }) => {
  return (
    <Grid container spacing={3}>
      {filteredListings.map((listing) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={listing.id}>
          <AdoptionCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AdoptionGrid