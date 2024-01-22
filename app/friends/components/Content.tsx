'use client'
import PageWrapper from '@/app/components/PageWrapper'
import RightAnim from '@/app/components/RightAnim'
import { useDeleteFriendship } from '@/app/utils/hooks/useDeleteFriendship'
import { useFriendsList } from '@/app/utils/hooks/useFriendsList'
import { XOctagon } from 'lucide-react'

export default function Content() {
  const { friendships } = useFriendsList()
  const [handleDeleteFriendship] = useDeleteFriendship()

  return (
    <PageWrapper>
      <div className="w-full h-full flex flex-col gap-5 items-center justify-start p-10">
        <h2>Friends</h2>
        <div className="grid grid-cols-3 items-center gap-2">
          {friendships.map((item, index) => (
            <RightAnim
              className="flex justify-between w-52 border border-black p-2"
              key={item.id}
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
