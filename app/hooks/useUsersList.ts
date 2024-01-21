import { useQuery } from '@apollo/client'
import { type UsersFecth } from './useFriendsList'
import { LIST_USERS } from '../graphql/queries/UserQueries'

export function useUsersList(search: string | null) {
  const { data } = useQuery<{ users: UsersFecth[] }>(LIST_USERS, {
    variables: {
      where: {
        username: {
          contains: search,
        },
      },
      take: 3,
    },
    fetchPolicy: 'no-cache',
  })
  return [data]
}
