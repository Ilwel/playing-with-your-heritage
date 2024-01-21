import { useEffect, useState } from 'react'

export function useSession() {
  const [token, setToken] = useState<string | null>('')
  const [id, setId] = useState<string | null>('')
  const [username, setUsername] = useState<string | null>('')
  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageId = localStorage.getItem('userId')
    const storageUsername = localStorage.getItem('username')

    setToken(storageToken)
    setId(storageId)
    setUsername(storageUsername)
  }, [])

  return { token, id, username }
}
