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
  const [selectedLocations, setSelectedLocations] = useState([]) // Bỏ nếu không dùng
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

  const genders = ['MALE', 'FEMALE']

  const fetchListings = async (append = false) => {
    if (append) setLoadingMore(true)
    else setLoading(true)
    try {
      let minAge, maxAge
      if (selectedAgeValue === 'young') { minAge = 0; maxAge = 2 }
      else if (selectedAgeValue === 'adult') { minAge = 3; maxAge = 7 }
      else if (selectedAgeValue === 'senior') { minAge = 8; maxAge = undefined }

      const currentPage = append ? page + 1 : page
      const params = {
        page: currentPage,
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
      setHasMore(currentPage < (data.totalPages - 1))
      if (append) setPage(currentPage)
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      if (append) setLoadingMore(false)
      else setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedsData = await fetchBreedsAPI()
        setBreeds(breedsData || []) // Add default empty array
        fetchListings()
      } catch (error) {
        console.error('Error fetching breeds:', error)
        setBreeds([]) // Set empty array on error
      }
    }
    fetchData()
  }, [selectedSpecies, selectedBreeds, selectedGenders, selectedAgeValue, size, sortField, sortDir])

  // Bỏ filter location vì data không có
  let filteredListings = adoptionListings

  const handleSpeciesChange = (speciesId) => {
    setSelectedSpecies(speciesId)
    setSelectedBreeds('')
  }

  const handleBreedChange = (breedId) => setSelectedBreeds(breedId)

  // Bỏ handleLocationChange
  // const handleLocationChange = (location) => {
  //   if (selectedLocations.includes(location)) {
  //     setSelectedLocations(selectedLocations.filter(loc => loc !== location))
  //   } else {
  //     setSelectedLocations([...selectedLocations, location])
  //   }
  // }

  const handleGenderChange = (gender) => setSelectedGenders(gender)

  const handleAgeChange = (ageValue) => setSelectedAgeValue(ageValue)

  const clearAllFilters = () => {
    setSelectedBreeds('')
    setSelectedSpecies('')
    // setSelectedLocations([]) // Bỏ
    setSelectedGenders('')
    setSelectedAgeValue('')
  }

  const loadMore = async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)
    try {
      await fetchListings(true)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
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
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: '48rem', mx: 'auto', mb: 10, fontSize: { xs: '1rem', md: '1.15rem' }, color: theme.palette.text.textSub }}
        >
          Discover adorable pets waiting for their forever homes. Browse our adoption listings and find your new best friend today.
        </Typography>
        <AdoptionFilters
          breeds={breeds}
          speciesOptions={speciesOptions}
          // locations={locations} // Bỏ
          genders={genders}
          selectedSpeciesValue={selectedSpecies}
          selectedBreedValue={selectedBreeds}
          selectedGenderValue={selectedGenders}
          selectedAgeValue={selectedAgeValue}
          // selectedLocations={selectedLocations} // Bỏ
          handleSpeciesChange={handleSpeciesChange}
          handleBreedChange={handleBreedChange}
          // handleLocationChange={handleLocationChange} // Bỏ
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