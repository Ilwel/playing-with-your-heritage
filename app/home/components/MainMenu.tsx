import RightAnim from '@/app/components/RightAnim'
import { CREATE_MY_GAME } from '@/app/utils/graphql/mutations/UserMutations'
import { useSession } from '@/app/utils/hooks/useSession'
import { useMutation } from '@apollo/client'
import { PlusSquare, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MainMenu() {
  const { token } = useSession()
  const [createMyGame, { data }] = useMutation(CREATE_MY_GAME)
  const router = useRouter()

  const handleStartBoard = async () => {
    await createMyGame({
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
      console.log(data)
      router.push(`/lobby/${data?.createMyGame.id}`)
    }
  }, [data, router])

  return (
    <div>
      <h1>Main Menu</h1>
      <div className="mt-4 flex flex-col gap-4">
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
