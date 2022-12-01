import { ReactElement, ReactNode } from 'react'

type ExternalLinkProps = Readonly<{
  href: string,
  title: string,
  children: ReactNode
}>

export default function ExternalLink({ children, href, title }: ExternalLinkProps): ReactElement {
  return (
    <a
      href={href}
      rel="external noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </a>
  )
}
