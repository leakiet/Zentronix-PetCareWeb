import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: []
}

export const fetchNotificationsByShelterIdAPI = createAsyncThunk(
  'notifications/fetchNotificationsByShelterIdAPI',
  async (shelterId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/adoption-requests/shelter/${shelterId}`)
    return response.data
  }
)

export const updateAdoptionRequestStatusAPI = createAsyncThunk(
  'notifications/updateAdoptionRequestStatusAPI',
  async ({ requestId, status }) => {
    const response = await authorizedAxiosInstance.patch(`${API_ROOT}/apis/v1/adoption-requests/${requestId}/status`, { status })
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = []
    },
    addNotification: (state, action) => {
      const incomingNotification = action.payload
      state.currentNotifications.unshift(incomingNotification)
    }
  },
  extraReducers: (builder) => {
    builder
      // Sửa: Cập nhật case cho thunk mới
      .addCase(fetchNotificationsByShelterIdAPI.fulfilled, (state, action) => {
        let incomingNotifications = action.payload
        state.currentNotifications = Array.isArray(incomingNotifications) ? incomingNotifications.reverse() : []
      })
      .addCase(updateAdoptionRequestStatusAPI.fulfilled, (state, action) => {
        const updatedRequest = action.payload
        const index = state.currentNotifications.findIndex(n => n.id === updatedRequest.id)
        if (index !== -1) {
          state.currentNotifications[index] = updatedRequest
        }
      })
  }
})

export const {
  clearCurrentNotifications,
  addNotification
} = notificationsSlice.actions

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer