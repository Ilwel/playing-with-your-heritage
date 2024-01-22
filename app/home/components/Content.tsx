'use client'
import Button from '@/app/components/Button'
import PageWrapper from '@/app/components/PageWrapper'
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

export default function Content() {
  const router = useRouter()
  useSession()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    router.push('/')
  }

  return (
    <PageWrapper>
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
    </PageWrapper>
  )
}