import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from './user/employeeSlice.js'
import { customerReducer } from './user/customerSlice.js'
import { cartReducer } from './cart/cartSlice.js'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['employee', 'customer', 'cart']
}

const rootReducer = combineReducers({
  employee: employeeReducer,
  customer: customerReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
