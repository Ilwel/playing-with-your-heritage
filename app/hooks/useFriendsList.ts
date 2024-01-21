import { useQuery } from '@apollo/client'
import { MY_FIRENDS } from '../graphql/queries/UserQueries'

export interface UsersFecth {
  id: string
  username: string
}

interface FriendshipFetch {
  whosFollowedBy: UsersFecth
  whosFollowing: UsersFecth
}

export function useFriendsList() {
  const id = localStorage.getItem('userId')
  const { data } = useQuery<{ friendships: FriendshipFetch[] }>(MY_FIRENDS, {
    variables: {
      where: {
        OR: [
          {
            followingId: {
              equals: id,
            },
          },
          {
            followedById: {
              equals: id,
            },
          },
        ],
      },
    },
  })

  const following = data?.friendships.filter(
    (item) => item.whosFollowing.id === id
  )
  const followedBy = data?.friendships.filter(
    (item) => item.whosFollowedBy.id === id
  )
  const friendships =
    following?.filter((item) =>
      followedBy
        ?.map((item) => item.whosFollowing.id)
        .includes(item.whosFollowedBy.id)
    ) ?? []

  return { friendships, following, followedBy }
}
