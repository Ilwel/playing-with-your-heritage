'use client'
import { Box } from '@/app/components/3d/Box'
import Expositor from '@/app/components/3d/Expositor'
import Button from '@/app/components/Button'
import DownAnim from '@/app/components/DownAnim'
import RightAnim from '@/app/components/RightAnim'
import { useGame } from '@/app/utils/hooks/useGame'
import { XOctagon } from 'lucide-react'

interface ContentInterface {
  id: string
}

const playerColors = [
  'border border-red-400 text-red-400',
  'border border-indigo-400 text-indigo-400',
  'border border-teal-400 text-teal-400',
  'border border-slate-400 text-slate-400',
]

const pieceColors = ['#fb7185', '#818cf8', '#2dd4bf', '#94a3b8']

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
            <div className={`w-52 h-52 ${playerColors[index]} `}>
              <Expositor>
                <Box color={pieceColors[index]} />
              </Expositor>
            </div>
            <RightAnim
              delay={1 + index}
              className={`${playerColors[index]} p-2 flex justify-center`}
            >
              {player.user.username}
            </RightAnim>
          </DownAnim>
        ))}
      </div>

      <Button
        className="w-52 flex justify-between absolute bottom-4 right-4"
        href={`/game/${id}`}
      >
        Start Game
      </Button>
    </div>
  )
}
