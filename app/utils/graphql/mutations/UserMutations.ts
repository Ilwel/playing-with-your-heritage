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

export { SIGN_UP, SIGN_IN, CREATE_FRIENDSHIP, DELETE_FRIENDSHIP }
