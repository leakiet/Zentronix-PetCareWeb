import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

function HealthRecordsTab({
  healthRecords,
  onOpenHealthRecordDialog,
  onDeleteHealthRecord
}) {
  return (
    <Box>
      {healthRecords.length > 0 ? (
        <List>
          {healthRecords.map((record, index) => (
            <div key={record.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{record.title}</Typography>
                      <Chip
                        label={record.recordType || record.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Visit Date:</strong> {record.visitDate || record.recordDate || record.date}
                      </Typography>
                      {record.diagnosis && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>Diagnosis:</strong> {record.diagnosis}
                        </Typography>
                      )}
                      {record.treatment && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>Treatment:</strong> {record.treatment}
                        </Typography>
                      )}
                      {record.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>Notes:</strong> {record.notes}
                        </Typography>
                      )}
                      {(record.description && !record.diagnosis) && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>Description:</strong> {record.description}
                        </Typography>
                      )}
                      {record.vetName && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          <strong>Veterinarian:</strong> {record.vetName}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => onOpenHealthRecordDialog(record)}
                    sx={{ color: 'primary.main', mr: 1 }}
                    title="Edit Record"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => onDeleteHealthRecord(record.id)}
                    sx={{ color: 'error.main' }}
                    title="Delete Record"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < healthRecords.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <HealthAndSafetyIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No health records found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start tracking your pet&apos;s health by adding their first record
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => onOpenHealthRecordDialog()}
          >
            Add Health Record
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default HealthRecordsTab
