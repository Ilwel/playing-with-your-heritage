import { useFriendsList } from '@/app/hooks/useFriendsList'
import { motion } from 'framer-motion'

export default function MyFriends() {
  const { friendships } = useFriendsList()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h1>Friends</h1>
      <div className="flex flex-col gap-2 mt-4">
        {friendships.map((item) => (
          <div className="border border-black p-2" key={item.whosFollowedBy.id}>
            {item.whosFollowedBy.username}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
