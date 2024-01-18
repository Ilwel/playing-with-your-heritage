import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google';
import './globals.css'

const jetBrains = JetBrains_Mono({weight: "400", subsets:["latin-ext"]})

export const metadata: Metadata = {
  title:{
    template: 'PWYI - %s',
    default: 'PWYI'
  },
  description: 'play with your inheritance together with your friends',
} 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetBrains.className + " h-svh"}>{children}</body>
    </html>
  )
}
