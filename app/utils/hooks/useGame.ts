import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
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
}

interface GameInterface {
  id: string
  players: PlayerInterface[]
  status: string
}

export function useGame() {
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

  return [game, setGame]
}
