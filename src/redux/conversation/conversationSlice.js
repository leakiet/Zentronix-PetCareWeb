import { createSlice } from '@reduxjs/toolkit'

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    messages: [],
    conversationId: null,
    chatMode: 'AI',
    awaitingAI: false,
    conversationStatus: 'AI',
    isLoading: false,
    isCreatingConversation: false
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    updateMessage: (state, action) => {
      const { id, ...updates } = action.payload
      const messageIndex = state.messages.findIndex(msg => msg.id === id)
      if (messageIndex !== -1) {
        state.messages[messageIndex] = { ...state.messages[messageIndex], ...updates }
      }
    },
    removePendingMessage: (state, action) => {
      state.messages = state.messages.filter(msg =>
        !(msg.status === 'pending' && msg.id === action.payload)
      )
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload
    },
    setChatMode: (state, action) => {
      state.chatMode = action.payload
    },
    setAwaitingAI: (state, action) => {
      state.awaitingAI = action.payload
    },
    setConversationStatus: (state, action) => {
      state.conversationStatus = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsCreatingConversation: (state, action) => {
      state.isCreatingConversation = action.payload
    },
    clearConversation: (state) => {
      state.messages = []
      state.conversationId = null
      state.chatMode = 'AI'
      state.awaitingAI = false
      state.conversationStatus = 'AI'
      state.isLoading = false
      state.isCreatingConversation = false
    },
    loadFromLocalStorage: (state) => {
      try {
        const savedMessages = localStorage.getItem('chat_messages')
        const savedConversationId = localStorage.getItem('conversationId')
        const savedChatMode = localStorage.getItem('chat_mode')

        if (savedMessages) {
          state.messages = JSON.parse(savedMessages)
        }
        if (savedConversationId) {
          state.conversationId = savedConversationId
        }
        if (savedChatMode) {
          state.chatMode = savedChatMode
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
  }
})

export const {
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
  clearConversation,
  loadFromLocalStorage
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
