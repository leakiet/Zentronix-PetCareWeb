import {
  useEffect,
  useRef
} from 'react'
import SockJS from 'sockjs-client'
import {
  Client
} from '@stomp/stompjs'

export function useChatWebSocket(topic, onMessage, conversationId = null) {
  const clientRef = useRef(null)

  // Sync typing state from API when conversationId changes
  const syncTypingState = async (convId) => {
    if (!convId) return

    try {
      const response = await fetch(`http://localhost:8080/apis/v1/chat/typing/${convId}`)
      if (response.ok) {
        const typingData = await response.json()
        console.log('[WebSocket] Synced typing state:', typingData)

        // Call onMessage with typing state sync
        if (onMessage) {
          onMessage({
            type: 'TYPING_SYNC',
            conversationId: convId,
            isTyping: typingData.isTyping,
            message: typingData.typingMessage,
            sender: typingData.sender,
            timestamp: typingData.timestamp
          })
        }
      }
    } catch (error) {
      console.warn('[WebSocket] Failed to sync typing state:', error)
    }
  }

  useEffect(() => {
    if (!topic) return

    const sock = new SockJS('http://localhost:8080/apis/v1/ws')
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        console.log('[WebSocket] Connected, syncing typing state...')

        // Sync typing state when connection is established
        if (conversationId) {
          syncTypingState(conversationId)
        }

        (Array.isArray(topic) ? topic : [topic]).forEach((t) => {
          client.subscribe(t, (msg) => {
            const data = JSON.parse(msg.body)
            onMessage(data)
          })
        })
      },
      onStompError: (frame) => {
      },
      onWebSocketError: (event) => {
      },
      onDisconnect: (frame) => {
      },
      onWebSocketClose: (event) => {
        console.warn('[WebSocket] WebSocket closed, attempting to sync typing state...')
        // Try to sync typing state when connection is lost
        if (conversationId) {
          syncTypingState(conversationId)
        }
      },
      debug: (str) => {
        // Want to debug all? Uncomment this line!
        // console.debug('[WebSocket DEBUG]', str)
      }
    })

    client.activate()
    clientRef.current = client

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate()
        clientRef.current = null
      }
    }
  }, [topic, onMessage, conversationId])

  // Expose syncTypingState function for manual sync
  return {
    syncTypingState: (convId) => syncTypingState(convId || conversationId)
  }
}
