import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useSession() {
  const [token, setToken] = useState<string | null>('')
  const [id, setId] = useState<string | null>('')
  const [username, setUsername] = useState<string | null>('')
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageId = localStorage.getItem('userId')
    const storageUsername = localStorage.getItem('username')

    setToken(storageToken)
    setId(storageId)
    setUsername(storageUsername)

    const authPaths = [
      '/home',
      '/friend-requests/sent',
      '/friend-requests/received',
    ]

    const signPaths = ['/sign-in', '/sign-up']
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (signPaths.includes(pathname) && storageId) {
      router.push('/home')
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    } else if (authPaths.includes(pathname) && !storageId) {
      router.push('/')
    }
  }, [pathname, router])

  return { token, id, username }
}
