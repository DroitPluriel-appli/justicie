import { ReactElement } from 'react'

type ExternalLinkProps = Readonly<{
  href: string,
  title: string,
  children: ReactElement
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
