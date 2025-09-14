import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import EventIcon from '@mui/icons-material/Event'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentNotifications,
  addNotification,
  fetchNotificationsByShelterIdAPI,
  getRequestsByOwnerIdAPI,
  getAppointmentNotificationsByUserIdAPI
} from '~/redux/notifications/notificationsSlice'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'

const ADOPTION_REQUEST_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notifications = useSelector(selectCurrentNotifications) || []

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const user = useSelector(selectCurrentCustomer)

  const handleNotificationClick = (item) => {
    handleClose()
    if (user?.role === 'SHELTER' && item.adoptionListing?.id) {
      navigate(`/shelter-settings/${item.adoptionListing.id}`)
    } else if (user?.role === 'PET_OWNER' && item.adoptionListing?.id) {
      navigate(`/adoption/${item.adoptionListing.id}`)
    } else if (user?.role === 'PET_OWNER' && item.type?.includes('APPOINTMENT')) {
      navigate('/schedule')
    } else if (user?.role === 'VET' && item.type?.includes('APPOINTMENT')) {
      navigate('/vet-settings')
    }
  }

  const handleWebSocketMessage = useCallback((message) => {
    console.log('Received WebSocket message:', message)

    let newNotification = {}

    if (message.type === 'APPOINTMENT_RESCHEDULED' ||
        message.type === 'APPOINTMENT_STATUS_UPDATE' ||
        message.type === 'APPOINTMENT_COMPLETED' ||
        message.type === 'NEW_APPOINTMENT') {
      newNotification = {
        id: `appointment_${message.appointmentId}_${Date.now()}`, // Unique ID
        type: message.type,
        message: message.message,
        appointmentId: message.appointmentId,
        createdAt: moment().toISOString()
      }
    } else {
      // Existing adoption notification logic
      newNotification = {
        id: `adoption_${message.requestId || Date.now()}`, // Unique ID
        type: 'ADOPTION_REQUEST',
        user: message.user,
        adoptionListing: message.adoptionListing,
        message: message.message,
        status: message.status || ADOPTION_REQUEST_STATUS.PENDING,
        distance: message.distance,
        createdAt: moment().toISOString()
      }
    }

    console.log('Adding notification:', newNotification)
    dispatch(addNotification(newNotification))
  }, [dispatch])

  const topic = user ? `/topic/notifications/${user.id}` : null
  useChatWebSocket(topic, handleWebSocketMessage)

  useEffect(() => {
    if (user) {
      if (user.role === 'SHELTER') {
        dispatch(fetchNotificationsByShelterIdAPI(user.id))
      } else if (user.role === 'PET_OWNER') {
        dispatch(getRequestsByOwnerIdAPI(user.id))
        dispatch(getAppointmentNotificationsByUserIdAPI(user.id))
      } else if (user.role === 'VET') {
        dispatch(getAppointmentNotificationsByUserIdAPI(user.id))
      }
    }
  }, [dispatch, user])


  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="secondary"
          badgeContent={notifications.length}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsIcon sx={{ color: theme => theme.palette.primary.main }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {notifications.length === 0 && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications.map((item, index) => (
          <Box key={item.id}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => handleNotificationClick(item)}
            >
              <Box sx={{
                maxWidth: '100%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {(item.type === 'APPOINTMENT_RESCHEDULED' ||
                    item.type === 'APPOINTMENT_STATUS_UPDATE' ||
                    item.type === 'APPOINTMENT_UPDATE' ||
                    item.type === 'NEW_APPOINTMENT') && <EventIcon fontSize="small" />}
                  {item.type === 'APPOINTMENT_COMPLETED' && <DoneIcon fontSize="small" />}
                  {item.type === 'ADOPTION_REQUEST' && <GroupAddIcon fontSize="small" />}

                  <Box>
                    {item.type?.includes('APPOINTMENT') ? (
                      <span>{item.message}</span>
                    ) : (
                      <span>
                        {user?.role === 'SHELTER' ? (
                          <><strong>{item.user?.fullName}</strong> wants to adopt <strong>{item.adoptionListing?.petName}</strong> ({item.adoptionListing?.breed?.name}, {item.adoptionListing?.age} years old). Message: {item.message} (Distance: {item.distance})</>
                        ) : (
                          <>Your adoption request for <strong>{item.adoptionListing?.petName}</strong> ({item.adoptionListing?.breed?.name}, {item.adoptionListing?.age} years old). Message: {item.message} (Distance: {item.distance})</>
                        )}
                      </span>
                    )}
                  </Box>
                </Box>

                {item.status && !item.type?.includes('APPOINTMENT') && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    {item.status === ADOPTION_REQUEST_STATUS.ACCEPTED && (
                      <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                    )}
                    {item.status === ADOPTION_REQUEST_STATUS.REJECTED && (
                      <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                    )}
                    {item.status === ADOPTION_REQUEST_STATUS.PENDING && (
                      <Chip label="Pending" size="small" />
                    )}
                  </Box>
                )}

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(item.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {index !== notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
