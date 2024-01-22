import { gql } from '@apollo/client'

const CONNECT_ON_GAME = gql`
  subscription ConnectOnGame($connectOnGameId: String!) {
    connectOnGame(id: $connectOnGameId) {
      id
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

export { CONNECT_ON_GAME }
