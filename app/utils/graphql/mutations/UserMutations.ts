import { gql } from '@apollo/client'

const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      id
      username
      createdAt
    }
  }
`

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`

const CREATE_FRIENDSHIP = gql`
  mutation CreateOneFriendship($data: FriendshipCreateInput!) {
    createOneFriendship(data: $data) {
      id
    }
  }
`

const DELETE_FRIENDSHIP = gql`
  mutation DeleteOneFriendship($where: FriendshipWhereUniqueInput!) {
    deleteOneFriendship(where: $where) {
      id
    }
  }
`

const CREATE_MY_GAME = gql`
  mutation CreateMyGame {
    createMyGame {
      id
      status
      turnPlayer
      chat {
        createdAt
        msg
        username
      }
      players {
        money
        playable
        square
        role
        user {
          username
          id
        }
      }
    }
  }
`

const CHANGE_GAME_STATE = gql`
  mutation ChangeGameState($game: GameInput!) {
    changeGameState(game: $game)
  }
`

const REGISTER_ON_GAME = gql`
  mutation RegisterOnGame($registerOnGameId: String!) {
    registerOnGame(id: $registerOnGameId) {
      id
      status
      turnPlayer
      chat {
        createdAt
        msg
        username
      }
      players {
        money
        playable
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

export {
  SIGN_UP,
  SIGN_IN,
  CREATE_FRIENDSHIP,
  DELETE_FRIENDSHIP,
  CREATE_MY_GAME,
  CHANGE_GAME_STATE,
  REGISTER_ON_GAME,
}
