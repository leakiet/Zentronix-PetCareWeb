import React, { useEffect, useState, useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Badge'
import ListItemAvatar from '@mui/material/Badge'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { fetchMessagesPaged, sendMessage, fetchEmployeeConversations } from '~/apis/chatApi'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'

export default function EmployeeMessenger() {
  const [convs, setConvs] = useState([])
  const [selectedConv, setSelectedConv] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const listRef = useRef(null)
  const PAGE_SIZE = 20
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const isEmpCanChat = selectedConv?.status === 'EMP' || selectedConv?.status === 'WAITING_EMP'


  useEffect(() => {
    fetchEmployeeConversations().then(setConvs)
  }, [])

  // Load page đầu khi chọn conversation
  useEffect(() => {
    if (!selectedConv) return
    setPage(0)
    setIsLoading(true)
    fetchMessagesPaged(selectedConv.id, 0, PAGE_SIZE).then(data => {
      setMessages([...data.content].reverse())
      setHasMore(!data.last)
      setIsLoading(false)
    })
  }, [selectedConv])

  // Infinite scroll: Load more khi cuộn lên đầu
  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return
    setIsLoading(true)
    fetchMessagesPaged(selectedConv.id, page + 1, PAGE_SIZE).then(data => {
      setMessages(prev => [...[...data.content].reverse(), ...prev])
      setPage(prev => prev + 1)
      setHasMore(!data.last)
      setIsLoading(false)
    })
  }, [selectedConv, page, hasMore, isLoading])

  // Gắn event scroll
  useEffect(() => {
    const list = listRef.current
    if (!list || !hasMore) return
    const onScroll = () => {
      if (list.scrollTop === 0 && hasMore && !isLoading) {
        handleLoadMore()
      }
    }
    list.addEventListener('scroll', onScroll)
    return () => list.removeEventListener('scroll', onScroll)
  }, [handleLoadMore, hasMore, isLoading])

  // Socket
  useChatWebSocket('/topic/emp-notify', (payload) => {
    console.log('[WS] Nhận notify: ', payload)
    fetchEmployeeConversations().then(setConvs)
  })


  useChatWebSocket(selectedConv?.id ? `/topic/conversations/${selectedConv.id}` : null, (msg) => setMessages(prev => [...prev, msg]))

  // Tự động clear selectedConv nếu không còn trong list convs
  useEffect(() => {
    if (!selectedConv) return
    // Nếu selectedConv không còn trong convs nữa (tức là status đã chuyển về AI)
    const stillExist = convs.some(c => c.id === selectedConv.id)
    if (!stillExist) {
      setSelectedConv(null)
      setMessages([])
    }
  }, [convs, selectedConv])

  // Auto scroll xuống cuối khi có tin mới
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  // Khi chọn conv, chỉ set selectedConv
  const handleSelectConv = conv => {
    setSelectedConv(conv)
  }

  // Gửi tin nhắn
  const handleSend = async () => {
    const text = input.trim()
    if (!text || !selectedConv) return
    setInput('')
    const resp = await sendMessage({
      conversationId: selectedConv.id,
      senderRole: 'EMP',
      employeeId: 1, // GÁN CỨNG
      content: text,
      lang: 'vi'
    })
    setMessages(prev => [...prev, resp])
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: 900,
        height: 500,
        border: 1,
        borderColor: 'grey.300',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 2,
        bgcolor: '#f0f2f5'
      }}
    >
      {/* Sidebar */}
      <Paper
        sx={{
          width: 300,
          borderRight: 1,
          borderColor: 'grey.200',
          height: '100%',
          overflowY: 'auto',
          bgcolor: 'white'
        }}
        square
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChatBubbleOutlineIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Tin nhắn
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {convs.map((conv) => (
            <ListItem
              key={conv.id}
              selected={selectedConv?.id === conv.id}
              button
              onClick={() => handleSelectConv(conv)}
              sx={{
                alignItems: 'flex-start',
                borderRadius: 2,
                my: 0.5,
                mx: 1,
                p: 1,
                bgcolor:
                  selectedConv?.id === conv.id
                    ? 'primary.100'
                    : 'background.paper',
                boxShadow: selectedConv?.id === conv.id ? 1 : 'none',
                '&:hover': { bgcolor: 'grey.100' },
                transition: 'background 0.2s'
              }}
            >
              <ListItemAvatar>
                <Badge
                  color="error"
                  badgeContent={conv.unreadCount > 0 ? conv.unreadCount : null}
                  overlap="circular"
                >
                  <Avatar>
                    {conv.customerName?.[0]?.toUpperCase() || '?'}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>
                      {conv.customerName}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#888',
                        marginLeft: 8,
                        fontWeight: 400
                      }}
                    >
                      {conv.lastMessageTime}
                    </span>
                  </Box>
                }
                secondary={
                  <span style={{ fontSize: 13, color: '#666' }}>
                    {conv.lastMessage?.length > 36
                      ? conv.lastMessage.slice(0, 33) + '...'
                      : conv.lastMessage || ''}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'white',
            minHeight: 65
          }}
        >
          {selectedConv && (
            <Avatar>
              {selectedConv.customerName?.[0]?.toUpperCase() || '?'}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {selectedConv
                ? selectedConv.customerName || 'Khách vãng lai'
                : 'Chọn hội thoại để chat'}
            </Typography>
            {selectedConv && (
              <Typography
                variant="body2"
                sx={{ color: selectedConv.status === 'Đang chat' ? 'green' : '#888' }}
              >
                {selectedConv.status}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Chat messages */}
        <Box
          ref={listRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            bgcolor: '#e4e6eb',
            px: 2,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          {selectedConv ? (
            messages.length > 0 ? (
              messages.map((m, idx) => {
                const isMe = m.senderRole === 'EMP' // sửa nếu role khác
                return (
                  <Box
                    key={`${m.id}-${idx}`}
                    sx={{
                      display: 'flex',
                      flexDirection: isMe ? 'row-reverse' : 'row',
                      alignItems: 'flex-end',
                      mb: 0.5
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, mx: 1, bgcolor: isMe ? 'primary.main' : 'grey.400' }}>
                      {m.senderName?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <Box
                      sx={{
                        maxWidth: '60%',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: isMe ? 'primary.main' : 'white',
                        color: isMe ? 'white' : 'black',
                        boxShadow: 1,
                        wordBreak: 'break-word',
                        textAlign: 'left',
                        fontSize: 15,
                        ml: isMe ? 0 : 1,
                        mr: isMe ? 1 : 0
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', fontSize: 13 }}>
                        {m.senderName}
                      </Typography>
                      <span style={{ fontSize: 14 }}>{m.content}</span>
                    </Box>
                  </Box>
                )
              })
            ) : (
              <Typography align="center" sx={{ mt: 8, color: '#888' }}>
                Chưa có tin nhắn nào
              </Typography>
            )
          ) : (
            <Typography align="center" sx={{ mt: 8, color: '#888' }}>
              Chọn hội thoại để chat
            </Typography>
          )}
        </Box>

        {/* Input box */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'grey.200',
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!selectedConv || !isEmpCanChat}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    disabled={!selectedConv || !isEmpCanChat}
                  >
                    <SendIcon color={!selectedConv || !isEmpCanChat ? 'disabled' : 'primary'} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { bgcolor: '#f0f2f5', borderRadius: 2 }
            }}
          />
          {selectedConv && !isEmpCanChat && (
            <Typography color="warning.main" sx={{ px: 2, py: 1, fontSize: 13 }}>
              Khách đang chat với AI, bạn chưa gửi được tin nhắn.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}