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