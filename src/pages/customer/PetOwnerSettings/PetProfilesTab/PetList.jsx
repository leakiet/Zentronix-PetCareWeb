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
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import PetPhotoUploadDialog from './PetPhotoUploadDialog'
import Footer from '~/components/Footer/Footer'

function PetList({
  pets,
  onOpenPetDialog,
  onViewHealthRecords,
  onAddVaccination,
  onDeletePet,
  onUpdatePetPhoto,
  userId,
  loading = false
}) {
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [selectedPetForPhoto, setSelectedPetForPhoto] = useState(null)
  const [showEmptyState, setShowEmptyState] = useState(false)

  // Debounce empty state display
  useEffect(() => {
    if (pets.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyState(true)
      }, 500) // 0.5 second delay

      return () => clearTimeout(timer)
    } else {
      setShowEmptyState(false)
    }
  }, [pets.length])

  const handleOpenPhotoDialog = (pet) => {
    setSelectedPetForPhoto(pet)
    setPhotoDialogOpen(true)
  }

  const handleClosePhotoDialog = () => {
    setPhotoDialogOpen(false)
    setSelectedPetForPhoto(null)
  }

  const handlePhotoSelected = (petId, imageUrl) => {
    if (onUpdatePetPhoto) {
      onUpdatePetPhoto(petId, imageUrl)
    }
  }
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={60} />
          <Typography sx={{ ml: 2, alignSelf: 'center' }} variant="h6" color="text.secondary">
            Loading pets...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 3, md: 3 }}>
          {pets.map((pet) => (
            <Grid size={{ xs: 12, md: 6 }} key={pet.id}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, position: 'relative' }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Header with Avatar and Basic Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 130,
                        height: 130,
                        mr: 4,
                        boxShadow: 4
                      }}
                      src={pet.image}
                    >
                      <PetsIcon sx={{ fontSize: 65 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontSize: '2.2rem' }}>
                        {pet.petName || 'Unnamed Pet'}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        {pet.species || 'Unknown'} • {pet.breed?.name || 'Unknown Breed'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Pet Details */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Basic Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={`Age: ${pet.age || 'N/A'} years`}
                        size="small"
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 'medium' }}
                      />
                      <Chip
                        label={`Weight: ${pet.weight || 'N/A'} kg`}
                        size="small"
                        color="secondary"
                        variant="filled"
                        sx={{ fontWeight: 'medium' }}
                      />
                      <Chip
                        label={`Gender: ${pet.gender || 'Unknown'}`}
                        size="small"
                        color="info"
                        variant="filled"
                        sx={{ fontWeight: 'medium' }}
                      />
                      <Chip
                        label={`Color: ${pet.color || 'Not specified'}`}
                        size="small"
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Tooltip title="Edit Pet"
                        slotProps={{
                          tooltip: {
                            sx: {
                              fontSize: '14px',
                              padding: '8px 12px'
                            }
                          }
                        }}>
                        <IconButton
                          size="medium"
                          onClick={() => onOpenPetDialog(pet)}
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                              borderColor: 'primary.main'
                            }
                          }}
                        >
                          <EditIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Pet" slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: '14px',
                            padding: '8px 12px'
                          }
                        }
                      }}>
                        <IconButton
                          size="medium"
                          onClick={() => onDeletePet(pet.id)}
                          sx={{
                            color: 'error.main',
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'error.light',
                            '&:hover': {
                              bgcolor: 'error.main',
                              color: 'white',
                              borderColor: 'error.main'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Tooltip title="View Health Records" slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: '14px',
                            padding: '8px 12px'
                          }
                        }
                      }}>
                        <IconButton
                          size="medium"
                          onClick={() => onViewHealthRecords(pet)}
                          sx={{
                            color: 'success.main',
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'success.light',
                            '&:hover': {
                              bgcolor: 'success.main',
                              color: 'white',
                              borderColor: 'success.main'
                            }
                          }}
                        >
                          <HealthAndSafetyIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Manage Vaccinations" slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: '14px',
                            padding: '8px 12px'
                          }
                        }
                      }}>
                        <IconButton
                          size="medium"
                          onClick={() => onAddVaccination(pet)}
                          sx={{
                            color: 'warning.main',
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'warning.light',
                            '&:hover': {
                              bgcolor: 'warning.main',
                              color: 'white',
                              borderColor: 'warning.main'
                            }
                          }}
                        >
                          <VaccinesIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Upload Photo" slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: '14px',
                            padding: '8px 12px'
                          }
                        }
                      }}>
                        <IconButton
                          size="medium"
                          onClick={() => handleOpenPhotoDialog(pet)}
                          sx={{
                            color: 'info.main',
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'info.light',
                            '&:hover': {
                              bgcolor: 'info.main',
                              color: 'white',
                              borderColor: 'info.main'
                            }
                          }}
                        >
                          <PhotoCameraIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && showEmptyState && (
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

      {/* Photo Upload Dialog */}
      <PetPhotoUploadDialog
        open={photoDialogOpen}
        onClose={handleClosePhotoDialog}
        pet={selectedPetForPhoto}
        onPhotoSelected={handlePhotoSelected}
        userId={userId}
      />
    </>
  )
}

export default PetList
