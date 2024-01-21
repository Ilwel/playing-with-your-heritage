import DownAnim from '@/app/components/DownAnim'
import RightAnim from '@/app/components/RightAnim'
import { useFriendsList } from '@/app/hooks/useFriendsList'
import { XOctagon } from 'lucide-react'

export default function MyFriends() {
  const { friendships } = useFriendsList()

  return (
    <DownAnim>
      <h1>Friends</h1>
      <div className="flex flex-col gap-2 mt-4">
        {friendships.map((item, index) => (
          <RightAnim
            className="flex justify-between w-52 border border-black p-2"
            key={item.whosFollowedBy.id}
            delay={0.5 + index / 2}
          >
            {item.whosFollowedBy.username}
            <XOctagon className="cursor-pointer" />
          </RightAnim>
        ))}
      </div>
    </DownAnim>
  )
}
