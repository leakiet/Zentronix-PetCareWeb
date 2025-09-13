import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DocumentIcon from '@mui/icons-material/Description'
import InsuranceIcon from '@mui/icons-material/Security'
import AddIcon from '@mui/icons-material/Add'
import HealthRecordsTab from './HealthRecordsTab'
import DocumentsTab from './DocumentsTab'
import InsuranceTab from './InsuranceTab'

function HealthDialog({
  open,
  onClose,
  selectedPet,
  dialogTab,
  onChangeTab,
  healthRecords,
  documents,
  insurancePolicies,
  onOpenHealthRecordDialog,
  onDeleteHealthRecord,
  onDocumentUpload,
  onDocumentDelete
}) {
  const getPetDocuments = (petId) => {
    return documents.filter(doc => doc.petId === petId)
  }

  const getPetInsurance = (petId) => {
    return insurancePolicies.filter(policy => policy.petId === petId)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        {selectedPet?.petName || 'Pet'} - Health Information
      </DialogTitle>
      <DialogContent>
        <Tabs value={dialogTab} onChange={(e, newValue) => onChangeTab(newValue)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tab icon={<HealthAndSafetyIcon />} label="Health Records" />
          <Tab icon={<DocumentIcon />} label="Documents" />
          <Tab icon={<InsuranceIcon />} label="Insurance" />
        </Tabs>

        {/* Tab 1: Health Records */}
        {dialogTab === 0 && (
          <HealthRecordsTab
            healthRecords={healthRecords}
            onOpenHealthRecordDialog={onOpenHealthRecordDialog}
            onDeleteHealthRecord={onDeleteHealthRecord}
          />
        )}

        {/* Tab 2: Medical Documents */}
        {dialogTab === 1 && (
          <DocumentsTab
            documents={getPetDocuments(selectedPet?.id)}
            petId={selectedPet?.id}
            onDocumentUpload={onDocumentUpload}
            onDocumentDelete={onDocumentDelete}
          />
        )}

        {/* Tab 3: Insurance Policies */}
        {dialogTab === 2 && (
          <InsuranceTab
            insurancePolicies={getPetInsurance(selectedPet?.id)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {dialogTab === 0 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => onOpenHealthRecordDialog()}
          >
            Add Health Record
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default HealthDialog
