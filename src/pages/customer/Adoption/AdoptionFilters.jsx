import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material'

const AdoptionFilters = ({
  breeds,
  speciesOptions,
  genders,
  selectedSpeciesValue,
  selectedBreedValue,
  selectedGenderValue,
  selectedAgeValue,
  handleSpeciesChange,
  handleBreedChange,
  handleGenderChange,
  handleAgeChange,
  clearAllFilters
}) => {
  return (
    <Box sx={{ mb: 4, p: 3, borderRadius: 3 }}>
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
            {speciesOptions && speciesOptions.map((spec) => (
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
              {breeds && breeds.filter(breed => breed.species === selectedSpeciesValue).map((breed) => (
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
            {genders && genders.map((gender) => (
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
    </Box>
  )
}

export default AdoptionFilters