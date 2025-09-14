import React, { useState, useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import Cropper from 'react-easy-crop'
import getCroppedImg from '~/utils/getCroppedImg'
import { createAdoptionListingAPI, fetchBreedsAPI } from '~/apis'
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
  { value: 'ADOPTED', label: 'Adopted' }
]

const CreateAdoptionListing = () => {
  const user = useSelector(selectCurrentCustomer)
  const navigate = useNavigate()

  const { register, handleSubmit, control, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      petName: '',
      description: '',
      age: '',
      gender: 'MALE',
      breedId: '',
      species: 'DOG',
      status: 'HEALTHY',
      adoptionStatus: 'PENDING',
      imageFile: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)

  const watchedSpecies = watch('species')

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsData = await fetchBreedsAPI()
        setBreeds(breedsData)
      } catch (error) {
        toast.error('Failed to fetch breeds')
      }
    }
    fetchBreeds()
  }, [])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const img = new Image()
      img.onload = () => {
        if (img.width === 600 && img.height === 600) {
          if (imagePreview) URL.revokeObjectURL(imagePreview)
          setImagePreview(URL.createObjectURL(file))
          setValue('imageFile', [file])
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
      if (imagePreview) URL.revokeObjectURL(imagePreview)
      const previewUrl = URL.createObjectURL(croppedImage)
      setImagePreview(previewUrl)
      const file = new File([croppedImage], 'cropped-image.jpg', { type: 'image/jpeg' })
      setValue('imageFile', [file])
      setCropModalOpen(false)
      if (imageSrc) URL.revokeObjectURL(imageSrc)
      setImageSrc(null)
    } catch (e) {
      toast.error('Failed to crop image')
    }
  }

  const onSubmit = async (data) => {
    if (!user || user.role !== 'SHELTER') {
      toast.error('Only shelters can create adoption listings')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'imageFile' && value && value.length > 0 && value[0] instanceof File) {
          formData.append('imageFile', value[0])
        } else if (key !== 'imageFile') {
          formData.append(key, value)
        }
      })

      formData.append('shelterId', user.id)

      await createAdoptionListingAPI(formData)
      toast.success('Adoption listing created successfully!')
      reset()
      setImagePreview(null)
      navigate('/shelter-settings')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create adoption listing')
    } finally {
      setLoading(false)
    }
  }

  const filteredBreeds = breeds.filter(breed => breed.species === watchedSpecies)

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <AppBar />
      <Box sx={{ mt: theme.fitbowl.appBarHeight, p: 3 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
            <Typography variant="h4" mb={3} align="center" fontWeight={700}>
              Create New Adoption Listing
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
                  <TextField
                    select
                    label="Gender"
                    fullWidth
                    {...register('gender', { required: 'Gender is required' })}
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
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="Species"
                    fullWidth
                    {...register('species', { required: 'Species is required' })}
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
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="Breed"
                    fullWidth
                    {...register('breedId', { required: 'Breed is required' })}
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
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="Health Status"
                    fullWidth
                    {...register('status', { required: 'Status is required' })}
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
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="imageFile"
                    control={control}
                    rules={{ required: 'Image is required' }}
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
                        {errors.imageFile && (
                          <Typography color="error" variant="caption">
                            {errors.imageFile.message}
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
                    {loading ? 'Creating...' : 'Create Listing'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Box>

      {/* Modal Crop */}
      <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" mb={2}>Crop Image to 600x600</Typography>
          <Box sx={{ position: 'relative', height: 300, width: '100%' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setCropModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCropSave} variant="contained">Save Crop</Button>
          </Box>
        </Box>
      </Modal>

      <Footer />
    </Box>
  )
}

export default CreateAdoptionListing
