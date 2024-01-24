'use client'
import { GET_FRIEND_GAMES } from '@/app/utils/graphql/subscriptions/GameSubscriptions'
import { useQuery, useSubscription } from '@apollo/client'
import ListFriendGames from './ListFriendGames'
import { QUERY_MY_FRIENDS } from '@/app/utils/graphql/queries/UserQueries'
import { useSession } from '@/app/utils/hooks/useSession'
import MiniLoading from '@/app/components/MiniLoading'

export default function FriendBoards() {
  const { token } = useSession()
  const { data, loading } = useSubscription(GET_FRIEND_GAMES, {
    fetchPolicy: 'no-cache',
  })

  const { data: firstData, loading: firstLoading } = useQuery(
    QUERY_MY_FRIENDS,
    {
      context: {
        headers: {
          authorization: token,
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  return (
    <div className="flex flex-col items-center">
      <h1>Friend Boards</h1>
      {!loading ? (
        <ListFriendGames games={data.getFriendsGames} />
      ) : firstLoading ? (
        <MiniLoading />
      ) : (
        <ListFriendGames games={firstData?.queryFriendGames} />
      )}
    </div>
  )
}
