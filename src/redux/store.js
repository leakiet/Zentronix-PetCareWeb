import { configureStore } from '@reduxjs/toolkit'
import { translationsReducer } from './translations/translationsSlice.js'
//config redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['translations']
}

const rootReducer = combineReducers({
  translations: translationsReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
