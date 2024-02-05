import RightAnim from '@/app/components/RightAnim'
import { CREATE_MY_GAME } from '@/app/utils/graphql/mutations/UserMutations'
import { cleanGame } from '@/app/utils/hooks/useGame'
import { useSession } from '@/app/utils/hooks/useSession'
import {
  setGame,
  type GameState
} from '@/app/utils/redux/features/gameSlice'
import { setLoading } from '@/app/utils/redux/features/laodingSlice'
import { type AppDispatch } from '@/app/utils/redux/store'
import { useMutation } from '@apollo/client'
import { PlusSquare, Settings, SquareUserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

export default function MainMenu() {
  const { token, username } = useSession()
  const [createMyGame] = useMutation(CREATE_MY_GAME)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleStartBoard = async () => {
    dispatch(setLoading({ open: true }))
    await createMyGame({
      context: {
        headers: {
          authorization: token,
        },
      },
    }).then(({data}) => {

      const newGame = cleanGame(data.createMyGame as GameState)
      dispatch(setGame(newGame))
      router.push(`/lobby/${newGame.id}`)
    
    })
    dispatch(setLoading({ open: false }))
  }


  return (
    <div>
      <h1>Main Menu</h1>
      <div className="mt-4 flex flex-col gap-4">
        <RightAnim className="flex gap-2">
          <SquareUserIcon />
          <p className="font-bold">{username}</p>
        </RightAnim>
        <RightAnim
          delay={1}
          className="button w-52 flex justify-between cursor-pointer"
          onClick={handleStartBoard}
        >
          Start A Board
          <PlusSquare />
        </RightAnim>
        <RightAnim
          delay={1.5}
          className="button w-52 flex justify-between cursor-pointer"
        >
          Settings
          <Settings />
        </RightAnim>
      </div>
    </div>
  )
}
