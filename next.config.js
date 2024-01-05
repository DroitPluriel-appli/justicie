const { withSentryConfig } = require('@sentry/nextjs')

const securityHeaders = [
  /**
   * Content-Security-Policy, see: https://scotthelme.co.uk/content-security-policy-an-introduction/
   * This header define approved sources for content on the site that the browser can load.
   **/
  {
    key: 'Content-Security-Policy',
    value: "default-src https: 'self'; script-src https: 'unsafe-eval' 'unsafe-inline'; style-src https: 'unsafe-inline';",
  },
  /**
   * Permissions-Policy, see: https://scotthelme.co.uk/goodbye-feature-policy-and-hello-permissions-policy/
   * This header provides a mechanism to allow or deny the use of browser features in its own frame, and in content
   * within any <iframe> elements in the document.
   *
   * CHOICE: disable all the features that we are not currently using.
   **/
  {
    key: 'Permissions-Policy',
    value: 'accelerometer=(), camera=(), microphone=(), document-domain=(), gyroscope=(), magnetometer=(), payment=(), usb=(), xr-spatial-tracking=()',
  },
  /**
   * Referrer-Policy, see: https://scotthelme.co.uk/a-new-security-header-referrer-policy/
   * This header lets know where the visitor of the site came from. This header allows to control or restrict the amount
   * of information sent to the destination site.
   *
   * CHOICE: the browser will send the full URL to HTTPS requests to the same origin, and will send origin URL when the HTTPS requests are cross-origin.
   **/
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  /**
   * X-Content-Type-Options, see: https://scotthelme.co.uk/hardening-your-http-response-headers/
   * This header prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set
   * There is only one value "nosniff"
   **/
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  /**
   * X-Frame-Options, see: https://scotthelme.co.uk/hardening-your-http-response-headers/
   * This header prevents against clickjacking attacks.
   *
   * CHOICE: The value "SAMEORIGIN" allows you to frame your own site
   **/
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

/** @type {import('next').NextConfig} */
const moduleExports = {
  devIndicators: { buildActivityPosition: 'bottom-right' },
  async headers() {
    return process.env.NODE_ENV !== 'development'
      ? [
        {
          headers: securityHeaders,
          source: '/:path*',
        },
      ]
      : []
  },
  experimental: {
    serverComponentsExternalPackages: ['typeorm'],
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

if (process.env.NODE_ENV === 'development') {
  module.exports = moduleExports
} else {
  const withPwa = require('next-pwa')({
    dest: 'public',
  })

  /** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
  const sentryWebpackPluginOptions = {
    silent: true,
  }

  const moduleExportsWithSentry = Object.assign(moduleExports, { sentry: { hideSourceMaps: true } })
  module.exports = withSentryConfig(withPwa(moduleExportsWithSentry), sentryWebpackPluginOptions)
}
