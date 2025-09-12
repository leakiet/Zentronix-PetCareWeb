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
import { Controller } from 'react-hook-form'

function PetDialog({
  open,
  onClose,
  selectedPet,
  register,
  handleSubmit,
  control,
  errors,
  onSave
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogTitle>
          {selectedPet ? 'Edit Pet' : 'Add New Pet'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Pet Name"
                {...register('name', { required: 'Pet name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Controller
                  name="species"
                  control={control}
                  rules={{ required: 'Species is required' }}
                  render={({ field }) => (
                    <Select {...field} label="Species">
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Cat">Cat</MenuItem>
                      <MenuItem value="Bird">Bird</MenuItem>
                      <MenuItem value="Rabbit">Rabbit</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Breed"
                {...register('breed', { required: 'Breed is required' })}
                error={!!errors.breed}
                helperText={errors.breed?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Age (years)"
                type="number"
                {...register('age', { required: 'Age is required', min: 0 })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                {...register('weight', { required: 'Weight is required', min: 0 })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Color"
                {...register('color')}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Medical History"
                multiline
                rows={3}
                {...register('medicalHistory')}
                placeholder="Enter any medical history, allergies, or special notes..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {selectedPet ? 'Update Pet' : 'Add Pet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PetDialog
