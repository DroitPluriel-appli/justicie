import { ReactElement, ReactNode } from 'react'

type PreformateProps = Readonly<{
  children: ReactNode
}>

export default function Preformate({ children }: PreformateProps): ReactElement {
  return (
    <pre>
      {children}
    </pre>
  )
}
