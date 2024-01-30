'use client'
import Button from '@/app/components/Button'
import {
  ArrowDownSquare,
  ArrowUpSquare,
  SquareUserIcon,
  XOctagon,
} from 'lucide-react'
import SearchFriends from './SearchFriends'
import { useRouter } from 'next/navigation'
import { useSession } from '@/app/utils/hooks/useSession'
import MainMenu from './MainMenu'
import FriendBoards from './FriendBoards'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '@/app/utils/redux/store'
import { resetAuth } from '@/app/utils/redux/features/authSlice'

export default function Content() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  useSession()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    dispatch(resetAuth())
    router.push('/')
  }

  return (
    <div className="flex flex-col h-full w-full items-start justify-start p-10">
      <header className="flex items-start justify-center w-full gap-2">
        <SearchFriends />
        <Button
          href="/friend-requests/sent"
          delay={0.6}
          className="mt-4 flex justify-between gap-4"
        >
          Requests Sent
          <ArrowUpSquare />
        </Button>
        <Button
          href="/friend-requests/received"
          delay={0.8}
          className="mt-4 flex justify-between gap-4"
        >
          Requests Received
          <ArrowDownSquare />
        </Button>
        <Button
          href="/friends"
          delay={1}
          className="mt-4 flex justify-between gap-4"
        >
          My Friends
          <SquareUserIcon />
        </Button>
        <Button
          onClick={handleSignOut}
          className="mt-4 flex justify-between gap-4"
          delay={1.2}
        >
          Sign Out
          <XOctagon />
        </Button>
      </header>
      <main className="flex items-start justify-center w-full h-full gap-10">
        <div className="flex items-start justify-start h-full">
          <MainMenu />
        </div>
        <div>
          <FriendBoards />
        </div>
      </main>
    </div>
  )
}
