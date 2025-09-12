
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import PetsIcon from '@mui/icons-material/Pets'
import HistoryIcon from '@mui/icons-material/History'
import EventIcon from '@mui/icons-material/Event'

import ResponsiveAppBar from '~/components/AppBar/AppBar'
import PetProfilesTab from './PetProfilesTab'
import OrderHistoryTab from './OrderHistoryTab'
import AppointmentTab from './AppointmentTab'
import TabPanel from './TabPanel'
import { fetchBreedsAPI, createPetAPI, fetPetsByCustomerId, updatePetAPI } from '~/apis'
import { toast } from 'react-toastify'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { PET_SPECIES } from '~/utils/constants'


function a11yProps(index) {
  return {
    id: `pet-owner-tab-${index}`,
    'aria-controls': `pet-owner-tabpanel-${index}`
  }
}

export default function PetOwnerSettings() {
  const [tabValue, setTabValue] = useState(0)
  const [pets, setPets] = useState([])
  const [breeds, setBreeds] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [petDialogOpen, setPetDialogOpen] = useState(false)
  const [healthRecords, setHealthRecords] = useState([])
  const [healthDialogOpen, setHealthDialogOpen] = useState(false)
  const [documents, setDocuments] = useState([
    {
      id: 1,
      petId: 1,
      name: 'Vaccination Certificate 2024.pdf',
      uploadDate: '2024-01-15',
      size: '245 KB',
      type: 'certificate'
    },
    {
      id: 2,
      petId: 1,
      name: 'Blood Test Results.pdf',
      uploadDate: '2024-02-20',
      size: '180 KB',
      type: 'lab_result'
    }
  ])
  const [insurancePolicies, setInsurancePolicies] = useState([
    {
      id: 1,
      petId: 1,
      provider: 'PetSure Insurance',
      policyNumber: 'PS-2024-001234',
      coverage: 'Comprehensive - Accidents, Illness & Wellness',
      deductible: 250,
      endDate: '2025-12-31'
    }
  ])
  const [orders] = useState([])
  const [appointments, setAppointments] = useState([])
  const currentCustomer = useSelector(selectCurrentCustomer)

  // Add state for selected pet in health record
  const [selectedPetForHealth, setSelectedPetForHealth] = useState(null)

  // Form state for Pet Dialog
  const [petName, setPetName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [color, setColor] = useState('')
  const [species, setSpecies] = useState('')
  const [breedId, setBreedId] = useState('')
  const [gender, setGender] = useState('')
  
  // Form state for Health Record Dialog
  const [healthRecordType, setHealthRecordType] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [vetName, setVetName] = useState('')

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await fetchBreedsAPI()
        setBreeds(breeds)
      } catch {
        toast.error('Failed to fetch breeds. Please try again later.')
      }
    }

    fetchBreeds()
  }, [])

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (currentCustomer) {
          const pets = await fetPetsByCustomerId(currentCustomer.id)
          setPets(pets)
        }
      } catch {
        toast.error('Failed to fetch pets. Please try again later.')
      }
    }

    fetchPets()
  }, [currentCustomer])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddPet = () => {
    setSelectedPet(null)
    setPetName('')
    setAge('')
    setWeight('')
    setColor('')
    setSpecies('')
    setBreedId('')
    setGender('')
    setPetDialogOpen(true)
  }

  const handleEditPet = (pet) => {
    setSelectedPet(pet)
    setPetName(pet.petName || '')
    setAge(pet.age || '')
    setWeight(pet.weight || '')
    setColor(pet.color || '')
    setSpecies(pet.species || '')
    setBreedId(pet.breed?.id || '')
    setGender(pet.gender || '')
    setPetDialogOpen(true)
  }

  const handleDeletePet = (petId) => {
    setPets(pets.filter(pet => pet.id !== petId))
  }

  const handleSavePet = async () => {
    const petData = {
      userId: currentCustomer?.id,
      petName: petName,
      species: species,
      breedId: breedId,
      age: age,
      weight: weight,
      color: color,
      gender: gender
    }
    try {
      if (selectedPet) {
        // Update existing pet
        const updatedPet = await updatePetAPI(selectedPet.id, petData)
        setPets(pets.map(pet =>
          pet.id === selectedPet.id ? updatedPet : pet
        ))
        toast.success('Pet updated successfully!')
      } else {
        // Create new pet
        const newPet = await createPetAPI(petData)
        setPets([...pets, newPet])
        toast.success('Pet created successfully!')
      }
      setPetDialogOpen(false)
    } catch {
      toast.error('Failed to save pet. Please try again.')
    }
  }

  const handleAddHealthRecord = (petId = null) => {
    setTitle('')
    setDate('')
    setDescription('')
    setVetName('')
    setHealthRecordType('')
    setSelectedPetForHealth(petId)
    setHealthDialogOpen(true)
  }

  const handleSaveHealthRecord = () => {
    const newRecord = {
      title: title,
      date: date,
      description: description,
      vetName: vetName,
      type: healthRecordType,
      id: Date.now(),
      petId: selectedPetForHealth || 1
    }
    setHealthRecords([...healthRecords, newRecord])
    setHealthDialogOpen(false)
  }

  const handleBookAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: Date.now(),
      status: 'Pending'
    }
    setAppointments([...appointments, newAppointment])
  }

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4, pt: 10 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Pet Owner Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage your pets&apos; profiles, health records, and insurance information
          </Typography>

          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="pet owner settings tabs">
                <Tab
                  icon={<PetsIcon />}
                  label="Manage Pet Profiles"
                  {...a11yProps(0)}
                  iconPosition="start"
                />
                <Tab
                  icon={<HistoryIcon />}
                  label="Order History"
                  {...a11yProps(1)}
                  iconPosition="start"
                />
                <Tab
                  icon={<EventIcon />}
                  label="Appointments"
                  {...a11yProps(2)}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab 1: Manage Pet Profiles */}
            <TabPanel value={tabValue} index={0}>
              <PetProfilesTab
                pets={pets}
                onAddPet={handleAddPet}
                onEditPet={handleEditPet}
                onDeletePet={handleDeletePet}
                healthRecords={healthRecords}
                onAddHealthRecord={(petId) => handleAddHealthRecord(petId)}
                documents={documents}
                insurancePolicies={insurancePolicies}
              />
            </TabPanel>

            {/* Tab 2: Order History */}
            <TabPanel value={tabValue} index={1}>
              <OrderHistoryTab
                orders={orders}
              />
            </TabPanel>

            {/* Tab 3: Appointments */}
            <TabPanel value={tabValue} index={2}>
              <AppointmentTab
                pets={pets}
                appointments={appointments}
                onBookAppointment={handleBookAppointment}
              />
            </TabPanel>
          </Paper>
        </Box>

        {/* Add/Edit Pet Dialog */}
        <Dialog open={petDialogOpen} onClose={() => setPetDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedPet ? 'Edit Pet' : 'Add New Pet'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Pet Name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Species</InputLabel>
                  <Select
                    label="Species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  >
                    {Object.entries(PET_SPECIES).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Breed</InputLabel>
                  <Select
                    label="Breed"
                    value={breedId}
                    onChange={(e) => setBreedId(e.target.value)}
                  >
                    {breeds.length > 0 && breeds.map((breed) => (
                      <MenuItem key={breed.id} value={breed.id}>
                        {breed.name} ({breed.species})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Age (years)"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPetDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePet} variant="contained">
              {selectedPet ? 'Update Pet' : 'Add Pet'}
            </Button>
          </DialogActions>
        </Dialog>


        {/* Add Health Record Dialog */}
        <Dialog open={healthDialogOpen} onClose={() => setHealthDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Health Record</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Record Type</InputLabel>
                  <Select
                    label="Record Type"
                    value={healthRecordType}
                    onChange={(e) => setHealthRecordType(e.target.value)}
                  >
                    <MenuItem value="vaccination">Vaccination</MenuItem>
                    <MenuItem value="checkup">Checkup</MenuItem>
                    <MenuItem value="treatment">Treatment</MenuItem>
                    <MenuItem value="allergy">Allergy</MenuItem>
                    <MenuItem value="illness">Illness</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Veterinarian Name"
                  value={vetName}
                  onChange={(e) => setVetName(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHealthDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveHealthRecord} variant="contained">Add Record</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}
