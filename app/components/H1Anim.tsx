import RedoAnimText from './RedoTextAnim'
import SimpleTextAnim from './SimpleTextAnim'

interface H1AnimInterface {
  texts: string[]
  redo?: boolean
}

export default function H1Anim({ texts, redo = false }: H1AnimInterface) {
  return redo ? (
    <h1>
      <RedoAnimText texts={texts} />
    </h1>
  ) : (
    <h1>
      <SimpleTextAnim text={texts[0]} />
    </h1>
  )
}
