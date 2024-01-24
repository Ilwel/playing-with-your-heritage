'use client'
// TODO: FIX THIS SHIT
import RightAnim from '@/app/components/RightAnim'
import { CHANGE_GAME_STATE } from '@/app/utils/graphql/mutations/UserMutations'
import { CONNECT_ON_GAME } from '@/app/utils/graphql/subscriptions/GameSubscriptions'
import { type GameInterface } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import { useMutation, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
interface ContentInterface {
  id: string
}

export default function Content({ id }: ContentInterface) {
  const { id: userId, token } = useSession()
  const [game, setGame] = useState<GameInterface>()
  const {
    data: attGame,
    loading,
    error,
  } = useSubscription(CONNECT_ON_GAME, {
    variables: {
      connectOnGameId: game?.id,
    },
  })
  const [changeGameState] = useMutation(CHANGE_GAME_STATE)

  useEffect(() => {
    const stringGame = localStorage.getItem('game')
    if (stringGame != null) {
      setGame(JSON.parse(stringGame) as GameInterface)
    }
  }, [])

  useEffect(() => {
    window.onhashchange = () => {
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

  useEffect(() => {
    console.log(error)
    console.log(loading)
    console.log(attGame)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (attGame) {
      setGame(attGame.connectOnGame as GameInterface)
    }
  }, [attGame, loading, error])

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2>Lobby {id}</h2>
      <div className="mt-4 flex gap-1">
        {game?.players.map((player, index) => (
          <RightAnim className="" key={player.user.id}>
            {player.user.username}
            {index + 1 === game.players.length ? '' : ','}
          </RightAnim>
        ))}
      </div>
    </div>
  )
}
