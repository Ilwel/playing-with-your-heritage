/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { useMutation } from '@apollo/client'
import { type SetStateAction, useEffect, useState, type Dispatch } from 'react'
import { useSession } from './useSession'
import { CHANGE_GAME_STATE } from '../graphql/mutations/UserMutations'

interface UserInterface {
  id: string
  username: string
}

interface PlayerInterface {
  money: string
  playable: boolean
  square: string
  user: UserInterface
  __typename?: string
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

  useEffect(() => {
    const stringGame = localStorage.getItem('game')
    if (stringGame != null) {
      const parseGame = JSON.parse(stringGame)
      setGame(parseGame as GameInterface)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      console.log('merda ao entrar')
      if (game?.players != null) {
        const players = game?.players
        const mapPlayers = players
          ?.filter((item) => item.user.id !== userId)
          // eslint-disable-next-line @typescript-eslint/naming-convention
          .map(({ user, __typename, ...rest }) => rest)
        void (async () => {
          await changeGameState({
            variables: {
              game: {
                id: game.id,
                status: game.status,
                players: mapPlayers,
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
