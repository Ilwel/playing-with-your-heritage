import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  value: LoadingState
}

interface LoadingState {
  open: boolean
}

const initialState: InitialState = {
  value: {
    open: false,
  },
}

export const loading = createSlice({
  name: 'laoding',
  initialState,
  reducers: {
    setLoading: (_, action: PayloadAction<LoadingState>) => {
      return {
        value: action.payload,
      }
    },
  },
})

export const { setLoading } = loading.actions
export default loading.reducer
