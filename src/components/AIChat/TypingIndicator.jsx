import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { selectTypingState } from '~/redux/typing/typingSlice'

/**
 * TypingIndicator component that shows typing status for a specific conversation
 * Reads from Redux store and displays typing animation when AI is typing
 */
function TypingIndicator({ conversationId }) {
  // Get typing state for this conversation
  const typingState = useSelector(selectTypingState(conversationId))

  // Don't render anything if not typing
  if (!typingState.isTyping) {
    return null
  }

  return (
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
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: 'success.main' }}>
          {typingState.sender || 'PetCare AI'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.4, color: 'text.secondary' }}>
            {typingState.message || 'AI is typing...'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'success.main',
                animation: 'typing 1.4s infinite ease-in-out',
                '@keyframes typing': {
                  '0%, 60%, 100%': { opacity: 0.3 },
                  '30%': { opacity: 1 }
                }
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'success.main',
                animation: 'typing 1.4s infinite ease-in-out 0.2s',
                '@keyframes typing': {
                  '0%, 60%, 100%': { opacity: 0.3 },
                  '30%': { opacity: 1 }
                }
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'success.main',
                animation: 'typing 1.4s infinite ease-in-out 0.4s',
                '@keyframes typing': {
                  '0%, 60%, 100%': { opacity: 0.3 },
                  '30%': { opacity: 1 }
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TypingIndicator