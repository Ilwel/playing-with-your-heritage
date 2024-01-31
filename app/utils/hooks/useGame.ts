/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useMutation, useSubscription } from '@apollo/client'
import { useEffect} from 'react'
import { useSession } from './useSession'
import { CHANGE_GAME_STATE } from '../graphql/mutations/UserMutations'
import { useRouter } from 'next/navigation'
import { CONNECT_ON_GAME } from '../graphql/subscriptions/GameSubscriptions'
import { type AppDispatch, useAppSelector } from '../redux/store'
import { useDispatch } from 'react-redux'
import { type GameState, setGame } from '../redux/features/gameSlice'


type HandleOut = () => void

export function useGame(): {
  handleOut: HandleOut
  game: GameState
} {
  const { id: userId , token } = useSession()
  const game = useAppSelector((state) => state.gameReducer.value)
  const dispatch = useDispatch<AppDispatch>()
  const [changeGameState] = useMutation(CHANGE_GAME_STATE)
  const {
    data: attGame,
    loading,
    error,
  } = useSubscription(CONNECT_ON_GAME, {
    variables: {
      connectOnGameId: game?.id,
    },
  })
  const router = useRouter()

  useEffect(() => {
    const stringGame = localStorage.getItem('game')
    if (stringGame != null) {
      const parseGame = JSON.parse(stringGame) as GameState
      // eslint-disable-next-line @typescript-eslint/naming-convention
      parseGame.players = parseGame.players.map(({__typename, ...rest}) => ({...rest, user: {id: rest.user.id, username: rest.user.username}}))
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const {__typename, ...game} = parseGame


      dispatch(setGame(game)) 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (attGame) {
      const {__typename, ...game} = attGame.connectOnGame as GameState
      // eslint-disable-next-line @typescript-eslint/naming-convention
      game.players = game.players.map(({__typename, ...rest}) => ({...rest, user: {id: rest.user.id, username: rest.user.username}}))

      dispatch(setGame(game))
      localStorage.setItem('game', JSON.stringify(game))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attGame, loading, error])

  useEffect(() => {
    
    void (async () => {
      await changeGameState({
        variables: {
          game: {
            id: game.id,
            status: game.status,
            players: game.players,
            turnPlayer: game.turnPlayer,
          },
        },
        context: {
          headers: {
            authorization: token,
          },
        },
      })
    })()
    
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.turnPlayer])

  const handleOut = () => {
    if (game?.players != null) {
      void (async () => {
        const filtered = game.players.filter((player) => player.user.id !== userId)
        await changeGameState({
          variables: {
            game : {
              ...game,
              players: filtered,
            },
          },
          context: {
            headers: {
              authorization: token,
            },
          },
        })
      })()
    }
    router.push('/home')
  }

  return {
    handleOut,
    game,
  }
}
