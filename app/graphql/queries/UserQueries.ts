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

export { LIST_USERS, MY_FIRENDS }
