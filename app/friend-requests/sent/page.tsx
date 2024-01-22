'use client'
import PageWrapper from '@/app/components/PageWrapper'
import RightAnim from '@/app/components/RightAnim'
import { useDeleteFriendship } from '@/app/hooks/useDeleteFriendship'
import { useFriendsList } from '@/app/hooks/useFriendsList'
import { useSession } from '@/app/hooks/useSession'
import { XOctagon } from 'lucide-react'

export default function Sent() {
  const { sent } = useFriendsList()
  const [handleDeleteFriendship] = useDeleteFriendship()
  useSession()
  return (
    <PageWrapper>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h2>Friendship Requests Sent</h2>
        <div className="card flex flex-col items-center gap-2 w-[300px]">
          {sent.map((item, index) => (
            <RightAnim
              className="border border-black p-2 flex justify-between w-[200px]"
              key={item.whosFollowedBy.id}
              delay={0.5 + index / 2}
            >
              {item.whosFollowedBy.username}
              <XOctagon
                onClick={async () => {
                  await handleDeleteFriendship(item.id)
                }}
                className="cursor-pointer"
              />
            </RightAnim>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
