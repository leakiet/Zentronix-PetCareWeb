import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  currentLanguage: 'vi'
}

export const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload
    }
  }
})

export const { updateCurrentLanguage } = translationsSlice.actions

export const selectCurrentLanguage = (state) => {
  return state.translations.currentLanguage
}

export const translationsReducer = translationsSlice.reducer
