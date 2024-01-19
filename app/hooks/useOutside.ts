import { type MutableRefObject, useEffect } from 'react'

type Callback = () => void

export function useOutside(
  ref: MutableRefObject<HTMLElement | null>,
  callback: Callback
) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (ref.current != null && !ref.current.contains(event.target)) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
