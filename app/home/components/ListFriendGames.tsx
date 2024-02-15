import RightAnim from '@/app/components/RightAnim'
import { REGISTER_ON_GAME } from '@/app/utils/graphql/mutations/UserMutations'
import { cleanGame } from '@/app/utils/hooks/useGame'
import { setGame, type GameState } from '@/app/utils/redux/features/gameSlice'
import { setLoading } from '@/app/utils/redux/features/laodingSlice'
import { type AppDispatch } from '@/app/utils/redux/store'
import { useMutation } from '@apollo/client'
import { Gamepad } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

interface ListFriendGamesInterface {
  games: GameState[]
}

export default function ListFriendGames({ games }: ListFriendGamesInterface) {
  const router = useRouter()

  const [registerOnGame] = useMutation(REGISTER_ON_GAME)
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = (id: string) => {
    dispatch(setLoading({ open: true }))
    void registerOnGame({
      variables: {
        registerOnGameId: id,
      },
      onCompleted: (data) => {
        const registeredGame = cleanGame(data.registerOnGame as GameState)
        dispatch(setGame(registeredGame))
        router.push(`/lobby/${registeredGame.id}`)
        dispatch(setLoading({ open: false }))
      },
    })
  }

  return (
    <div className="mt-4 w-52 flex flex-col gap-2">
      {games?.map((game) => (
        <RightAnim
          className="button w-52 flex justify-between cursor-pointer"
          key={game.id}
          onClick={() => {
            handleClick(game.id)
          }}
        >
          {
            game.players.find((player) => player.role === 'ADMIN')?.user
              .username
          }
          <Gamepad />
        </RightAnim>
      ))}
    </div>
  )
}
