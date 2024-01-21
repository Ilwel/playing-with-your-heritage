import { useMutation } from '@apollo/client'
import { CREATE_FRIENDSHIP } from '../graphql/mutations/UserMutations'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'

export function useCreateFriendship(
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  const id = localStorage.getItem('userId')
  const router = useRouter()
  const [createFriendship] = useMutation(CREATE_FRIENDSHIP)
  const handle = async (friendId: string) => {
    setLoading(true)
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
    setLoading(false)
    router.refresh()
  }
  return [handle]
}
