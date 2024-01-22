'use client'
import PageWrapper from '@/app/components/PageWrapper'
import { useFriendsList } from '@/app/hooks/useFriendsList'
import { useSession } from '@/app/hooks/useSession'
import { PlusSquare, XOctagon } from 'lucide-react'

export default function Received() {
  const { received } = useFriendsList()

  useSession()
  return (
    <PageWrapper>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h2>Friendship Requests Received</h2>
        <div className="card flex items-center flex-col gap-2 w-[300px]">
          {received.map((item) => (
            <div
              className="border border-black p-2 flex justify-between w-[200px]"
              key={item.whosFollowing.id}
            >
              {item.whosFollowing.username}
              <div className="flex gap-2">
                <PlusSquare className="cursor-pointer" />
                <XOctagon className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
