'use client'
import { useSession } from '@/app/hooks/useSession'

export default function Received() {
  useSession()
  return <div>Received</div>
}
