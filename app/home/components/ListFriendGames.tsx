import RightAnim from '@/app/components/RightAnim'
import { REGISTER_ON_GAME } from '@/app/utils/graphql/mutations/UserMutations'
import { useSession } from '@/app/utils/hooks/useSession'
import { type GameState } from '@/app/utils/redux/features/gameSlice'
import { setLoading } from '@/app/utils/redux/features/laodingSlice'
import { type AppDispatch } from '@/app/utils/redux/store'
import { useMutation } from '@apollo/client'
import { Gamepad } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface ListFriendGamesInterface {
  games: GameState[]
}

export default function ListFriendGames({ games }: ListFriendGamesInterface) {
  const { token } = useSession()
  const router = useRouter()
  const [registerOnGame, { data }] = useMutation(REGISTER_ON_GAME)
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = async (id: string) => {
    dispatch(setLoading({ open: true }))
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
    dispatch(setLoading({ open: false }))
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data) {
      localStorage.setItem('game', JSON.stringify(data.registerOnGame))
      router.push(`/lobby/${data.registerOnGame.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="mt-4 w-52 flex flex-col gap-2">
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
