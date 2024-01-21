'use client'
import { useSession } from '@/app/hooks/useSession'

export default function Sent() {
  useSession()
  return <div>Sent</div>
}
