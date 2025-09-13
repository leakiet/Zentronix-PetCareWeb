import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: []
}

// Thêm async thunk để fetch notifications từ API
export const fetchNotificationsAPI = createAsyncThunk(
  'notifications/fetchNotificationsAPI',
  async (shelterId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/notifications/shelter/${shelterId}`)
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
    builder.addCase(fetchNotificationsAPI.fulfilled, (state, action) => {
      let incomingNotifications = action.payload
      state.currentNotifications = Array.isArray(incomingNotifications) ? incomingNotifications.reverse() : []
    })
  }
})

export const {
  clearCurrentNotifications,
  addNotification } = notificationsSlice.actions

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer