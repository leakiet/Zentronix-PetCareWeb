import { configureStore } from '@reduxjs/toolkit'
import { translationsReducer } from './translations/translationsSlice.js'
import { employeeReducer } from './user/employeeSlice.js'
import { customerReducer } from './user/customerSlice.js'
//config redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['translations', 'employee', 'customer']
}

const rootReducer = combineReducers({
  translations: translationsReducer,
  employee: employeeReducer,
  customer: customerReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
