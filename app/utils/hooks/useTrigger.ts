import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export function useTrigger(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTrigger(false)
    }, 100)
  }, [trigger])

  return [trigger, setTrigger]
}
