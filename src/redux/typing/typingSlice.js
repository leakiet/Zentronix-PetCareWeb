import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTyping: false,
  typingMessage: '',
  conversationId: null,
  sender: 'PetCare AI',
  timestamp: null
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setTypingStart: (state, action) => {
      const { conversationId, message, sender, timestamp } = action.payload;
      state.isTyping = true;
      state.typingMessage = message || 'AI đang nhập...';
      state.conversationId = conversationId;
      state.sender = sender || 'PetCare AI';
      state.timestamp = timestamp;
    },
    setTypingStop: (state, action) => {
      const { conversationId } = action.payload;
      // Only stop typing for the specific conversation
      if (state.conversationId === conversationId) {
        state.isTyping = false;
        state.typingMessage = '';
        state.timestamp = null;
      }
    },
    resetTyping: (state) => {
      state.isTyping = false;
      state.typingMessage = '';
      state.conversationId = null;
      state.sender = 'PetCare AI';
      state.timestamp = null;
    },
    // Action to handle when AI response is received (auto-stop typing)
    handleAIResponse: (state, action) => {
      const { conversationId } = action.payload;
      if (state.conversationId === conversationId) {
        state.isTyping = false;
        state.typingMessage = '';
        state.timestamp = null;
      }
    }
  }
});

export const { setTypingStart, setTypingStop, resetTyping, handleAIResponse } = typingSlice.actions;

export const selectTyping = (state) => state.typing;
export const selectIsTyping = (state) => state.typing.isTyping;
export const selectTypingMessage = (state) => state.typing.typingMessage;
export const selectTypingConversationId = (state) => state.typing.conversationId;

export const typingReducer = typingSlice.reducer;
