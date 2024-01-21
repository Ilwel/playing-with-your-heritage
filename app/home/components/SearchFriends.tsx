'use client'
import Input from '@/app/components/Input'
import Loading from '@/app/components/Loading'
import { useCreateFriendship } from '@/app/hooks/useCreateFriendship'
import { useFriendsList } from '@/app/hooks/useFriendsList'
import { useUsersList } from '@/app/hooks/useUsersList'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

export default function SearchFriends() {
  const username = localStorage.getItem('username')
  const [search, setSearch] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { friendships } = useFriendsList()
  const [usersList] = useUsersList(search)
  const [handleCreateFriendship] = useCreateFriendship(setLoading)

  return (
    <>
      <Loading open={loading} />
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
          label="Search For A User In The World"
        />
        {usersList?.users
          .filter((item) => item.username !== username)
          .filter((item) => {
            return (
              friendships
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
