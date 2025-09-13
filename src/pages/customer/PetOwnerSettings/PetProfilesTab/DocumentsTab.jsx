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
import DocumentIcon from '@mui/icons-material/Description'

function DocumentsTab({
  documents
}) {
  return (
    <Box>
      {documents.length > 0 ? (
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id}>
              <ListItemText
                primary={doc.name}
                secondary={`Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()} • Size: ${doc.size || 'Unknown'}`}
              />
              <ListItemSecondaryAction>
                <IconButton size="small" title="Download">
                  <DownloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <DocumentIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No documents uploaded
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Upload medical documents, lab results, or certificates
          </Typography>
        </Box>
      )}
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        fullWidth
        sx={{ mt: 2 }}
      >
        Upload Document
      </Button>
    </Box>
  )
}

export default DocumentsTab
