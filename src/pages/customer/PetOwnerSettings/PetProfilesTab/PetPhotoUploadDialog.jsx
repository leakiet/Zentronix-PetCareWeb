import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Alert,
  TextField,
  Avatar
} from '@mui/material'
import {
  PhotoLibrary as PhotoLibraryIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Image as ImageIcon
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import { uploadImageAPI, getUserImagesAPI, checkImageUsageAPI, deleteImageAPI } from '~/apis'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'

function PetPhotoUploadDialog({ open, onClose, pet, onPhotoSelected, userId }) {
  const [activeTab, setActiveTab] = useState('choose') // 'choose' or 'upload'
  const [userImages, setUserImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [imageName, setImageName] = useState('')
  const [hoveredImageId, setHoveredImageId] = useState(null)
  const [deletingImageId, setDeletingImageId] = useState(null)

  // Confirm Modal states
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmDescription, setConfirmDescription] = useState('')
  const [confirmBtnName, setConfirmBtnName] = useState('')

  // Helper function to open confirm modal
  const openConfirmModal = (title, description, btnName, action) => {
    setConfirmTitle(title)
    setConfirmDescription(description)
    setConfirmBtnName(btnName)
    setConfirmAction(() => action)
    setConfirmModalOpen(true)
  }

  // Helper function to close confirm modal
  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
    setConfirmAction(null)
    setConfirmTitle('')
    setConfirmDescription('')
    setConfirmBtnName('')
  }

  // Handler for confirm action
  const handleConfirmAction = async () => {
    if (confirmAction) {
      await confirmAction()
    }
    closeConfirmModal()
  }

  const fetchUserImages = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
      const images = await getUserImagesAPI(userId)
      setUserImages(images)
    } catch {
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Fetch user's images when dialog opens
  useEffect(() => {
    if (open && activeTab === 'choose' && userId) {
      fetchUserImages()
    }
  }, [open, activeTab, userId, fetchUserImages])

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedImage(null)
      setUploadFile(null)
      setImageName('')
      setActiveTab('choose')
    }
  }, [open])

  // Early return for validation - after all hooks
  if (!pet) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>Pet information is required.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  if (!onPhotoSelected || typeof onPhotoSelected !== 'function') {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>Photo selection callback is required.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }

      setUploadFile(file)
      setImageName(file.name)
    }
  }

  const handleUploadNewImage = async () => {
    if (!uploadFile || !userId) {
      toast.error('Please select an image file')
      return
    }

    const fileName = imageName || uploadFile.name

    openConfirmModal(
      'Upload Image',
      `Are you sure you want to upload "${fileName}" to your photo library?`,
      'Upload',
      async () => {
        try {
          setUploading(true)
          const formData = new FormData()
          formData.append('file', uploadFile)
          formData.append('name', fileName)

          const uploadedImage = await uploadImageAPI(formData, userId)
          toast.success('Image uploaded successfully!')
          setSelectedImage(uploadedImage)
          // Switch to choose tab to show the uploaded image
          setActiveTab('choose')
          fetchUserImages() // Refresh the image list
        } catch {
          toast.error('Failed to upload image')
        } finally {
          setUploading(false)
        }
      }
    )
  }

  const handleSelectImage = (image) => {
    setSelectedImage(image)
  }

  const handleDeleteImage = async (imageId) => {
    if (!userId) return

    // Find the image to get its name
    const image = userImages.find(img => img.id === imageId)
    const imageName = image?.name || 'this image'

    openConfirmModal(
      'Delete Image',
      `Are you sure you want to delete "${imageName}"? This action cannot be undone.`,
      'Delete',
      async () => {
        try {
          setDeletingImageId(imageId)

          // Check if image is being used
          const isInUse = await checkImageUsageAPI(imageId, userId)

          if (isInUse) {
            toast.error('This image is currently being used by a pet and cannot be deleted')
            return
          }

          // Delete the image
          await deleteImageAPI(imageId, userId)
          toast.success('Image deleted successfully!')

          // Refresh the image list
          fetchUserImages()

          // If the deleted image was selected, clear selection
          if (selectedImage?.id === imageId) {
            setSelectedImage(null)
          }

        } catch {
          toast.error('Failed to delete image')
        } finally {
          setDeletingImageId(null)
        }
      }
    )
  }

  const handleConfirmSelection = () => {
    if (selectedImage) {
      const petName = pet?.petName || 'pet'

      openConfirmModal(
        'Update Pet Photo',
        `Are you sure you want to update the photo for ${petName} with "${selectedImage.name}"?`,
        'Update',
        () => {
          onPhotoSelected(pet.id, selectedImage.url)
          onClose()
        }
      )
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            📸 Update Photo for {pet?.petName || 'Pet'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        {/* Tab Selection */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button
            variant={activeTab === 'choose' ? 'contained' : 'outlined'}
            startIcon={<PhotoLibraryIcon />}
            onClick={() => setActiveTab('choose')}
            sx={{ flex: 1 }}
          >
            Choose from Library
          </Button>
          <Button
            variant={activeTab === 'upload' ? 'contained' : 'outlined'}
            startIcon={<CloudUploadIcon />}
            onClick={() => setActiveTab('upload')}
            sx={{ flex: 1 }}
          >
            Upload New Photo
          </Button>
        </Box>

        {/* Choose from Library Tab */}
        {activeTab === 'choose' && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              📚 Your Photo Library
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading images...</Typography>
              </Box>
            ) : userImages.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography color="text.secondary">
                  No images uploaded yet. Try uploading a new photo!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {userImages.map((image) => (
                  <Grid item xs={6} sm={4} md={3} key={image.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedImage?.id === image.id ? '3px solid #1976d2' : '1px solid #e0e0e0',
                        position: 'relative',
                        '&:hover': { boxShadow: 3 }
                      }}
                      onClick={() => handleSelectImage(image)}
                      onMouseEnter={() => setHoveredImageId(image.id)}
                      onMouseLeave={() => setHoveredImageId(null)}
                    >
                      <CardMedia
                        component="img"
                        height="120"
                        image={image.url}
                        alt={image.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      {selectedImage?.id === image.id && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />
                        </Box>
                      )}
                      {hoveredImageId === image.id && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteImage(image.id)
                          }}
                        >
                          {deletingImageId === image.id ? (
                            <CircularProgress size={16} sx={{ color: 'white' }} />
                          ) : (
                            <CloseIcon sx={{ color: 'white', fontSize: 16 }} />
                          )}
                        </Box>
                      )}
                      <CardContent sx={{ p: 1 }}>
                        <Typography variant="caption" noWrap>
                          {image.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {formatFileSize(image.size)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Upload New Photo Tab */}
        {activeTab === 'upload' && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              ☁️ Upload New Photo
            </Typography>

            <Box sx={{ mb: 3 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{ py: 3, borderStyle: 'dashed' }}
                >
                  {uploadFile ? uploadFile.name : 'Click to select image'}
                </Button>
              </label>
            </Box>

            {uploadFile && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Image Name (Optional)"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder={uploadFile.name}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar
                    src={URL.createObjectURL(uploadFile)}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box>
                    <Typography variant="body2">
                      Size: {formatFileSize(uploadFile.size)}
                    </Typography>
                    <Typography variant="body2">
                      Type: {uploadFile.type}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handleUploadNewImage}
              disabled={!uploadFile || uploading}
              startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              fullWidth
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </Box>
        )}

        {/* Selected Image Preview */}
        {selectedImage && (
          <Alert severity="info" sx={{ mt: 2 }}>
            ✅ Selected: {selectedImage.name}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmSelection}
          variant="contained"
          disabled={!selectedImage}
        >
          Update Photo
        </Button>
      </DialogActions>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title={confirmTitle}
        description={confirmDescription}
        btnName={confirmBtnName}
      />
    </Dialog>
  )
}

export default PetPhotoUploadDialog
