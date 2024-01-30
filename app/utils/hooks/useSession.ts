import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector, type AppDispatch } from '../redux/store'
import { setAuth } from '../redux/features/authSlice'

export function useSession() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const auth = useAppSelector((state) => state.authReducer.value)

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')

    dispatch(
      setAuth({
        id: id ?? '',
        username: username ?? '',
        token: token ?? '',
      })
    )

    const authPaths = [
      '/home',
      '/friend-requests/sent',
      '/friend-requests/received',
      '/friends',
    ]

    const signPaths = ['/sign-in', '/sign-up']
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (signPaths.includes(pathname) && token) {
      router.push('/home')
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    } else if (authPaths.includes(pathname) && !token) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router])

  return auth
}
