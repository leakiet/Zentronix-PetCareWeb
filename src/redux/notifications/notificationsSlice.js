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

export const getRequestsByOwnerIdAPI = createAsyncThunk(
  'notifications/getRequestsByOwnerIdAPI',
  async (ownerId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/adoption-requests/owner/${ownerId}`)
    return response.data
  }
)

export const getAppointmentNotificationsByUserIdAPI = createAsyncThunk(
  'notifications/getAppointmentNotificationsByUserIdAPI',
  async (userId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/appointments/notifications/${userId}`)
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
      const existingIndex = state.currentNotifications.findIndex(notification => 
        notification.id === incomingNotification.id ||
        (notification.appointmentId === incomingNotification.appointmentId && 
         notification.type === incomingNotification.type)
      )
      if (existingIndex === -1) {
        state.currentNotifications.unshift(incomingNotification)
      } else {
        state.currentNotifications[existingIndex] = incomingNotification
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsByShelterIdAPI.fulfilled, (state, action) => {
        let incomingNotifications = action.payload
        const filteredNotifications = Array.isArray(incomingNotifications)
          ? incomingNotifications.filter(notification => notification.status !== 'REJECTED')
          : []
        state.currentNotifications = filteredNotifications.reverse()
      })
      .addCase(getRequestsByOwnerIdAPI.fulfilled, (state, action) => {
        let incomingNotifications = action.payload
        const filteredNotifications = Array.isArray(incomingNotifications)
          ? incomingNotifications.filter(notification => notification.status !== 'REJECTED')
          : []
        state.currentNotifications = filteredNotifications.reverse()
      })
      .addCase(getAppointmentNotificationsByUserIdAPI.fulfilled, (state, action) => {
        let incomingNotifications = action.payload
        const notifications = Array.isArray(incomingNotifications) ? incomingNotifications : []
        const formattedNotifications = notifications.map(notification => ({
          ...notification,
          id: notification.id || `appointment_${notification.appointmentId}_${Date.now()}`,
          createdAt: notification.createdAt || new Date().toISOString()
        }))
        if (state.currentNotifications.length > 0) {
          const merged = [...state.currentNotifications, ...formattedNotifications]
          const uniqueNotifications = merged.filter((notification, index, self) =>
            index === self.findIndex(n => n.id === notification.id)
          )
          state.currentNotifications = uniqueNotifications.sort((a, b) => 
            new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt)
          )
        } else {
          state.currentNotifications = formattedNotifications.reverse()
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