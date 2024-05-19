import { PropsWithChildren, ReactElement } from 'react'

export default function Preformate({ children }: PropsWithChildren): ReactElement | null {
  if (children === '') return null

  return (
    <pre>
      {children}
    </pre>
  )
}
