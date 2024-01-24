'use client'
import RightAnim from '@/app/components/RightAnim'
import { useGame } from '@/app/utils/hooks/useGame'
interface ContentInterface {
  id: string
}

export default function Content({ id }: ContentInterface) {
  const [game] = useGame()

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2>Lobby {id}</h2>
      <div className="mt-4">
        {game?.players.map((player, index) => (
          <RightAnim className="" key={player.user.id}>
            {player.user.username}{' '}
            {index + 1 === game.players.length ? '' : ','}
          </RightAnim>
        ))}
      </div>
    </div>
  )
}
