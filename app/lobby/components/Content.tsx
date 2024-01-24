'use client'
import Button from '@/app/components/Button'
// TODO: FIX THIS SHIT
import RightAnim from '@/app/components/RightAnim'
import { useGame } from '@/app/utils/hooks/useGame'

interface ContentInterface {
  id: string
}

export default function Content({ id }: ContentInterface) {
  const {
    handleOut,
    game: [game],
  } = useGame()

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Button onClick={handleOut}>Out Lobby</Button>
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
