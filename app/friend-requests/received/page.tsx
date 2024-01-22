'use client'
import PageWrapper from '@/app/components/PageWrapper'
import RightAnim from '@/app/components/RightAnim'
import { useCreateFriendship } from '@/app/hooks/useCreateFriendship'
import { useDeleteFriendship } from '@/app/hooks/useDeleteFriendship'
import { useFriendsList } from '@/app/hooks/useFriendsList'
import { useSession } from '@/app/hooks/useSession'
import { PlusSquare, XOctagon } from 'lucide-react'

export default function Received() {
  const { received } = useFriendsList()
  const [handleCreateFriendship] = useCreateFriendship()
  const [handleDeleteFriendship] = useDeleteFriendship()

  useSession()
  return (
    <PageWrapper>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h2>Friendship Requests Received</h2>
        <div className="card flex items-center flex-col gap-2 w-[300px]">
          {received.map((item, index) => (
            <RightAnim
              className="border border-black p-2 flex justify-between w-[200px]"
              key={item.whosFollowing.id}
              delay={0.5 + index / 2}
            >
              {item.whosFollowing.username}
              <div className="flex gap-2">
                <PlusSquare
                  onClick={async () => {
                    await handleCreateFriendship(item.whosFollowing.id)
                  }}
                  className="cursor-pointer"
                />
                <XOctagon
                  onClick={async () => {
                    await handleDeleteFriendship(item.id)
                  }}
                  className="cursor-pointer"
                />
              </div>
            </RightAnim>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
