import PageWrapper from '../../components/PageWrapper'
import Content from '../components/Content'

interface LobbyInterface {
  params: {
    id: string
  }
}

export default function Lobby({ params: { id } }: LobbyInterface) {
  return (
    <PageWrapper>
      <Content id={id} />
    </PageWrapper>
  )
}
