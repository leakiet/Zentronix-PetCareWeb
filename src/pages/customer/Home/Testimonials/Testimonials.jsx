import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import theme from '~/theme'

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
What do customers say about Fur Shield?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            mb: 6,
            color: theme.palette.text.textSub,
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.2rem' },
            textAlign: 'center'
          }}
        >
          Real experiences from pet owners who trust our services
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ p: 3, height: '100%', borderRadius: 5, boxShadow: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.secondary }}>
                  G
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Giang Duong
                  </Typography>
                  <Rating value={5} size="small" readOnly />
                </Box>
              </Box>
              <Typography sx={{
                color: theme.palette.text.textSub,
                fontStyle: 'italic',
                position: 'relative',
                pl: 4,
                '&::before': {
                  content: '"\\201C"',
                  position: 'absolute',
                  left: 0,
                  top: -5,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                },
                '&::after': {
                  content: '"\\201D"',
                  position: 'absolute',
                  right: -10,
                  bottom: -10,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary, 
                  fontWeight: 'bold'
                }
              }}>
                Fur Shield's AI health monitoring saved my dog's life! The system alerted me to potential health issues
                before they became serious. The detailed reports and personalized recommendations are incredibly helpful
                for keeping my pets healthy.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ p: 3, height: '100%', borderRadius: 5, boxShadow: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.secondary }}>
                  N
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Nguyen Chi
                  </Typography>
                  <Rating value={5} size="small" readOnly />
                </Box>
              </Box>
              <Typography sx={{
                color: theme.palette.text.textSub,
                fontStyle: 'italic',
                position: 'relative',
                pl: 4,
                '&::before': {
                  content: '"\\201C"',
                  position: 'absolute',
                  left: 0,
                  top: -5,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                },
                '&::after': {
                  content: '"\\201D"',
                  position: 'absolute',
                  right: -10,
                  bottom: -10,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                }
              }}>
                I found my perfect companion through Fur Shield's adoption platform! The detailed pet profiles,
                health records, and matching system made the process so easy. Their team was incredibly supportive
                throughout the entire adoption journey. Highly recommend!
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ p: 3, height: '100%', borderRadius: 5, boxShadow: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.secondary }}>
                  T
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Tran Yen Nhi
                  </Typography>
                  <Rating value={5} size="small" readOnly />
                </Box>
              </Box>
              <Typography sx={{
                color: theme.palette.text.textSub,
                fontStyle: 'italic',
                position: 'relative',
                pl: 4,
                '&::before': {
                  content: '"\\201C"',
                  position: 'absolute',
                  left: 0,
                  top: -5,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                },
                '&::after': {
                  content: '"\\201D"',
                  position: 'absolute',
                  right: -10,
                  bottom: -10,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                }
              }}>
                Fur Shield's emergency veterinary service saved my cat's life during a critical situation!
                Their 24/7 support and quick response time made all the difference. The veterinary network
                is excellent and the AI consultation feature helps me monitor my pets' health proactively.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ p: 3, height: '100%', borderRadius: 5, boxShadow: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.secondary }}>
                  H
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Hoang Minh
                  </Typography>
                  <Rating value={5} size="small" readOnly />
                </Box>
              </Box>
              <Typography sx={{
                color: theme.palette.text.textSub,
                fontStyle: 'italic',
                position: 'relative',
                pl: 4,
                '&::before': {
                  content: '"\\201C"',
                  position: 'absolute',
                  left: 0,
                  top: -5,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                },
                '&::after': {
                  content: '"\\201D"',
                  position: 'absolute',
                  right: -10,
                  bottom: -10,
                  fontSize: '2rem',
                  color: theme.palette.primary.secondary,
                  fontWeight: 'bold'
                }
              }}>
                The mobile veterinary service is a game-changer! No more stressful trips to the clinic for routine
                check-ups. Fur Shield brings professional care right to my doorstep. Their nutrition guidance
                has also helped me provide the best diet for my pets.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Testimonials
