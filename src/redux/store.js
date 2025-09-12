import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from './user/employeeSlice.js'
import { customerReducer } from './user/customerSlice.js'
import { cartReducer } from './cart/cartSlice.js'
import { conversationReducer } from './conversation/conversationSlice.js'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['employee', 'customer', 'cart', 'conversation']
}

const rootReducer = combineReducers({
  employee: employeeReducer,
  customer: customerReducer,
  cart: cartReducer,
  conversation: conversationReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
