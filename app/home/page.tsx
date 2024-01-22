import { type Metadata } from 'next'
import Content from './components/Content'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return <Content />
}
