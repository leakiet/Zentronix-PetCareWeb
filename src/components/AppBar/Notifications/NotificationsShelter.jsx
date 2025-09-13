import { useState, useEffect } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentNotifications, addNotification, clearCurrentNotifications, fetchNotificationsByAdoptionListingIdAPI, updateAdoptionRequestStatusAPI } from '~/redux/notifications/notificationsSlice'

const ADOPTION_REQUEST_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function NotificationsShelter() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const notifications = useSelector(selectCurrentNotifications) || []

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Handle WebSocket message for new adoption requests
  const handleWebSocketMessage = (message) => {
    const newNotification = {
      id: Date.now(),
      type: 'ADOPTION_REQUEST',
      user: message.user,
      adoptionListing: message.adoptionListing,
      content: message.message,
      status: ADOPTION_REQUEST_STATUS.PENDING,
      time: moment()
    }
    dispatch(addNotification(newNotification))
  }

  // Subscribe to WebSocket topic for shelter
  const user = useSelector((state) => state.user)
  const topic = user && user.role === 'SHELTER' ? `/topic/notifications/${user.id}` : null
  useChatWebSocket(topic, handleWebSocketMessage)

  // Fetch adoption requests on mount
  useEffect(() => {
    if (user && user.role === 'SHELTER') {
      dispatch(fetchNotificationsByAdoptionListingIdAPI(user.id))
    }
  }, [dispatch, user])

  const handleClearNotifications = () => {
    dispatch(clearCurrentNotifications())
  }

  // Handle accept/reject
  const updateRequestStatus = (status, requestId) => {
    dispatch(updateAdoptionRequestStatusAPI({ requestId, status }))
  }

  return (
    <Box>
      <Tooltip title="Shelter Notifications">
        <Badge
          color="secondary"
          badgeContent={notifications.length}
          sx={{ cursor: 'pointer' }}
          id="shelter-notification-button"
          aria-controls={open ? 'shelter-notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{ color: 'white' }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="shelter-notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'shelter-notification-button' }}
      >
        {notifications.length === 0 && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications.map((item, index) => (
          <Box key={item.id} onClick={handleClose}>
            <MenuItem sx={{ minWidth: 200, maxWidth: 360, overflowY: 'auto' }}>
              <Box sx={{
                maxWidth: '100%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupAddIcon fontSize="small" />
                  <Box>
                    <strong>{item.user?.fullName}</strong> wants to adopt <strong>{item.adoptionListing?.petName}</strong> ({item.adoptionListing?.breed?.name}, {item.adoptionListing?.age} years old). Message: {item.message} (Distance: {item.distance})
                  </Box>
                </Box>
                {item.status === ADOPTION_REQUEST_STATUS.PENDING && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => updateRequestStatus(ADOPTION_REQUEST_STATUS.ACCEPTED, item.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateRequestStatus(ADOPTION_REQUEST_STATUS.REJECTED, item.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  {item.status === ADOPTION_REQUEST_STATUS.ACCEPTED && (
                    <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                  )}
                  {item.status === ADOPTION_REQUEST_STATUS.REJECTED && (
                    <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                  )}
                </Box>
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
        {notifications.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button variant="outlined" size="small" onClick={handleClearNotifications}>
              Clear All
            </Button>
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default NotificationsShelter