/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useMutation, useSubscription } from '@apollo/client'
import { type SetStateAction, useEffect, useState, type Dispatch } from 'react'
import { useSession } from './useSession'
import { CHANGE_GAME_STATE } from '../graphql/mutations/UserMutations'
import { CONNECT_ON_GAME } from '../graphql/subscriptions/GameSubscriptions'

interface UserInterface {
  id: string
  username: string
}

interface PlayerInterface {
  money: string
  playable: boolean
  square: string
  user: UserInterface
}

export interface GameInterface {
  id: string
  players: PlayerInterface[]
  status: string
}

export function useGame(): [
  GameInterface,
  Dispatch<SetStateAction<GameInterface>>,
] {
  const { id: userId, token } = useSession()
  const [game, setGame] = useState<GameInterface>()
  const [changeGameState] = useMutation(CHANGE_GAME_STATE)
  const { data } = useSubscription(CONNECT_ON_GAME, {
    variables: {
      connectOnGameId: game?.id,
    },
  })

  useEffect(() => {
    const stringGame = localStorage.getItem('game')
    if (stringGame != null) {
      const parseGame = JSON.parse(stringGame)
      setGame(parseGame as GameInterface)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    return () => {
      if (game?.players != null) {
        let players = game?.players
        players = players?.filter((item) => item.user.id !== userId)
        void (async () => {
          await changeGameState({
            variables: {
              game: {
                id: game.id,
                status: game.status,
                players,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  return [
    game as GameInterface,
    setGame as Dispatch<SetStateAction<GameInterface>>,
  ]
}
