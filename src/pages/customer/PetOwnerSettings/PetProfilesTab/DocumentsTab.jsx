import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import DocumentIcon from '@mui/icons-material/Description'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import TableChartIcon from '@mui/icons-material/TableChart'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { uploadDocumentAPI, deleteDocumentAPI, downloadDocumentAPI } from '~/apis'

function DocumentsTab({
  documents,
  petId,
  onDocumentUpload,
  onDocumentDelete
}) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid document file (PDF, DOC, DOCX, XLS, XLSX)')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', file.name)

      const newDocument = await uploadDocumentAPI(petId, formData)

      // Kiểm tra response có hợp lệ không
      if (newDocument && newDocument.id) {
        onDocumentUpload(newDocument)
        toast.success('Document uploaded successfully')
      } else {
        throw new Error('Invalid response from server')
      }
    } catch {
      toast.error('Failed to upload document')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDownload = async (document) => {
    try {
      const downloadUrl = await downloadDocumentAPI(document.id)
      window.open(downloadUrl, '_blank')
    } catch {
      toast.error('Failed to download document')
    }
  }

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      await deleteDocumentAPI(petId, documentId)
      onDocumentDelete(documentId)
      toast.success('Document deleted successfully')
    } catch {
      toast.error('Failed to delete document')
    }
  }

  const getFileIcon = (format) => {
    switch (format?.toLowerCase()) {
    case 'pdf':
      return <PictureAsPdfIcon color="error" />
    case 'doc':
    case 'docx':
      return <ArticleIcon color="primary" />
    case 'xls':
    case 'xlsx':
      return <TableChartIcon color="success" />
    default:
      return <DocumentIcon color="action" />
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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Documents ({documents.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          sx={{ borderRadius: 2 }}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileSelect}
        />
      </Box>

      {documents.length > 0 ? (
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                {getFileIcon(doc.format)}
              </Box>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {doc.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()} •
                    Size: {formatFileSize(doc.size)} •
                    Format: {doc.format?.toUpperCase()}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  title="Download"
                  onClick={() => handleDownload(doc)}
                  sx={{ color: 'primary.main' }}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title="Delete"
                  onClick={() => handleDelete(doc.id)}
                  sx={{ color: 'error.main', ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <DocumentIcon sx={{ fontSize: 80, color: 'grey.400', mb: 3 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No documents uploaded yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Upload medical documents, lab results, certificates, or other important files for your pet
          </Typography>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            size="large"
            sx={{ borderRadius: 2, px: 4, py: 1.5 }}
          >
            {uploading ? 'Uploading...' : 'Upload Your First Document'}
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>
          Supported file types:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          PDF, DOC, DOCX, XLS, XLSX • Maximum file size: 10MB
        </Typography>
      </Box>
    </Box>
  )
}

export default DocumentsTab
