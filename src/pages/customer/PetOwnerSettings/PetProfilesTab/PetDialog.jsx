import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { PET_SPECIES } from '~/utils/constants'
import { toast } from 'react-toastify'

function PetDialog({
  open,
  onClose,
  selectedPet,
  breeds,
  onSave
}) {
  const [petName, setPetName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [color, setColor] = useState('')
  const [species, setSpecies] = useState('')
  const [breedId, setBreedId] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    if (selectedPet) {
      setPetName(selectedPet.petName || '')
      setAge(selectedPet.age || '')
      setWeight(selectedPet.weight || '')
      setColor(selectedPet.color || '')
      setSpecies(selectedPet.species || '')
      setBreedId(selectedPet.breed?.id || '')
      setGender(selectedPet.gender || '')
    } else {
      setPetName('')
      setAge('')
      setWeight('')
      setColor('')
      setSpecies('')
      setBreedId('')
      setGender('')
    }
  }, [selectedPet])

  const handleSave = async () => {
    try {
      const petData = {
        petName,
        species,
        breedId: parseInt(breedId),
        age: parseInt(age),
        weight: parseFloat(weight),
        color,
        gender
      }

      // Validate required fields
      if (!petName || !species || !breedId || !gender) {
        toast.error('Please fill in all required fields.')
        return
      }

      if (isNaN(petData.breedId) || petData.breedId <= 0) {
        toast.error('Please select a valid breed.')
        return
      }

      await onSave(petData)
      onClose()
    } catch {
      toast.error(selectedPet ? 'Failed to update pet. Please try again.' : 'Failed to create pet. Please try again.')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {selectedPet ? 'Edit Pet' : 'Add New Pet'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={{ xs: 3, md: 3 }} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Pet Name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                label="Species"
              >
                {Object.values(PET_SPECIES).map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Breed</InputLabel>
              <Select
                value={breedId}
                onChange={(e) => setBreedId(e.target.value)}
                label="Breed"
              >
                {breeds.map((breed) => (
                  <MenuItem key={breed.id} value={breed.id}>
                    {breed.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Age (years)"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="UNDEFINED">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          {selectedPet ? 'Update Pet' : 'Add Pet'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PetDialog
