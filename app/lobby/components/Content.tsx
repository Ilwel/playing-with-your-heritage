'use client'
import Button from '@/app/components/Button'
import DownAnim from '@/app/components/DownAnim'
import RightAnim from '@/app/components/RightAnim'
import { useGame } from '@/app/utils/hooks/useGame'
import { XOctagon } from 'lucide-react'

interface ContentInterface {
  id: string
}

const playerColors = [
  'bg-red-400',
  'bg-pink-400',
  'bg-green-400',
  'bg-slate-400',
]

export default function Content({ id }: ContentInterface) {
  const {
    handleOut,
    game: [game],
  } = useGame()

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Button
        className="w-52 flex justify-between absolute top-4 right-4"
        onClick={handleOut}
      >
        Out Lobby
        <XOctagon />
      </Button>
      <h2>Lobby {id}</h2>
      <div className="mt-4 flex gap-10">
        {game?.players.map((player, index) => (
          <DownAnim
            className="h-56 flex flex-col gap-1"
            key={player.user.id}
            delay={0.5 + index}
          >
            <div className={`w-52 h-52 ${playerColors[index]} `}></div>
            <RightAnim
              delay={1 + index}
              className={`${playerColors[index]} p-2 text-white flex justify-center`}
            >
              {player.user.username}
            </RightAnim>
          </DownAnim>
        ))}
      </div>
    </div>
  )
}
