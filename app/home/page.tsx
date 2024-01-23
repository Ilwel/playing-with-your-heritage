import { type Metadata } from 'next'
import Content from './components/Content'
import PageWrapper from '../components/PageWrapper'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <PageWrapper>
      <Content />
    </PageWrapper>
  )
}
