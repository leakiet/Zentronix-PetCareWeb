import { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import { fetchMessagesPaged, sendMessage, fetchConversationStatus } from '~/apis/chatApi'
import { useChatWebSocket } from '~/hooks/useChatWebSocket'
import {
  setMessages,
  addMessage,
  updateMessage,
  removePendingMessage,
  setConversationId,
  setChatMode,
  setAwaitingAI,
  setConversationStatus,
  setIsLoading,
  setIsCreatingConversation,
  loadFromLocalStorage
} from '~/redux/conversation/conversationSlice'

// Helper fallback cho senderName
function getSenderName(msg, customerName) {
  if (msg.senderName) return msg.senderName
  if (msg.senderRole === 'PET_OWNER') return customerName || 'YOU'
  if (msg.senderRole === 'AI') return 'AI Assistant'
  if (msg.senderRole === 'EMP') return 'Employee'

  // Fallback to backend sender field if available
  if (msg.sender) {
    if (msg.sender === 'User') return customerName || 'YOU'
    if (msg.sender === 'PetCare AI') return 'AI Assistant'
    return msg.sender
  }

  return 'Unknown'
}

// Helper để xác định loại message
function getMessageType(msg) {
  if (msg.senderRole === 'PET_OWNER' || msg.sender === 'User') return 'user'
  if (msg.senderRole === 'AI' || msg.sender === 'PetCare AI') return 'ai'
  if (msg.senderRole === 'EMP') return 'emp'
  return 'unknown'
}

function ChatWidget({ conversationId = null, initialMode = 'AI' }) {
  const dispatch = useDispatch()

  // Redux state
  const {
    messages,
    conversationId: reduxConversationId,
    chatMode,
    awaitingAI,
    conversationStatus,
    isLoading,
    isCreatingConversation
  } = useSelector(state => state.conversation)

  // Local state (chỉ những state không cần persist)
  const [input, setInput] = useState('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [animationConvId, setAnimationConvId] = useState(reduxConversationId || conversationId)

  const listRef = useRef(null)
  const PAGE_SIZE = 20

  const customerId = useSelector(state => state.customer.currentCustomer?.id)
  const customerName = useSelector(state => state.customer.currentCustomer?.name)
  const customerEmail = useSelector(state => state.customer.currentCustomer?.email)
  const isCustomerLoggedIn = useSelector(state => !!state.customer.currentCustomer)

  // Load conversation data from localStorage on mount theo user
  useEffect(() => {
    if (customerEmail) {
      // Load conversation data theo email của user
      const userConversationKey = `conversation_${customerEmail}`
      const userMessagesKey = `messages_${customerEmail}`
      const userChatModeKey = `chatMode_${customerEmail}`

      const savedConversationId = localStorage.getItem(userConversationKey)
      const savedMessages = localStorage.getItem(userMessagesKey)
      const savedChatMode = localStorage.getItem(userChatModeKey)

      // Reset Redux state trước khi load data mới
      dispatch(setMessages([]))
      dispatch(setConversationId(null))

      if (savedConversationId) {
        dispatch(setConversationId(savedConversationId))
        setAnimationConvId(savedConversationId)
        console.log('Loaded conversation for user:', customerEmail, 'ID:', savedConversationId)
      }

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages)
        dispatch(setMessages(parsedMessages))
        console.log('Loaded messages for user:', customerEmail, 'count:', parsedMessages.length)
      }

      if (savedChatMode) {
        dispatch(setChatMode(savedChatMode))
        console.log('Loaded chatMode for user:', customerEmail, 'mode:', savedChatMode)
      }
    } else {
      // Nếu không có user đăng nhập, clear state
      dispatch(setMessages([]))
      dispatch(setConversationId(null))
      setAnimationConvId(null)
    }
  }, [customerEmail, dispatch])

  // Sync animationConvId with Redux conversationId
  useEffect(() => {
    if (reduxConversationId && reduxConversationId !== animationConvId) {
      setAnimationConvId(reduxConversationId)
    }
  }, [reduxConversationId, animationConvId])

  // Sync Redux state to localStorage theo user
  useEffect(() => {
    if (customerEmail && messages.length > 0) {
      const userMessagesKey = `messages_${customerEmail}`
      localStorage.setItem(userMessagesKey, JSON.stringify(messages))
      console.log('Saved messages for user:', customerEmail, 'count:', messages.length)
    }
  }, [messages, customerEmail])

  useEffect(() => {
    if (customerEmail && reduxConversationId) {
      const userConversationKey = `conversation_${customerEmail}`
      localStorage.setItem(userConversationKey, reduxConversationId)
      console.log('Saved conversationId for user:', customerEmail, 'ID:', reduxConversationId)
    }
  }, [reduxConversationId, customerEmail])

  useEffect(() => {
    if (customerEmail && chatMode) {
      const userChatModeKey = `chatMode_${customerEmail}`
      localStorage.setItem(userChatModeKey, chatMode)
    }
  }, [chatMode, customerEmail])

  // Gộp các logic lấy conversationId từ props/localStorage theo user
  useEffect(() => {
    if (!customerEmail) return

    let id = conversationId
    if (!id) {
      const userConversationKey = `conversation_${customerEmail}`
      const stored = localStorage.getItem(userConversationKey)
      id = stored
    }
    if (id) {
      setAnimationConvId(id)
      dispatch(setConversationId(id))
      const userConversationKey = `conversation_${customerEmail}`
      localStorage.setItem(userConversationKey, id)
      dispatch(setIsCreatingConversation(false)) // Reset flag khi load từ localStorage
      fetchConversationStatus(id).then(status => {
        dispatch(setConversationStatus(status))
        dispatch(setChatMode(status === 'AI' ? 'AI' : 'EMP'))
      })
    } else {
      dispatch(setIsCreatingConversation(false)) // Reset flag nếu không có conversationId
    }
  }, [conversationId, customerEmail, dispatch])

  // Load messages khi animationConvId thay đổi (không phụ thuộc vào isCreatingConversation)
  useEffect(() => {
    if (!animationConvId) return

    console.log('Loading messages for conversationId:', animationConvId)

    // Load messages từ server
    dispatch(setIsLoading(true))
    fetchMessagesPaged(animationConvId, 0, PAGE_SIZE).then((data) => {
      const loadedMessages = [...data.content].reverse()
      console.log('Loaded messages from server:', loadedMessages.length)

      // Set messages từ server, giữ lại pending messages nếu có
      dispatch(setMessages([...loadedMessages, ...messages.filter(m => m.status === 'pending')]))
      setPage(0)
      setHasMore(!data.last)
      dispatch(setIsLoading(false))
    }).catch((error) => {
      console.error('Error loading messages:', error)
      dispatch(setIsLoading(false))
      // Có thể hiển thị empty state hoặc error message
    })
  }, [animationConvId])

  // Auto scroll cuối khi messages thay đổi
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  // Infinite scroll khi lên đầu
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    fetchMessagesPaged(animationConvId, page + 1, PAGE_SIZE).then((data) => {
      setMessages(prev => [...[...data.content].reverse(), ...prev])
      setPage(prev => prev + 1)
      setHasMore(!data.last)
      setIsLoading(false)
    })
  }, [animationConvId, page, hasMore, isLoading])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const handleScroll = () => {
      if (list.scrollTop === 0 && hasMore && !isLoading) handleLoadMore()
    }
    list.addEventListener('scroll', handleScroll)
    return () => list.removeEventListener('scroll', handleScroll)
  }, [handleLoadMore, hasMore, isLoading])

  // Fallback senderName cho pending messages
  useEffect(() => {
    setMessages(prev =>
      prev.map(m =>
        m.status === 'pending' && m.senderRole === 'PET_OWNER' && !m.senderName
          ? { ...m, senderName: customerName || 'YOU' }
          : m
      )
    )
  }, [customerName])

  // Xử lý tin nhắn từ websocket
  const handleIncoming = useCallback(
    (msg) => {
      console.log('Received WebSocket message:', msg)

      // ✅ Kiểm tra duplicate theo nhiều tiêu chí
      const isDuplicate = messages.some(m =>
        // Same ID
        m.id === msg.id ||
        // Same content và same sender trong khoảng thời gian ngắn (5 giây)
        (m.content === (msg.message || msg.content) &&
         m.senderRole === (msg.sender === 'PetCare AI' ? 'AI' : 'PET_OWNER') &&
         Math.abs(new Date(m.timestamp) - new Date(msg.timestamp)) < 5000) // 5 seconds
      )

      if (isDuplicate) {
        console.log('Duplicate message detected, skipping:', msg.id || 'no-id', 'content:', msg.message || msg.content)
        return
      }

      // ✅ CÁCH MỚI: Xóa pending messages dựa trên logic thông minh hơn
      // 1. Nếu message từ user (không phải AI), xóa pending messages có cùng content
      // 2. Nếu message từ AI, không cần xóa pending (vì user message đã được xử lý bởi HTTP)

      if (msg.sender !== 'PetCare AI' && msg.senderName !== 'PetCare AI') {
        // Đây là message từ user, có thể là confirmation của message đã gửi
        const messageContent = msg.message || msg.content
        if (messageContent) {
          // Chỉ xóa pending messages, không xóa messages đã được update thành 'sent'
          const pendingToRemove = messages
            .filter(m => m.status === 'pending' &&
                        m.content === messageContent &&
                        m.senderRole === 'PET_OWNER')
            .map(m => m.id)

          console.log('Removing pending messages:', pendingToRemove)
          pendingToRemove.forEach(id => {
            dispatch(removePendingMessage(id))
          })
        }
      }

      // Thêm message mới vào Redux
      dispatch(addMessage({
        ...msg,
        senderRole: msg.sender === 'PetCare AI' ? 'AI' : 'PET_OWNER'
      }))

      // Cập nhật awaitingAI state
      if (msg.senderName === 'AI' || msg.senderName === 'PetCare AI' || msg.sender === 'PetCare AI') {
        dispatch(setAwaitingAI(false))
      }
    },
    [dispatch, messages]
  )


  useChatWebSocket(
    animationConvId && !isCreatingConversation ? `/topic/conversations/${animationConvId}` : null,
    handleIncoming
  )


  // Gửi tin nhắn
  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text) {
      console.error('Message cannot be empty')
      return
    }
    if (chatMode === 'AI' && awaitingAI) return

    setInput('')
    if (chatMode === 'AI') dispatch(setAwaitingAI(true))
    const tempId = `temp-${Date.now()}`

    // Add pending message to Redux
    console.log('Adding pending message:', tempId, 'content:', text)
    dispatch(addMessage({
      id: tempId,
      conversationId: animationConvId,
      senderName: isCustomerLoggedIn ? customerName : 'YOU',
      senderRole: 'PET_OWNER',
      content: text,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }))

    const params = {
      conversationId: animationConvId,
      senderRole: 'PET_OWNER',
      content: text,
      lang: 'vi'
    }
    if (isCustomerLoggedIn && customerEmail) {
      params.email = customerEmail
    }

    try {
      // Set flag đang tạo conversation mới
      if (!animationConvId) {
        dispatch(setIsCreatingConversation(true))
      }

      const response = await sendMessage(params)

      // ✅ Xử lý response trực tiếp thay vì chờ WebSocket
      console.log('Received response from BE:', response)

      // Cập nhật conversationId nếu đây là lần đầu gửi (conversationId ban đầu null)
      if (!animationConvId && response.conversationId) {
        console.log('New conversation created:', response.conversationId)
        setAnimationConvId(response.conversationId)
        dispatch(setConversationId(response.conversationId))

        // Lưu conversationId theo user
        if (customerEmail) {
          const userConversationKey = `conversation_${customerEmail}`
          localStorage.setItem(userConversationKey, response.conversationId)
          console.log('Saved conversationId for user:', customerEmail, 'ID:', response.conversationId)
        }

        dispatch(setIsCreatingConversation(false))
      }

      // ✅ Xử lý response để hiển thị message ngay lập tức
      console.log('Processing HTTP response for tempId:', tempId, 'response:', response)

      // Thay thế pending message bằng message từ server
      console.log('Updating pending message to sent:', tempId)
      dispatch(updateMessage({
        id: tempId,
        status: 'sent',
        messageId: response.messageId,
        timestamp: response.timestamp
      }))

      // Nếu response có message từ AI, thêm message mới
      if (response.sender === 'PetCare AI' || response.isFromAI) {
        console.log('Adding AI response message:', response.messageId)
        dispatch(addMessage({
          id: response.messageId || Date.now(),
          conversationId: response.conversationId,
          senderName: response.sender,
          senderRole: 'AI',
          content: response.message,
          timestamp: response.timestamp,
          status: 'sent',
          isFromAI: true
        }))
      }

      // ✅ Cập nhật trạng thái AI
      if (response.sender === 'PetCare AI' || response.isFromAI) {
        dispatch(setAwaitingAI(false))
      }

    } catch (error) {
      console.error('Send message error:', error)
      // Xóa pending message và thêm error message
      dispatch(removePendingMessage(tempId))
      dispatch(addMessage({
        id: Date.now() + 1,
        conversationId: animationConvId,
        senderName: 'SYSTEM',
        senderRole: 'SYSTEM',
        content: error?.message || 'Gửi thất bại',
        timestamp: new Date().toISOString(),
        status: 'ERROR'
      }))
      dispatch(setAwaitingAI(false))
      dispatch(setIsCreatingConversation(false)) // Reset flag nếu có lỗi
    }
  }, [
    input, chatMode, awaitingAI, animationConvId, isCreatingConversation,
    isCustomerLoggedIn, customerEmail, customerName, dispatch
  ])


  // Chuyển AI <-> EMP
  const handleToggleChat = useCallback(() => {
    if (chatMode === 'AI') {
      if (!isCustomerLoggedIn) {
        window.location.href = '/login'
        return
      }
      sendMessage({
        conversationId: animationConvId,
        senderRole: 'PET_OWNER',
        email: customerEmail,
        content: '/meet_emp',
        lang: 'vi'
      }).then((resp) => {
        if (resp.senderName !== 'SYSTEM') {
          dispatch(addMessage({
            id: resp.messageId || Date.now(),
            conversationId: resp.conversationId,
            senderName: resp.sender,
            senderRole: resp.sender === 'PetCare AI' ? 'AI' : 'PET_OWNER',
            content: resp.message,
            timestamp: resp.timestamp,
            status: resp.status,
            isFromAI: resp.isFromAI
          }))
        }
        dispatch(setConversationStatus('WAITING_EMP'))
        dispatch(setChatMode('EMP'))
      }).catch((error) => {
        console.error('Toggle to EMP error:', error)
      })
    } else {
      sendMessage({
        conversationId: animationConvId,
        senderRole: 'PET_OWNER',
        email: customerEmail,
        content: '/backtoAI',
        lang: 'vi'
      }).then((resp) => {
        if (resp.senderName !== 'SYSTEM') {
          dispatch(addMessage({
            id: resp.messageId || Date.now(),
            conversationId: resp.conversationId,
            senderName: resp.sender,
            senderRole: resp.sender === 'PetCare AI' ? 'AI' : 'PET_OWNER',
            content: resp.message,
            timestamp: resp.timestamp,
            status: resp.status,
            isFromAI: resp.isFromAI
          }))
        }
        dispatch(setConversationStatus('AI'))
        dispatch(setChatMode('AI'))
      }).catch((error) => {
        console.error('Toggle to AI error:', error)
      })
    }
  }, [chatMode, isCustomerLoggedIn, animationConvId, customerEmail, dispatch])

  return (
    <Box sx={{ width: 400, border: 1, borderColor: 'grey.300', borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: 'primary.main' }}>
        💬 {chatMode === 'AI' ? 'AI Assistant Chat' : 'Customer Support'}
      </Typography>
      <List ref={listRef} sx={{ height: 300, overflowY: 'auto', bgcolor: 'grey.50', mb: 2, p: 1 }}>
        {messages.map((m, idx) => {
          const messageType = getMessageType(m)
          const content = m.content || m.message

          return (
            <ListItem key={`${m.id}-${idx}`} sx={{ px: 0, py: 0.5 }}>
              {messageType === 'user' ? (
                // User message - bên phải
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 1 }}>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      p: 1.5,
                      borderRadius: '18px 18px 4px 18px',
                      boxShadow: 1,
                      wordWrap: 'break-word'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {getSenderName(m, customerName)}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                      {content}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                // AI/Employee message - bên trái
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mb: 1 }}>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      p: 1.5,
                      borderRadius: '18px 18px 18px 4px',
                      boxShadow: 1,
                      wordWrap: 'break-word'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: messageType === 'ai' ? 'success.main' : 'warning.main' }}>
                      {getSenderName(m, customerName)}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                      {content}
                    </Typography>
                  </Box>
                </Box>
              )}
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={chatMode === 'AI' && awaitingAI}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={chatMode === 'AI' && awaitingAI || (chatMode === 'EMP' && !isCustomerLoggedIn)}
        >
  Send
        </Button>

      </Box>
    </Box>
  )
}

// Wrapper component: Đơn giản hóa, chỉ 1 Slide + 1 Paper
export default function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggleChat = useCallback(() => setIsOpen(prev => !prev), [])

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
        onClick={handleToggleChat}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
      <Slide direction="up" in={isOpen} mountOnEnter>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 999,
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: '90vw',
            maxHeight: '80vh'
          }}
        >
          <ChatWidget />
        </Paper>
      </Slide>
    </>
  )
}
