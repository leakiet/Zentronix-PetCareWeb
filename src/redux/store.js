import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from './user/employeeSlice.js'
import { customerReducer } from './user/customerSlice.js'
import { cartReducer } from './cart/cartSlice.js'
import { conversationReducer } from './conversation/conversationSlice.js'
import { notificationsReducer } from './notifications/notificationsSlice.js'
import { typingReducer } from './typing/typingSlice.js'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['employee', 'customer', 'cart', 'conversation', 'notifications', 'typing']
}

const rootReducer = combineReducers({
  employee: employeeReducer,
  customer: customerReducer,
  cart: cartReducer,
  conversation: conversationReducer,
  notifications: notificationsReducer,
  typing: typingReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
