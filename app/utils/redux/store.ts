import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/laodingSlice'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
