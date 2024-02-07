import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserInterface {
  id: string
  username: string
  __typename?: string
}

export interface PlayerInterface {
  money: number
  playable: boolean
  square: string
  user: UserInterface
  role: 'ADMIN' | 'PLAYER' | 'SPECTATOR'
  __typename?: string
}

export interface ChatMessageInterface {
  msg: string
  username: string
  createdAt: string
  __typename?: string
}

export interface GameState {
  id: string
  players: PlayerInterface[]
  status: string
  turnPlayer: number
  chat: ChatMessageInterface[]
  __typename?: string
}

interface InitialState {
  value: GameState
}

const initialState: InitialState = {
  value: {
    id: '',
    players: [],
    status: 'CREATED',
    turnPlayer: 0,
    chat: [],
  },
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (_, action: PayloadAction<GameState>) => {
      return {
        value: action.payload,
      }
    },
  },
})

export const { setGame } = game.actions
export default game.reducer
