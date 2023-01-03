import { ReactElement, ReactNode } from 'react'

import { useDependencies } from '../../configuration/useDependencies'

type ExternalLinkProps = Readonly<{
  href: string,
  title: string,
  children: ReactNode
  className?: string
}>

export default function ExternalLink({ children, href, title, className = '' }: ExternalLinkProps): ReactElement {
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
