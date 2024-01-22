'use client'
import Button from '@/app/components/Button'
import PageWrapper from '@/app/components/PageWrapper'
import { XOctagon } from 'lucide-react'
import SearchFriends from './SearchFriends'
import MyFriends from './MyFriends'
import { useSession } from '@/app/hooks/useSession'
import { useRouter } from 'next/navigation'

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
        <Button
          onClick={handleSignOut}
          className="absolute top-10 right-10 flex gap-2"
        >
          <XOctagon />
          Sign Out
        </Button>
        <header className="flex items-start justify-start w-full gap-2">
          <SearchFriends />
          <Button href="/friend-requests/sent" delay={0.7} className="mt-4">
            Requests Sent
          </Button>
          <Button href="/friend-requests/received" delay={1} className="mt-4">
            Requests Received
          </Button>
        </header>
        <main className="flex items-start w-full">
          <aside>
            <MyFriends />
          </aside>
        </main>
      </div>
    </PageWrapper>
  )
}
