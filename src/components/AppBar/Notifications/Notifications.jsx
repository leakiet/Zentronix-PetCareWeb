import { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentNotifications, addNotification, clearCurrentNotifications, fetchNotificationsByShelterIdAPI, updateAdoptionRequestStatusAPI } from '~/redux/notifications/notificationsSlice'
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
  const notifications = useSelector(selectCurrentNotifications) || []

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const user = useSelector(selectCurrentCustomer)

  // Handle WebSocket message for new adoption requests
  const handleWebSocketMessage = useCallback((message) => {
    const newNotification = {
      id: Date.now(),
      type: 'ADOPTION_REQUEST',
      user: message.user,
      adoptionListing: message.adoptionListing,
      message: message.message,
      status: message.status || ADOPTION_REQUEST_STATUS.PENDING,
      distance: message.distance,
      createdAt: moment()
    }
    dispatch(addNotification(newNotification))
  }, [dispatch])

  const topic = user ? `/topic/notifications/${user.id}` : null
  useChatWebSocket(topic, handleWebSocketMessage)

  useEffect(() => {
    if (user) {
      if (user.role === 'SHELTER') {
        dispatch(fetchNotificationsByShelterIdAPI(user.id))
      }
    }
  }, [dispatch, user])

  const handleClearNotifications = () => {
    dispatch(clearCurrentNotifications())
  }

  const updateRequestStatus = (status, requestId) => {
    dispatch(updateAdoptionRequestStatusAPI({ requestId, status }))
  }

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
                    {user?.role === 'SHELTER' ? (
                      <span><strong>{item.user?.fullName}</strong> wants to adopt <strong>{item.adoptionListing?.petName}</strong> ({item.adoptionListing?.breed?.name}, {item.adoptionListing?.age} years old). Message: {item.message} (Distance: {item.distance})</span>
                    ) : (
                      <span>Your adoption request for <strong>{item.adoptionListing?.petName}</strong> ({item.adoptionListing?.breed?.name}, {item.adoptionListing?.age} years old). Message: {item.message} (Distance: {item.distance})</span>
                    )}
                  </Box>
                </Box>
                {/* {user?.role === 'SHELTER' && item.status === ADOPTION_REQUEST_STATUS.PENDING && (
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
                )} */}
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
        {/* {notifications.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button variant="outlined" size="small" onClick={handleClearNotifications}>
              Clear All
            </Button>
          </Box>
        )} */}
      </Menu>
    </Box>
  )
}

export default Notifications
