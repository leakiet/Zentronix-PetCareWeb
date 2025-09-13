import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import VaccinesIcon from '@mui/icons-material/Vaccines'

function PetList({
  pets,
  onOpenPetDialog,
  onViewHealthRecords,
  onAddVaccination,
  onDeletePet
}) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          My Pets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onOpenPetDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add New Pet
        </Button>
      </Box>

      {/* Pet List */}
      <Grid container spacing={{ xs: 3, md: 3 }}>
        {pets.map((pet) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={pet.id}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ bgcolor: 'primary.main', mr: 2 }}
                    src={pet.image}
                  >
                    <PetsIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {pet.petName || 'Unnamed Pet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.species || 'Unknown'} • {pet.breed?.name || 'Unknown Breed'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`${pet.age || 'N/A'} years old`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={`${pet.weight || 'N/A'} kg`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={pet.gender || 'Unknown'}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Color:</strong> {pet.color || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Health Records:</strong> {pet.healthRecords?.length || 0} records
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Edit Pet">
                    <IconButton
                      size="small"
                      onClick={() => onOpenPetDialog(pet)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Health Records">
                    <IconButton
                      size="small"
                      onClick={() => onViewHealthRecords(pet)}
                      sx={{ color: 'success.main' }}
                    >
                      <HealthAndSafetyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Manage Vaccinations">
                    <IconButton
                      size="small"
                      onClick={() => onAddVaccination(pet)}
                      sx={{ color: 'warning.main' }}
                    >
                      <VaccinesIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Pet">
                    <IconButton
                      size="small"
                      onClick={() => onDeletePet(pet.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Upload Photo">
                    <IconButton
                      size="small"
                      sx={{ color: 'info.main' }}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pets.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <PetsIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No pets added yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your first pet to manage their profile
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => onOpenPetDialog()}
          >
            Add Your First Pet
          </Button>
        </Box>
      )}
    </>
  )
}

export default PetList
