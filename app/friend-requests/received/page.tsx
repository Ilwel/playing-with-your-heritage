'use client'
import PageWrapper from '@/app/components/PageWrapper'
import RightAnim from '@/app/components/RightAnim'
import { useCreateFriendship } from '@/app/utils/hooks/useCreateFriendship'
import { useDeleteFriendship } from '@/app/utils/hooks/useDeleteFriendship'
import { useFriendsList } from '@/app/utils/hooks/useFriendsList'
import { useSession } from '@/app/utils/hooks/useSession'
import { PlusSquare, XOctagon } from 'lucide-react'

export default function Received() {
  const { received } = useFriendsList()
  const [handleCreateFriendship] = useCreateFriendship()
  const [handleDeleteFriendship] = useDeleteFriendship()
  useSession()

  return (
    <PageWrapper>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-start p-10">
        <h2>Friendship Requests Received</h2>
        <div className="grid grid-cols-3 items-center gap-2">
          {received.map((item, index) => (
            <RightAnim
              className="border border-black p-2 flex justify-between w-[250px]"
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
