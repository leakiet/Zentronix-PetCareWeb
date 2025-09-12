import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const AdoptionFilters = ({
  breeds,
  speciesOptions,
  locations,
  genders,
  selectedSpeciesValue,
  selectedBreedValue,
  selectedGenderValue,
  selectedAgeValue,
  selectedLocations,
  handleSpeciesChange,
  handleBreedChange,
  handleGenderChange,
  handleAgeChange,
  handleLocationChange,
  clearAllFilters
}) => {
  return (
    <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Filter Listings
      </Typography>
      <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
        overflowX: 'auto',
        p: 1
      }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="species-select-label">Species</InputLabel>
          <Select
            labelId="species-select-label"
            id="species-select"
            value={String(selectedSpeciesValue) || ''}
            label="Species"
            onChange={(e) => handleSpeciesChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {speciesOptions.map((spec) => (
              <MenuItem key={spec.id} value={String(spec.id)}>
                {spec.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {selectedSpeciesValue && (
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="breed-select-label">Pet Breed</InputLabel>
            <Select
              labelId="breed-select-label"
              id="breed-select"
              value={String(selectedBreedValue) || ''}
              label="Pet Breed"
              onChange={(e) => handleBreedChange(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {breeds.filter(breed => breed.species === selectedSpeciesValue).map((breed) => (
                <MenuItem key={breed.id} value={String(breed.id)}>
                  {breed.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={String(selectedGenderValue) || ''}
            label="Gender"
            onChange={(e) => handleGenderChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genders.map((gender) => (
              <MenuItem key={gender} value={String(gender)}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select
            labelId="age-select-label"
            id="age-select"
            value={String(selectedAgeValue) || ''}
            label="Age"
            onChange={(e) => handleAgeChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="young">Young (0-2 years)</MenuItem>
            <MenuItem value="adult">Adult (3-7 years)</MenuItem>
            <MenuItem value="senior">Senior (8+ years)</MenuItem>
          </Select>
        </FormControl>

        {(selectedSpeciesValue || selectedBreedValue || selectedGenderValue || selectedAgeValue) && (
          <Chip
            label="Clear Filters"
            onClick={clearAllFilters}
            onDelete={clearAllFilters}
            sx={{
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          Location:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {locations.slice(0, 6).map((location) => (
            <Chip
              key={location}
              label={location}
              variant={selectedLocations.includes(location) ? 'filled' : 'outlined'}
              onClick={() => handleLocationChange(location)}
              sx={{
                borderRadius: 2,
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'all 0.2s'
              }}
            />
          ))}
          <Chip
            label="📍 Near Me"
            variant="outlined"
            sx={{
              borderRadius: 2,
              '&:hover': { bgcolor: 'action.hover' },
              transition: 'all 0.2s'
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AdoptionFilters