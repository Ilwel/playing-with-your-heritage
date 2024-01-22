'use client'
import Button from './components/Button'
import H1Anim from './components/H1Anim'
import { useSession } from './utils/hooks/useSession'

export default function Home() {
  const { id } = useSession()
  return (
    <main className="home">
      <H1Anim texts={['Playing With Your Inheritance']} />
      <Button href={id != null ? '/home' : '/sign-in'} delay={2}>
        Start
      </Button>
    </main>
  )
}
