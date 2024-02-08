/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
import { useSession } from './useSession'
import { CHANGE_GAME_STATE } from '../graphql/mutations/UserMutations'
import { usePathname, useRouter } from 'next/navigation'
import { CONNECT_ON_GAME } from '../graphql/subscriptions/GameSubscriptions'
import { type AppDispatch, useAppSelector } from '../redux/store'
import { useDispatch } from 'react-redux'
import {
  type GameState,
  setGame,
  type ChatMessageInterface,
} from '../redux/features/gameSlice'
import { GET_GAME } from '../graphql/queries/UserQueries'

type Handle = () => void
type HandleMsg = (msg: ChatMessageInterface) => void

export const cleanGame = ({
  __typename: _,
  players,
  chat,
  ...game
}: GameState) => ({
  players: players.map(
    ({ __typename: _, user: { __typename: __, ...user }, ...player }) => ({
      user,
      ...player,
    })
  ),
  chat: chat.map(({ __typename: _, ...chat }) => ({
    ...chat,
  })),
  ...game,
})

export function useGame(): {
  handleOut: Handle
  handleStart: Handle
  handleChat: HandleMsg
  handleUpdate: (game: GameState) => void
  game: GameState
} {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const game = useAppSelector((state) => state.gameReducer.value)
  const dispatch = useDispatch<AppDispatch>()
  const attGame = (game: unknown) =>  dispatch(setGame(cleanGame(game as GameState)))
  const [changeGameState] = useMutation(CHANGE_GAME_STATE)

  useQuery(GET_GAME, {
    variables:{
      getGameId: pathname.split('/')[2]
    },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => attGame(data.getGame),
  })

  useSubscription(CONNECT_ON_GAME, {
    variables: {
      connectOnGameId: game?.id,
    },
    fetchPolicy: 'no-cache',
    onData: ({ data : { data } }) => attGame(data.connectOnGame),
  })

  useEffect(() => {
    switch (game?.status) {
      case 'STARTED':
        router.push(`/game/${game.id}`)
        break
      default:
        break
    }
  }, [game.status])

  const handleUpdate = (gameAtt: GameState) => {
    void changeGameState({
      variables: {
        game: gameAtt,
      }
    })
  }

  const handleChat = (msg: ChatMessageInterface) => {
    const aux = [...game.chat]
    aux.push(msg)
    handleUpdate({ ...game, chat: aux })
  }

  const handleOut = () => {
    if (game?.players != null) {
      handleUpdate({ 
        ...game, 
        players: game.players.filter(({ user: { id } }) => id !== session.id)
      })
      router.push('/home')
    }
  }

  const handleStart = () => {
    if (game?.players != null) {
      handleUpdate({
        ...game,
        status: 'STARTED',
      })
    }
  }

  return {
    handleOut,
    handleStart,
    handleChat,
    handleUpdate,
    game
  }
}
