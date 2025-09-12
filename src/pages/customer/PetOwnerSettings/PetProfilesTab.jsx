import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DocumentIcon from '@mui/icons-material/Description'
import InsuranceIcon from '@mui/icons-material/Security'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'

function PetProfilesTab({ pets, onAddPet, onEditPet, onDeletePet, healthRecords, onAddHealthRecord, documents = [], insurancePolicies = [] }) {
  const [selectedPet, setSelectedPet] = useState(null)
  const [healthDialogOpen, setHealthDialogOpen] = useState(false)
  const [dialogTab, setDialogTab] = useState(0)

  const handleViewHealthRecords = (pet) => {
    setSelectedPet(pet)
    setDialogTab(0)
    setHealthDialogOpen(true)
  }

  const getPetHealthRecords = (petId) => {
    return healthRecords.filter(record => record.petId === petId)
  }

  const getPetDocuments = (petId) => {
    return documents.filter(doc => doc.petId === petId)
  }

  const getPetInsurance = (petId) => {
    return insurancePolicies.filter(policy => policy.petId === petId)
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
          onClick={onAddPet}
          sx={{ borderRadius: 2 }}
        >
          Add New Pet
        </Button>
      </Box>

      {/* Pet List */}
      <Grid container spacing={3}>
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
                  <IconButton
                    size="small"
                    onClick={() => onEditPet(pet)}
                    sx={{ color: 'primary.main' }}
                    title="Edit Pet"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleViewHealthRecords(pet)}
                    sx={{ color: 'success.main' }}
                    title="View Health Records"
                  >
                    <HealthAndSafetyIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDeletePet(pet.id)}
                    sx={{ color: 'error.main' }}
                    title="Delete Pet"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: 'info.main' }}
                    title="Upload Photo"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
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
            onClick={onAddPet}
          >
            Add Your First Pet
          </Button>
        </Box>
      )}

      {/* Health Records Dialog with Tabs */}
      <Dialog
        open={healthDialogOpen}
        onClose={() => setHealthDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedPet?.petName || 'Pet'} - Health Information
        </DialogTitle>
        <DialogContent>
          <Tabs value={dialogTab} onChange={(e, newValue) => setDialogTab(newValue)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tab icon={<HealthAndSafetyIcon />} label="Health Records" />
            <Tab icon={<DocumentIcon />} label="Documents" />
            <Tab icon={<InsuranceIcon />} label="Insurance" />
          </Tabs>

          {/* Tab 1: Health Records */}
          {dialogTab === 0 && (
            <Box>
              {getPetHealthRecords(selectedPet?.id).length > 0 ? (
                <List>
                  {getPetHealthRecords(selectedPet?.id).map((record, index) => (
                    <div key={record.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6">{record.title}</Typography>
                              <Chip
                                label={record.type}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                <strong>Date:</strong> {record.date}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                <strong>Description:</strong> {record.description}
                              </Typography>
                              {record.vetName && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  <strong>Veterinarian:</strong> {record.vetName}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < getPetHealthRecords(selectedPet?.id).length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <HealthAndSafetyIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No health records found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Start tracking your pet&apos;s health by adding their first record
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setHealthDialogOpen(false)
                      onAddHealthRecord(selectedPet?.id)
                    }}
                  >
                    Add Health Record
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {/* Tab 2: Medical Documents */}
          {dialogTab === 1 && (
            <Box>
              {getPetDocuments(selectedPet?.id).length > 0 ? (
                <List>
                  {getPetDocuments(selectedPet?.id).map((doc) => (
                    <ListItem key={doc.id}>
                      <ListItemText
                        primary={doc.name}
                        secondary={`Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()} • Size: ${doc.size || 'Unknown'}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small" title="Download">
                          <DownloadIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <DocumentIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No documents uploaded
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Upload medical documents, lab results, or certificates
                  </Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Document
              </Button>
            </Box>
          )}

          {/* Tab 3: Insurance Policies */}
          {dialogTab === 2 && (
            <Box>
              {getPetInsurance(selectedPet?.id).length > 0 ? (
                <Stack spacing={2}>
                  {getPetInsurance(selectedPet?.id).map((policy) => (
                    <Paper key={policy.id} sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {policy.provider}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Policy Number:</strong> {policy.policyNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Coverage:</strong> {policy.coverage}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Deductible:</strong> ${policy.deductible || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                        <strong>Expires:</strong> {new Date(policy.endDate).toLocaleDateString()}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <InsuranceIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No insurance policies
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Add insurance policies to track coverage and claims
                  </Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Insurance Policy
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHealthDialogOpen(false)}>Close</Button>
          {dialogTab === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setHealthDialogOpen(false)
                onAddHealthRecord(selectedPet?.id)
              }}
            >
              Add Health Record
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PetProfilesTab
