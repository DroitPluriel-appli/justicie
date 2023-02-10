import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ReactElement } from 'react'

export default class MyDocument extends Document {
  override render(): ReactElement {
    return (
      <Html lang="fr">
        <Head>
          {process.env.NODE_ENV === 'development' && (
            <Script
              src="/tarteaucitron.js"
              strategy="beforeInteractive"
            />
          )}
          {process.env.NODE_ENV === 'development' && (
            <Script
              src="/initTarteAuCitron.js"
              strategy="afterInteractive"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
