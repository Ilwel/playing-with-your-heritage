'use client'
import { GET_FRIEND_GAMES } from '@/app/utils/graphql/subscriptions/GameSubscriptions'
import { useSubscription } from '@apollo/client'

export default function FriendBoards() {
  const { data, loading } = useSubscription(GET_FRIEND_GAMES)

  return (
    <div>
      <h1>Friend Boards</h1>
      {!loading ? <pre>{JSON.stringify(data, null, 4)}</pre> : 'loading'}
    </div>
  )
}
