import { useMutation } from '@apollo/client'
import { DELETE_FRIENDSHIP } from '../graphql/mutations/UserMutations'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../redux/store'
import { setLoading } from '../redux/features/laodingSlice'

export function useDeleteFriendship() {
  const router = useRouter()
  const [deleteFriendship] = useMutation(DELETE_FRIENDSHIP)
  const dispatch = useDispatch<AppDispatch>()
  const handle = async (friendshipId: string) => {
    dispatch(setLoading({ open: true }))
    await deleteFriendship({
      variables: {
        where: {
          id: friendshipId,
        },
      },
    })
    dispatch(setLoading({ open: false }))
    router.refresh()
  }
  return [handle]
}
