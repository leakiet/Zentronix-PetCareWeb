import { createSlice } from '@reduxjs/toolkit'

const typingSlice = createSlice({
  name: 'typing',
  initialState: {
    // typingStates[conversationId] = { isTyping, message, sender }
    typingStates: {},
    isTyping: false,
    typingMessage: '',
    currentConversationId: null
  },
  reducers: {
    // Set typing state for a specific conversation
    setTypingState: (state, action) => {
      const { conversationId, isTyping, message, sender } = action.payload
      state.typingStates[conversationId] = {
        isTyping,
        message: message || '',
        sender: sender || 'AI',
        timestamp: new Date().toISOString()
      }

      // Update legacy fields for backward compatibility
      if (state.currentConversationId === conversationId) {
        state.isTyping = isTyping
        state.typingMessage = message || ''
      }
    },

    // Start typing for a conversation
    setTypingStart: (state, action) => {
      const { conversationId, message, sender } = action.payload
      state.typingStates[conversationId] = {
        isTyping: true,
        message: message || 'AI is typing...',
        sender: sender || 'AI',
        timestamp: new Date().toISOString()
      }

      // Update legacy fields
      if (state.currentConversationId === conversationId) {
        state.isTyping = true
        state.typingMessage = message || 'AI is typing...'
      }
    },

    // Stop typing for a conversation
    setTypingStop: (state, action) => {
      const { conversationId } = action.payload
      if (state.typingStates[conversationId]) {
        state.typingStates[conversationId] = {
          ...state.typingStates[conversationId],
          isTyping: false,
          timestamp: new Date().toISOString()
        }
      }

      // Update legacy fields
      if (state.currentConversationId === conversationId) {
        state.isTyping = false
        state.typingMessage = ''
      }
    },

    // Clear typing state for a conversation
    clearTypingState: (state, action) => {
      const { conversationId } = action.payload
      delete state.typingStates[conversationId]

      // Clear legacy fields if this was the current conversation
      if (state.currentConversationId === conversationId) {
        state.isTyping = false
        state.typingMessage = ''
      }
    },

    // Set current conversation (for legacy compatibility)
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload
      // Update legacy fields from typing state
      const typingState = state.typingStates[action.payload]
      if (typingState) {
        state.isTyping = typingState.isTyping
        state.typingMessage = typingState.message
      } else {
        state.isTyping = false
        state.typingMessage = ''
      }
    },

    // Handle AI response (stop typing when AI responds)
    handleAIResponse: (state, action) => {
      const { conversationId } = action.payload
      if (state.typingStates[conversationId]) {
        state.typingStates[conversationId] = {
          ...state.typingStates[conversationId],
          isTyping: false,
          timestamp: new Date().toISOString()
        }
      }

      // Update legacy fields
      if (state.currentConversationId === conversationId) {
        state.isTyping = false
        state.typingMessage = ''
      }
    },

    // Clear all typing states
    clearAllTypingStates: (state) => {
      state.typingStates = {}
      state.isTyping = false
      state.typingMessage = ''
      state.currentConversationId = null
    }
  }
})

export const {
  setTypingState,
  setTypingStart,
  setTypingStop,
  clearTypingState,
  setCurrentConversation,
  handleAIResponse,
  clearAllTypingStates
} = typingSlice.actions

export const selectIsTyping = (state) => state.typing.isTyping
export const selectTypingMessage = (state) => state.typing.typingMessage

// Selector to get typing state for a specific conversation
export const selectTypingState = (conversationId) => (state) =>
  state.typing.typingStates[conversationId] || {
    isTyping: false,
    message: '',
    sender: 'AI'
  }

export const typingReducer = typingSlice.reducer
