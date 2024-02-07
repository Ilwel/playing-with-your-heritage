'use client'
import { Bike } from '@/app/components/3d/Bike.jsx'
import Expositor from '@/app/components/3d/Expositor'
import Button from '@/app/components/Button'
import DownAnim from '@/app/components/DownAnim'
import RightAnim from '@/app/components/RightAnim'
import { useGame } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import { XOctagon } from 'lucide-react'

interface ContentInterface {
  id: string
}

const playerColors = [
  'border border-red-400 text-red-400',
  'border border-indigo-400 text-indigo-400',
  'border border-teal-400 text-teal-400',
  'border border-orange-400 text-orange-400',
]

const pieceColors = ['#fb7185', '#818cf8', '#2dd4bf', '#fb923c']

export default function Content({ id }: ContentInterface) {
  const { handleOut, handleStart, game } = useGame()
  const { username } = useSession()
  const admin = game?.players?.find((player) => player.role === 'ADMIN')
  const isUserAdmin = admin?.user.username === username

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div>gameStatus::{game?.status}</div>
      <Button
        className="w-52 flex justify-between absolute top-4 right-4"
        onClick={handleOut}
      >
        Out Lobby
        <XOctagon />
      </Button>
      <h2>Lobby {id}</h2>
      <div className="mt-4 flex gap-10">
        {game?.players?.map((player, index) => (
          <DownAnim
            className="h-56 flex flex-col gap-1"
            key={player.user.id}
            delay={0.5}
          >
            <div className={`w-52 h-52 ${playerColors[index]} `}>
              <Expositor>
                <Bike color={pieceColors[index]} />
              </Expositor>
            </div>
            <RightAnim
              delay={1 + index}
              className={`${playerColors[index]} p-2 flex justify-center font-bold`}
            >
              {player.user.username}
              ::
              {player.role}
            </RightAnim>
          </DownAnim>
        ))}
      </div>

      {isUserAdmin && (
        <Button
          className="w-52 flex justify-between absolute bottom-4 right-4"
          onClick={handleStart}
        >
          Start Game
        </Button>
      )}
    </div>
  )
}
