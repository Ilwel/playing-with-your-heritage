import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  value: AuthState
}

interface AuthState {
  id: string
  username: string
  token: string
}

const initialState: InitialState = {
  value: {
    id: '',
    username: '',
    token: '',
  },
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<AuthState>) => {
      return {
        value: action.payload,
      }
    },
    resetAuth: () => {
      return {
        value: initialState.value,
      }
    },
  },
})

export const { setAuth, resetAuth } = auth.actions
export default auth.reducer
