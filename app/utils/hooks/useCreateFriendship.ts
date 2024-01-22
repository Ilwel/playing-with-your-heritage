import { useMutation } from '@apollo/client'
import { CREATE_FRIENDSHIP } from '../graphql/mutations/UserMutations'
import { useRouter } from 'next/navigation'
import { useSession } from './useSession'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../redux/store'
import { setLoading } from '../redux/features/laodingSlice'

export function useCreateFriendship() {
  const { id } = useSession()
  const router = useRouter()
  const [createFriendship] = useMutation(CREATE_FRIENDSHIP)
  const dispatch = useDispatch<AppDispatch>()
  const handle = async (friendId: string) => {
    dispatch(setLoading({ open: true }))
    await createFriendship({
      variables: {
        data: {
          whosFollowedBy: {
            connect: {
              id: friendId,
            },
          },
          whosFollowing: {
            connect: {
              id,
            },
          },
        },
      },
    })
    dispatch(setLoading({ open: false }))
    router.refresh()
  }
  return [handle]
}
