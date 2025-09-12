import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import InsuranceIcon from '@mui/icons-material/Security'

function InsuranceTab({
  insurancePolicies
}) {
  return (
    <Box>
      {insurancePolicies.length > 0 ? (
        <Stack spacing={2}>
          {insurancePolicies.map((policy) => (
            <Paper key={policy.id} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {policy.provider}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Policy Number:</strong> {policy.policyNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Coverage:</strong> {policy.coverage}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Deductible:</strong> ${policy.deductible || 'N/A'}
              </Typography>
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                <strong>Expires:</strong> {new Date(policy.endDate).toLocaleDateString()}
              </Typography>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <InsuranceIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No insurance policies
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add insurance policies to track coverage and claims
          </Typography>
        </Box>
      )}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Insurance Policy
      </Button>
    </Box>
  )
}

export default InsuranceTab
