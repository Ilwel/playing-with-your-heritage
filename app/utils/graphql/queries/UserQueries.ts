import { gql } from '@apollo/client'

const LIST_USERS = gql`
  query Users($where: UserWhereInput, $take: Int) {
    users(where: $where, take: $take) {
      id
      username
    }
  }
`

const MY_FIRENDS = gql`
  query MyFriends($where: FriendshipWhereInput) {
    friendships(where: $where) {
      id
      whosFollowedBy {
        id
        username
      }
      whosFollowing {
        id
        username
      }
    }
  }
`
const QUERY_MY_FRIENDS = gql`
  query QueryFriendGames {
    queryFriendGames {
      id
      players {
        square
        playable
        money
        user {
          username
          id
        }
      }
      status
    }
  }
`

const GET_GAME = gql`
  query GetGame($getGameId: String!) {
    getGame(id: $getGameId) {
      id
      status
      players {
        money
        playable
        square
        user {
          username
          id
        }
      }
    }
  }
`

export { LIST_USERS, MY_FIRENDS, QUERY_MY_FRIENDS, GET_GAME }
