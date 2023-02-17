import { ReactElement, ReactNode } from 'react'

type PreformateProps = Readonly<{
  children: ReactNode
}>

export default function Preformate({ children }: PreformateProps): ReactElement | null {
  if (children === '') return null

  return (
    <pre>
      {children}
    </pre>
  )
}
