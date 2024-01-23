interface ContentInterface {
  id: string
}

export default function Content({ id }: ContentInterface) {
  return (
    <div className="flex h-full items-center justify-center">Lobby {id}</div>
  )
}
