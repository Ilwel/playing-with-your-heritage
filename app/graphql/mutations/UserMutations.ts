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
      }
    }
  }
`

export { SIGN_UP, SIGN_IN }
