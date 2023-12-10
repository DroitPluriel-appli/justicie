'use client'

import * as Sentry from '@sentry/nextjs'
import { ReactElement, useEffect } from 'react'

type ErrorProps = Readonly<{
  error: Error & { digest?: string }
}>

export default function Error({ error }: ErrorProps): ReactElement {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h1>
        {'Something went wrong!'}
      </h1>
    </div>
  )
}
