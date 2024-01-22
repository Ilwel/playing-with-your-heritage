'use client'
import Input from '@/app/components/Input'
import { useCreateFriendship } from '@/app/utils/hooks/useCreateFriendship'
import { useFriendsList } from '@/app/utils/hooks/useFriendsList'
import { useSession } from '@/app/utils/hooks/useSession'
import { useUsersList } from '@/app/utils/hooks/useUsersList'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

export default function SearchFriends() {
  const { username } = useSession()
  const [search, setSearch] = useState<string | null>(null)
  const { following } = useFriendsList()
  const [usersList] = useUsersList(search)
  const [handleCreateFriendship] = useCreateFriendship()

  return (
    <>
      <div className="flex flex-col items-end gap-2 h-[220px]">
        <Input
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setSearch(e.target.value)
            } else {
              setSearch(null)
            }
          }}
          className="w-96"
          label="Request A Friendship From An User"
        />
        {usersList?.users
          .filter((item) => item.username !== username)
          .filter((item) => {
            return (
              following
                .map((item) => item.whosFollowedBy.id)
                .find((id) => id === item.id) == null
            )
          })
          .map((item) => (
            <div
              className="border border-black p-2 flex gap-2 justify-between w-full"
              key={item.id}
            >
              {item.username}
              <PlusCircle
                onClick={async () => {
                  await handleCreateFriendship(item.id)
                }}
                className="cursor-pointer"
              />
            </div>
          ))}
      </div>
    </>
  )
}
