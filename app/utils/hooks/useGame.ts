/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
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

	const session = useSession()
	const router = useRouter()
	const game = useAppSelector((state) => state.gameReducer.value)
	const dispatch = useDispatch<AppDispatch>()
	const [changeGameState] = useMutation(CHANGE_GAME_STATE)
	const {
	data: { connectOnGame: attGame },
		loading,
		error,
	} = useSubscription(CONNECT_ON_GAME, {
		variables: {
			connectOnGameId: game?.id,
		},
	})

	const cleanGame = ({ __typename: _, players, ...game } : GameState) => ({
		players: (
			players.map(({ __typename: _, user: { __typename: __, ...user }, ...player }) => ({
				user,
				...player
			}))
		),
		...game
	})

	useEffect(() => {
		const stringGame = localStorage.getItem('game')
		if (stringGame != null) {
			const parseGame = JSON.parse(stringGame) as GameState
			const game = cleanGame(parseGame)
			dispatch(setGame(game)) 
		}
	}, [])

	useEffect(() => {
		if (attGame != null) {
			const game = cleanGame(attGame as GameState)
			dispatch(setGame(game))
			localStorage.setItem('game', JSON.stringify(game))
		}
	}, [attGame, loading, error])

	useEffect(() => {
    if(game?.players != null ){
      void (async () => {
        await changeGameState({
          variables: {
            game,
          },
          context: {
            headers: {
              authorization: session.token,
            },
          },
          })
      })()
    }
	}, [game.turnPlayer])

	const handleOut = () => {
    if (game?.players != null) {
      void (async () => {
        await changeGameState({
          variables: {
            game : {
              ...game,
              players: game.players.filter(({user: {id}}) => id !== session.id),
            },
          },
            context: {
              headers: {
                authorization: session.token,
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
