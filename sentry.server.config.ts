import * as Sentry from '@sentry/nextjs'

Sentry.init({
  debug: false,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  tracesSampleRate: 1,
})
