'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface PageWrapperInterface {
  children: React.ReactNode
  delay?: number
}

export default function PageWrapper({
  children,
  delay = 0.25,
}: PageWrapperInterface) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 140, height: '100svh', width: '100svw' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: 140, opacity: 0 }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
