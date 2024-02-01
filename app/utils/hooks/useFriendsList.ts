import { useQuery } from '@apollo/client'
import { MY_FIRENDS } from '../graphql/queries/UserQueries'
import { useSession } from './useSession'

export interface UsersFecth {
  id: string
  username: string
}

interface FriendshipFetch {
  id: string
  whosFollowedBy: UsersFecth
  whosFollowing: UsersFecth
}

export function useFriendsList() {
  const { id } = useSession()
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



  const following = data?.friendships.filter(item => item.whosFollowing.id === id) ?? []
  const followedBy = data?.friendships.filter(item => item.whosFollowedBy.id === id) ?? []

  const followedByIds = new Set(followedBy.map(item => item.whosFollowing.id))
  const followingByIds = new Set(following.map(item => item.whosFollowedBy.id))

  const friendships = following.filter(item => followedByIds.has(item.whosFollowedBy.id))
  const sent = following.filter(item => !followedByIds.has(item.whosFollowedBy.id))
  const received = followedBy.filter(item => !followingByIds.has(item.whosFollowing.id))

  return { friendships, following, followedBy, sent, received }
}
