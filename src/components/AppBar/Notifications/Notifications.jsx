import { useState } from 'react'
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
import { mockNotifications } from '~/apis/mockData'
const BLOG_NOTIFICATION_TYPE = {
  REPLY: 'REPLY',
  LIKE: 'LIKE'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="secondary"
          badgeContent={mockNotifications.length}
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
        {mockNotifications.length === 0 && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {mockNotifications.map((item, index) => (
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
            {index !== mockNotifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
