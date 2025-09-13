import React, { useEffect, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
  Grid,
  Modal,
  Slider
} from '@mui/material'
import { toast } from 'react-toastify'
import Cropper from 'react-easy-crop'
import getCroppedImg from '~/utils/getCroppedImg'
import { fetchAdoptionListingsByIdAPI, updateAdoptionListingAPI, updateAdoptionListingImageAPI, fetchBreedsAPI } from '~/apis'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import theme from '~/theme'

const genderOptions = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' }
]

const speciesOptions = [
  { value: 'DOG', label: 'Dog' },
  { value: 'CAT', label: 'Cat' },
  { value: 'BIRD', label: 'Bird' }
]

const statusOptions = [
  { value: 'HEALTHY', label: 'Healthy' },
  { value: 'SICK', label: 'Sick' },
  { value: 'INJURED', label: 'Injured' },
  { value: 'RECOVERING', label: 'Recovering' }
]

const adoptionStatusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'ADOPTED', label: 'Adopted' },
  { value: 'COMPLETED', label: 'Completed' }
]

const UpdateAdoptionListing = () => {
  const { id } = useParams()
  const user = useSelector(selectCurrentCustomer)
  const navigate = useNavigate()

  const { register, handleSubmit, control, formState: { errors }, reset, watch, setValue } = useForm({
    defaultValues: {
      petName: '',
      description: '',
      age: '',
      gender: 'MALE',
      breedId: '',
      species: 'DOG',
      status: 'HEALTHY',
      adoptionStatus: 'PENDING',
      image: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [breeds, setBreeds] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [initialImage, setInitialImage] = useState(null)
  const [listingId, setListingId] = useState(null)
  
  // Crop Modal States
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  const watchedSpecies = watch('species')

  useEffect(() => {
    const fetchData = async () => {
      setFetchLoading(true)
      try {
        const [breedsData, listingData] = await Promise.all([
          fetchBreedsAPI(),
          fetchAdoptionListingsByIdAPI(id)
        ])

        setBreeds(breedsData)

        if (listingData) {
          setValue('petName', listingData.petName || '')
          setValue('description', listingData.description || '')
          setValue('age', listingData.age || '')
          setValue('gender', listingData.gender || 'MALE')
          setValue('breedId', listingData.breed?.id || '')
          setValue('species', listingData.species || 'DOG')
          setValue('status', listingData.status || 'HEALTHY')
          setValue('adoptionStatus', listingData.adoptionStatus || 'PENDING')

          setInitialImage(listingData.image)
          setImagePreview(listingData.image)
          setListingId(listingData.id)
        } else {
          toast.error('Adoption listing not found')
          navigate('/shelter-settings')
        }
      } catch (error) {
        toast.error('Failed to fetch listing data')
        navigate('/shelter-settings')
      } finally {
        setFetchLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, setValue, navigate])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const img = new Image()
      img.onload = () => {
        if (img.width === 600 && img.height === 600) {
          if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview)
          }
          setImagePreview(URL.createObjectURL(file))
          setValue('image', [file])
        } else {
          setImageSrc(URL.createObjectURL(file))
          setCropModalOpen(true)
        }
      }
      img.src = URL.createObjectURL(file)
    }
  }

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 600, 600)
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
      const previewUrl = URL.createObjectURL(croppedImage)
      setImagePreview(previewUrl)
      const file = new File([croppedImage], 'cropped-image.jpg', { type: 'image/jpeg' })
      setValue('image', [file])
      setCropModalOpen(false)
      if (imageSrc) URL.revokeObjectURL(imageSrc)
      setImageSrc(null)
    } catch (e) {
      toast.error('Failed to crop image')
    }
  }

  const onSubmit = async (data) => {
    if (!user || user.role !== 'SHELTER') {
      toast.error('Only shelters can update adoption listings')
      return
    }

    setLoading(true)
    try {
      let file = null
      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        file = data.image[0]
      }

      const fixedData = {
        petName: String(data.petName ?? ''),
        description: String(data.description ?? ''),
        age: String(data.age ?? ''),
        gender: String(data.gender ?? ''),
        breedId: String(data.breedId ?? ''),
        species: String(data.species ?? ''),
        status: String(data.status ?? ''),
        adoptionStatus: String(data.adoptionStatus ?? ''),
        shelterId: user.id
      }

      await updateAdoptionListingAPI(listingId, fixedData)

      if (file) {
        await updateAdoptionListingImageAPI(listingId, file)
      }

      toast.success('Adoption listing updated successfully!')
      navigate('/shelter-settings')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update adoption listing')
    } finally {
      setLoading(false)
    }
  }

  const filteredBreeds = breeds.filter(breed => breed.species === watchedSpecies)

  if (fetchLoading) {
    return (
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
        <AppBar />
        <Box sx={{ mt: theme.fitbowl.appBarHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
            <Typography variant="h4" mb={3} align="center" fontWeight={700}>
              Update Adoption Listing
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Pet Name"
                    fullWidth
                    {...register('petName', { required: 'Pet name is required' })}
                    error={!!errors.petName}
                    helperText={errors.petName?.message}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Age"
                    type="number"
                    fullWidth
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 0, message: 'Age must be positive' }
                    })}
                    error={!!errors.age}
                    helperText={errors.age?.message}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    {...register('description', { required: 'Description is required' })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Gender"
                        fullWidth
                        {...field}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                        variant="outlined"
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="species"
                    control={control}
                    rules={{ required: 'Species is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Species"
                        fullWidth
                        {...field}
                        error={!!errors.species}
                        helperText={errors.species?.message}
                        variant="outlined"
                      >
                        {speciesOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="breedId"
                    control={control}
                    rules={{ required: 'Breed is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Breed"
                        fullWidth
                        {...field}
                        error={!!errors.breedId}
                        helperText={errors.breedId?.message}
                        variant="outlined"
                      >
                        {filteredBreeds.map((breed) => (
                          <MenuItem key={breed.id} value={breed.id}>
                            {breed.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: 'Status is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Health Status"
                        fullWidth
                        {...field}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        variant="outlined"
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="adoptionStatus"
                    control={control}
                    rules={{ required: 'Adoption status is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        label="Adoption Status"
                        fullWidth
                        {...field}
                        error={!!errors.adoptionStatus}
                        helperText={errors.adoptionStatus?.message}
                        variant="outlined"
                      >
                        {adoptionStatusOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: !initialImage && 'Image is required' }}
                    render={({ field }) => (
                      <>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ mb: 1, textTransform: 'none' }}
                        >
                          {imagePreview ? 'Change Image' : 'Upload Pet Image'}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                          />
                        </Button>
                        {imagePreview && (
                          <Box sx={{ mb: 1, textAlign: 'center' }}>
                            <img
                              src={imagePreview}
                              alt="preview"
                              style={{
                                width: 200,
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                              }}
                            />
                          </Box>
                        )}
                        {errors.image && (
                          <Typography color="error" variant="caption">
                            {errors.image.message}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ px: 5, py: 1.5, borderRadius: 2, fontWeight: 600, fontSize: 18 }}
                    startIcon={loading && <CircularProgress size={22} color="inherit" />}
                  >
                    {loading ? 'Updating...' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>
      <Footer />

      {/* Crop Image Modal */}
      <Modal
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        aria-labelledby="crop-image-modal"
        aria-describedby="modal-to-crop-image-before-upload"
      >
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, maxWidth: 600, mx: 'auto', mt: '10vh' }}>
          <Typography id="crop-image-modal" variant="h6" component="h2" mb={2} textAlign="center">
            Crop Image
          </Typography>

          <Box sx={{ position: 'relative', height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ containerStyle: { height: '100%' }, cropAreaStyle: { borderRadius: '12px' } }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCropModalOpen(false)}
              sx={{ flex: 1, mr: 1, borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCropSave}
              sx={{ flex: 1, borderRadius: 2 }}
            >
              Save Crop
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default UpdateAdoptionListing
