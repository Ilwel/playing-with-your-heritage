'use client'
import { motion } from 'framer-motion'
import Button from './components/Button'
import H1Anim from './components/H1Anim'
import { useSession } from './utils/hooks/useSession'
import blocoNLogo from '@/public/bloco-n-logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { id } = useSession()
  return (
    <main className="home">
      <H1Anim texts={['Playing With Your Inheritance']} />
      <Button href={id !== '' ? '/home' : '/sign-in'} delay={2.5}>
        Start
      </Button>
      <motion.div
        className="flex flex-col items-center gap-2 absolute bottom-20"
        animate={{
          opacity: [0, 1],
          y: [10, 0],
        }}
        transition={{
          delay: 2,
        }}
      >
        <motion.div
          animate={{
            rotate: ['180deg', '0deg'],
          }}
          transition={{
            delay: 2.3,
          }}
        >
          <Image className="h-14 w-auto" src={blocoNLogo} alt="bloco n logo" />
        </motion.div>
        Developed by Bloco N
        <Link className="text-sm" href={'/about'}>
          About
        </Link>
      </motion.div>
    </main>
  )
}
