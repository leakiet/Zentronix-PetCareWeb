import { Box, Typography, CircularProgress, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import AdoptionGrid from './AdoptionGrid'
import AdoptionFilters from './AdoptionFilters'
import { fetchBreedsAPI, fetchAdoptionListingsAPI } from '~/apis'

const AdoptionLayout = () => {
  const theme = useTheme()
  const [selectedSpecies, setSelectedSpecies] = useState('')
  const [selectedBreeds, setSelectedBreeds] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedGenders, setSelectedGenders] = useState('')
  const [breeds, setBreeds] = useState([])
  const [adoptionListings, setAdoptionListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(12)
  const [sortField, setSortField] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [totalPages, setTotalPages] = useState(0)
  const [selectedAgeValue, setSelectedAgeValue] = useState('')

  const speciesOptions = [
    { id: 'DOG', name: 'Dog' },
    { id: 'CAT', name: 'Cat' },
    { id: 'BIRD', name: 'Bird' }
  ]

  const locations = ['Hanoi', 'Ho Chi Minh', 'Da Nang']
  const genders = ['MALE', 'FEMALE']

  const fetchListings = async (append = false) => {
    if (append) setLoadingMore(true)
    else setLoading(true)
    try {
      let minAge, maxAge
      if (selectedAgeValue === 'young') { minAge = 0; maxAge = 2 }
      else if (selectedAgeValue === 'adult') { minAge = 3; maxAge = 7 }
      else if (selectedAgeValue === 'senior') { minAge = 8; maxAge = undefined }

      const params = {
        page: append ? page + 1 : page,
        size,
        sortField,
        sortDir,
        species: selectedSpecies || null,
        breedId: selectedBreeds || null,
        gender: selectedGenders || null,
        minAge,
        maxAge
      }
      const data = await fetchAdoptionListingsAPI(params)
      if (append) setAdoptionListings(prev => [...prev, ...data.content])
      else setAdoptionListings(data.content || [])
      setTotalPages(data.totalPages || 0)
      setHasMore(page < (data.totalPages - 1))
      if (!append) setPage(0)
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      if (append) setLoadingMore(false)
      else setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const breedsData = await fetchBreedsAPI()
      setBreeds(breedsData)
      fetchListings()
    }
    fetchData()
  }, [selectedSpecies, selectedBreeds, selectedGenders, selectedAgeValue, page, size, sortField, sortDir])

  let filteredListings = adoptionListings.filter(listing => {
    if (selectedLocations.length > 0 && !selectedLocations.includes(listing.location)) return false
    return true
  })

  const handleSpeciesChange = (speciesId) => {
    setSelectedSpecies(speciesId)
    setSelectedBreeds('')
  }

  const handleBreedChange = (breedId) => setSelectedBreeds(breedId)

  const handleLocationChange = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location))
    } else {
      setSelectedLocations([...selectedLocations, location])
    }
  }

  const handleGenderChange = (gender) => setSelectedGenders(gender)

  const handleAgeChange = (ageValue) => setSelectedAgeValue(ageValue)

  const clearAllFilters = () => {
    setSelectedBreeds('')
    setSelectedSpecies('')
    setSelectedLocations([])
    setSelectedGenders('')
    setSelectedAgeValue('')
  }

  const loadMore = async () => {
    if (!hasMore || loadingMore) return
    await fetchListings(true)
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3, background: theme.palette.background.main }}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 300,
            letterSpacing: '0.1em',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Choose <span style={{ fontWeight: 800, color: theme.palette.primary.secondary }}>ADOPTION LISTINGS</span>
        </Typography>
        <Box sx={{ width: '6rem', height: '0.4rem', bgcolor: theme.palette.primary.secondary, mx: 'auto', mb: 8 }} />

        <AdoptionFilters
          breeds={breeds}
          speciesOptions={speciesOptions}
          locations={locations}
          genders={genders}
          selectedSpeciesValue={selectedSpecies}
          selectedBreedValue={selectedBreeds}
          selectedGenderValue={selectedGenders}
          selectedAgeValue={selectedAgeValue}
          selectedLocations={selectedLocations}
          handleSpeciesChange={handleSpeciesChange}
          handleBreedChange={handleBreedChange}
          handleLocationChange={handleLocationChange}
          handleGenderChange={handleGenderChange}
          handleAgeChange={handleAgeChange}
          clearAllFilters={clearAllFilters}
        />

        {filteredListings.length > 0 ? (
          loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <AdoptionGrid filteredListings={filteredListings} />
          )
        ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              No adoption listings found.
            </Typography>
          </Box>
        )}

        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
            >
              {loadingMore ? <CircularProgress size={20} color="white" /> : 'Load More'}
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  )
}

export default AdoptionLayout