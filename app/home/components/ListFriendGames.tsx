import RightAnim from '@/app/components/RightAnim'
import { REGISTER_ON_GAME } from '@/app/utils/graphql/mutations/UserMutations'
import { type GameInterface } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import { useMutation } from '@apollo/client'
import { Gamepad } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ListFriendGamesInterface {
  games: GameInterface[]
}

export default function ListFriendGames({ games }: ListFriendGamesInterface) {
  const { token } = useSession()
  const router = useRouter()
  const [registerOnGame, { data }] = useMutation(REGISTER_ON_GAME)

  const handleClick = async (id: string) => {
    await registerOnGame({
      variables: {
        registerOnGameId: id,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
    })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data) {
      localStorage.setItem('game', JSON.stringify(data.registerOnGame))
      router.push(`/lobby/${data.registerOnGame.id}`)
    }
  }, [data])

  return (
    <div className="mt-4 w-52">
      {games?.map((game) => (
        <RightAnim
          className="button w-52 flex justify-between cursor-pointer"
          key={game.id}
          onClick={async () => {
            await handleClick(game.id)
          }}
        >
          {game.players[0].user.username}
          <Gamepad />
        </RightAnim>
      ))}
    </div>
  )
}
