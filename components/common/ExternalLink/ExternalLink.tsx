import { ReactElement, ReactNode } from 'react'

import { useDependencies } from '../../../configuration/useDependencies'


type ExternalLinkProps = Readonly<{
  children: ReactNode
  className?: string
  href: string
  title: string
}>

export default function ExternalLink({ children, className = '', href, title }: ExternalLinkProps): ReactElement {
  const { wording } = useDependencies()

  return (
    <a
      className={className}
      href={href}
      rel="external noopener noreferrer"
      target="_blank"
      title={title + wording.NOUVELLE_FENETRE}
    >
      {children}
    </a>
  )
}
