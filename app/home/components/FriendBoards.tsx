'use client'
import { GET_FRIEND_GAMES } from '@/app/utils/graphql/subscriptions/GameSubscriptions'
import { useQuery, useSubscription } from '@apollo/client'
import ListFriendGames from './ListFriendGames'
import { QUERY_MY_FRIENDS } from '@/app/utils/graphql/queries/UserQueries'
import { type GameState } from '@/app/utils/redux/features/gameSlice'
import { useState } from 'react'

export default function FriendBoards() {
  const [games, setGames] = useState<GameState[]>([])

  useSubscription(GET_FRIEND_GAMES, {
    fetchPolicy: 'no-cache',
    onData: ({ data: { data } }) => {setGames(data.getFriendsGames as GameState[])},
  })

  useQuery(
    QUERY_MY_FRIENDS,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {setGames(data.queryFriendGames as GameState[])}
    }
  )

  return (
    <div className="flex flex-col items-center">
      <h1>Friend Boards</h1>
      <ListFriendGames games={games}/>
    </div>
  )
}