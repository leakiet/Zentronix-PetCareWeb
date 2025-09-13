import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  minWidth: 320,
  maxWidth: 460,
  width: '90%',
  outline: 'none'
}

function BackToLoginConfirm({
  stepName = 'password reset process',
  customMessage = null
}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = () => {
    navigate('/login')
  }

  const warningMessage = customMessage ||
    `Are you sure you want to go back to the login page?\n\nThe current ${stepName} will be cancelled and you will need to start over from the beginning.`

  return (
    <>
      <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
        <Typography
          component="a"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            handleOpen()
          }}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              color: '#ffbb39',
              textDecoration: 'underline'
            }
          }}
        >
          Back to Login
        </Typography>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
              zIndex: 1
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} textAlign="center" mb={2}>
            Confirm Back to Login
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2} sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
            {warningMessage}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: '#fff3e0',
            border: '1px solid #ffb74d',
            mb: 3
          }}>
            <Typography variant="body2" sx={{ color: '#e65100', fontWeight: 500 }}>
              ⚠️ Note: This action cannot be undone!
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                minWidth: 120,
                borderRadius: 5
              }}
            >
              Continue
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                minWidth: 120,
                borderRadius: 5,
                bgcolor: (theme) => theme.palette.primary.secondary,
                '&:hover': {
                  bgcolor: (theme) => theme.palette.primary.main
                }
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default BackToLoginConfirm
