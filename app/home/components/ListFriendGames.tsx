import RightAnim from '@/app/components/RightAnim'
import { type GameInterface } from '@/app/utils/hooks/useGame'
import { Gamepad } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ListFriendGamesInterface {
  games: GameInterface[]
}

export default function ListFriendGames({ games }: ListFriendGamesInterface) {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/lobby/${id}`)
  }

  return (
    <div className="mt-4 w-52">
      {games?.map((game) => (
        <RightAnim
          className="button w-52 flex justify-between cursor-pointer"
          key={game.id}
          onClick={() => {
            handleClick(game.id)
          }}
        >
          {game.players[0].user.username}
          <Gamepad />
        </RightAnim>
      ))}
    </div>
  )
}
