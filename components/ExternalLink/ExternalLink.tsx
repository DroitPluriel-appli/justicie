import { ReactElement } from 'react'

export default function ExternalLink({ children, href, title }): ReactElement {
  return (
    <>
          <a
            href={href}
            rel="external noopener noreferrer"
            target="_blank"
            title={title}
          >
            {children}
          </a>
    </>
  )
}
