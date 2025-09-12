import authorizedAxiosInstance from '~/utils/authorizeAxios'
import {
  API_ROOT
} from '~/utils/constants'

const CHAT_URL = `${API_ROOT}/apis/v1/chat`

/**
 * Lấy tin nhắn theo conversationId, có hỗ trợ phân trang
 */
export async function fetchAllMessages (conversationId, limit, before) {
  const params = {
    conversationId
  }
  if (limit) params.limit = limit
  if (before) params.before = before
  const {
    data
  } = await authorizedAxiosInstance.get(`${CHAT_URL}/messages`, {
    params
  })
  return data
}

/**
 * Gửi tin nhắn (cho AI hoặc EMP)
 * @param {Object} args
 * @param {number|string} args.conversationId
 * @param {'PET_OWNER'|'EMP'} args.senderRole
 * @param {string} args.content
 * @param {string} [args.lang]
 * @param {string} [args.idempotencyKey]
 * @param {string} [args.email]
 * @param {number} [args.employeeId]
 */
export async function sendMessage({
  conversationId,
  senderRole,
  content,
  lang,
  idempotencyKey,
  email,
  employeeId
}) {
  // Validation
  if (!content || content.trim() === '') {
    throw new Error('Message cannot be empty')
  }
  if (!senderRole) {
    throw new Error('SenderRole is required')
  }

  const url = new URL(`${CHAT_URL}/send`)
  if (email) url.searchParams.append('email', email)
  if (employeeId) url.searchParams.append('employeeId', employeeId)

  const body = {
    conversationId,
    senderRole,
    message: content.trim(),
    lang,
    idempotencyKey: idempotencyKey || `${Date.now()}-${Math.random()}`
  }

  const {
    data
  } = await authorizedAxiosInstance.post(url.toString(), body)
  return data
}

/**
 * Lấy danh sách conversation của nhân viên hiện tại (nếu là EMP)
 */
// Removed duplicate function declaration for fetchEmployeeConversations

/**
 * Lấy trạng thái conversation (AI hoặc EMP)
 */
export async function fetchConversationStatus(conversationId) {
  const {
    data
  } = await authorizedAxiosInstance.get(
    `${CHAT_URL}/status`, {
      params: {
        conversationId
      }
    }
  )
  return data // "AI" | "EMP" | "WAITING_EMP"
}
// Lấy tất cả conversation cho nhân viên
export async function fetchEmployeeConversations() {
  // GET /apis/v1/chat/employee/conversations
  const {
    data
  } = await authorizedAxiosInstance.get(`${CHAT_URL}/employee/conversations`)
  return data
}// Chat APIs
export const chatApis = {
  // Common
  getMessagesPaged: async (conversationId, page = 0, size = 20) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/chat/messages-paged?conversationId=${conversationId}&page=${page}&size=${size}`
    )
    return response.data // response là Page<ChatResponse>
  },


  // Customer chat
  sendCustomerMessage: async ({ conversationId, content, email, senderRole = 'PET_OWNER', lang = 'vi' }) => {
    // Validation
    if (!content || content.trim() === '') {
      throw new Error('Message cannot be empty')
    }

    const url = new URL(`${API_ROOT}/chat/send`)
    if (email) url.searchParams.append('email', email)

    const response = await authorizedAxiosInstance.post(url.toString(), {
      conversationId,
      message: content.trim(),
      senderRole,
      lang
    })
    return response.data
  },

  // Employee chat
  sendEmployeeMessage: async ({ conversationId, content, employeeId, senderRole = 'EMP', lang = 'vi' }) => {
    // Validation
    if (!content || content.trim() === '') {
      throw new Error('Message cannot be empty')
    }

    const url = new URL(`${API_ROOT}/chat/send`)
    if (employeeId) url.searchParams.append('employeeId', employeeId)

    const response = await authorizedAxiosInstance.post(url.toString(), {
      conversationId,
      message: content.trim(),
      senderRole,
      lang
    })
    return response.data
  },

  getConversations: async (customerId) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/chat/conversations?customerId=${customerId}`
    )
    return response.data
  },

  getEmployeeConversations: async (employeeId) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/chat/conversations?employeeId=${employeeId}`
    )
    return response.data
  }
}// Lấy tin nhắn phân trang, tin mới nhất trước (page=0)
export async function fetchMessagesPaged(conversationId, page = 0, size = 20) {
  const { data } = await authorizedAxiosInstance.get(
    `${CHAT_URL}/messages-paged`,
    { params: { conversationId, page, size } }
  )
  return data
}

/**
 * Đánh dấu tất cả tin nhắn chưa đọc của CUSTOMER trong một conversation là đã đọc
 */
export async function markConversationRead(conversationId) {
  return authorizedAxiosInstance.post(
    `${CHAT_URL}/mark-read`,
    null, // Không cần body
    { params: { conversationId } }
  )
}
