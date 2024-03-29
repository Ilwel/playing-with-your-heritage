import { type Metadata } from 'next'
import './globals.css'
import RootLayoutContent from './components/RootLayoutContent'

export const metadata: Metadata = {
  title: {
    template: 'PWYI - %s',
    default: 'PWYI',
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
      <RootLayoutContent>{children}</RootLayoutContent>
    </html>
  )
}
