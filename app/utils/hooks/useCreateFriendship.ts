import { useMutation } from '@apollo/client'
import { CREATE_FRIENDSHIP } from '../graphql/mutations/UserMutations'
import { useSession } from './useSession'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../redux/store'
import { setLoading } from '../redux/features/laodingSlice'

export function useCreateFriendship() {
  const { id } = useSession()
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
    location.reload()
    dispatch(setLoading({ open: false }))
  }
  return [handle]
}
