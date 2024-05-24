'use client'

import { captureException } from '@sentry/nextjs'
import { ReactElement, useEffect } from 'react'

type ErrorProps = Readonly<{
  error: Error
}>

export default function GlobalError({ error }: ErrorProps): ReactElement {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html lang="fr">
      <body>
        <h1>
          {'Something went wrong!'}
        </h1>
      </body>
    </html>
  )
}
