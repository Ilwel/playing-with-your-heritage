'use client'
import { useGame } from '@/app/utils/hooks/useGame'
interface ContentInterface {
  id: string
}

export default function Content({ id }: ContentInterface) {
  const [game] = useGame()

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2>Lobby {id}</h2>
      <pre>{JSON.stringify(game, null, 4)}</pre>
    </div>
  )
}
