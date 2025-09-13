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
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentNotifications, addNotification, clearCurrentNotifications, fetchNotificationsAPI } from '~/redux/notifications/notificationsSlice'  // Thêm fetchNotificationsAPI

const BLOG_NOTIFICATION_TYPE = {
  REPLY: 'REPLY',
  LIKE: 'LIKE',
  ADOPTION_REQUEST: 'ADOPTION_REQUEST'
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

  // Hàm xử lý khi nhận message từ WebSocket
  const handleWebSocketMessage = (message) => {
    const newNotification = {
      id: Date.now(),
      type: BLOG_NOTIFICATION_TYPE.ADOPTION_REQUEST,
      user: 'System',
      content: message,
      time: moment()
    }
    dispatch(addNotification(newNotification))
  }

  // Subscribe vào topic cho shelter (giả sử user.id là shelterId)
  const user = useSelector((state) => state.user)  // Giả sử có user slice
  const topic = user && user.role === 'SHELTER' ? `/topic/notifications/${user.id}` : null
  useChatWebSocket(topic, handleWebSocketMessage)

  // Gọi API fetch notifications khi component mount
  useEffect(() => {
    if (user && user.role === 'SHELTER') {
      dispatch(fetchNotificationsAPI(user.id))  // Gọi thunk với shelterId
    }
  }, [dispatch, user])

  const handleClearNotifications = () => {
    dispatch(clearCurrentNotifications())
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
                  <Box>
                    {item.type === BLOG_NOTIFICATION_TYPE.REPLY && <ChatBubbleIcon fontSize="small" />}
                    {item.type === BLOG_NOTIFICATION_TYPE.LIKE && <ThumbUpIcon fontSize="small" />}
                    {item.type === BLOG_NOTIFICATION_TYPE.ADOPTION_REQUEST && <NotificationsNoneIcon fontSize="small" />}
                  </Box>
                  <Box>
                    <strong>{item.user}</strong> {item.content}
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {item.time.fromNow()}
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