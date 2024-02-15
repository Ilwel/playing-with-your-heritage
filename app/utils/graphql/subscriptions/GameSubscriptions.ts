import { gql } from '@apollo/client'

const GET_FRIEND_GAMES = gql`
  subscription Subscription {
    getFriendsGames {
      id
      status
      players {
        role
        user {
          username
          id
        }
      }
    }
  }
`

const CONNECT_ON_GAME = gql`
  subscription ConnectOnGame($connectOnGameId: String!) {
    connectOnGame(id: $connectOnGameId) {
      id
      status
      turnPlayer
      chat {
        createdAt
        msg
        username
      }
      players {
        playable
        money
        square
        role
        user {
          id
          username
        }
      }
    }
  }
`

export { CONNECT_ON_GAME, GET_FRIEND_GAMES }
