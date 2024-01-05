import { ReactElement, ReactNode } from 'react'

import { frontDependencies } from '../../../configuration/frontDependencies'

type ExternalLinkProps = Readonly<{
  children: ReactNode
  className?: string
  href: string
  title: string
}>

export default function ExternalLink({ children, className = '', href, title }: ExternalLinkProps): ReactElement {
  return (
    <a
      className={className}
      href={href}
      rel="external noopener noreferrer"
      target="_blank"
      title={title + frontDependencies.wording.NOUVELLE_FENETRE}
    >
      {children}
    </a>
  )
}
