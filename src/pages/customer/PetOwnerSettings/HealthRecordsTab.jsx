import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import HealthIcon from '@mui/icons-material/HealthAndSafety'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import MedicalIcon from '@mui/icons-material/MedicalServices'
import DocumentIcon from '@mui/icons-material/Description'
import InsuranceIcon from '@mui/icons-material/Security'
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import HospitalIcon from '@mui/icons-material/LocalHospital'
import AddIcon from '@mui/icons-material/Add'

function HealthRecordsTab({
  healthRecords,
  documents,
  insurancePolicies,
  onAddHealthRecord
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Health Records & Insurance
      </Typography>

      <Grid container spacing={3}>
        {/* Health Records Section */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  <HealthIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Health Timeline
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={onAddHealthRecord}
                  size="small"
                >
                  Add Record
                </Button>
              </Box>

              <Timeline>
                {healthRecords.map((record, index) => (
                  <TimelineItem key={record.id}>
                    <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.2 }}>
                      {new Date(record.date).toLocaleDateString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={
                        record.type === 'vaccination' ? 'success' :
                          record.type === 'checkup' ? 'primary' :
                            record.type === 'treatment' ? 'warning' : 'info'
                      }>
                        {record.type === 'vaccination' ? <VaccinesIcon /> :
                          record.type === 'checkup' ? <MedicalIcon /> :
                            <HospitalIcon />}
                      </TimelineDot>
                      {index < healthRecords.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={1} sx={{ p: 2 }}>
                        <Typography variant="h6" component="h3">
                          {record.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                          {record.description}
                        </Typography>
                        <Typography variant="body2">
                          Vet: {record.vetName}
                        </Typography>
                        {record.nextDue && (
                          <Typography variant="body2" color="primary">
                            Next due: {new Date(record.nextDue).toLocaleDateString()}
                          </Typography>
                        )}
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents & Insurance Section */}
        <Grid container size={{ xs: 12, lg: 4 }}>
          {/* Medical Documents */}
          <Grid size={{ xs: 12, md: 6, lg: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Medical Documents
                </Typography>
                <List dense>
                  {documents.map((doc) => (
                    <ListItem key={doc.id}>
                      <ListItemText
                        primary={doc.name}
                        secondary={`Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Insurance Policies */}
          <Grid size={{ xs: 12, md: 6, lg: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  <InsuranceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Insurance Policies
                </Typography>
                {insurancePolicies.map((policy) => (
                  <Box key={policy.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {policy.provider}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Policy: {policy.policyNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Coverage: {policy.coverage}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Expires: {new Date(policy.endDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Insurance
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HealthRecordsTab
