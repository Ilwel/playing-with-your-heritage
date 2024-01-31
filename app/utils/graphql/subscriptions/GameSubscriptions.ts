import { gql } from '@apollo/client'

const GET_FRIEND_GAMES = gql`
  subscription Subscription {
    getFriendsGames {
      id
      status
      players {
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
      turnPlayer
      players {
        playable
        money
        square
        user {
          id
          username
        }
      }
      status
    }
  }
`

export { CONNECT_ON_GAME, GET_FRIEND_GAMES }
