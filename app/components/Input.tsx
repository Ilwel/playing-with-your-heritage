import { motion } from 'framer-motion'
import { type InputHTMLAttributes, useRef, useState } from 'react'
import { useOutside } from '../hooks/useOutside'

interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const varContainer = {
  init: { scale: 1 },
}

const varLabel = {
  init: { top: 10, left: 10, opacity: 0.5 },
  focus: { top: -25, left: 0, opacity: 1, fontSize: '13px' },
}

export default function Input(props: InputInterface) {
  const [onFocusTrigger, setOnFocusTrigger] = useState(false)
  const ref = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const verifyInput = () => {
    if (inputRef.current !== null && inputRef.current.value.length === 0) {
      setOnFocusTrigger(false)
    }
  }
  useOutside(ref, verifyInput)

  return (
    <motion.div
      ref={ref}
      variants={varContainer}
      initial="init"
      animate={onFocusTrigger ? 'focus' : 'init'}
      className="flex flex-col relative mt-4"
      onClick={() => {
        setOnFocusTrigger(true)
      }}
      onFocus={() => {
        setOnFocusTrigger(true)
      }}
      onBlur={verifyInput}
    >
      <motion.label
        className="absolute pointer-events-none"
        variants={varLabel}
        htmlFor={props.name}
      >
        {props.label}
      </motion.label>
      <input ref={inputRef} {...props} />
    </motion.div>
  )
}
