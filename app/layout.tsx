import Script from 'next/script'
import { PropsWithChildren, ReactElement } from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import '../configuration/globals.css'

export default function Layout({ children }: PropsWithChildren): ReactElement {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width,initial-scale=1"
          name="viewport"
        />
        <meta
          content="Plateforme qui permet de rechercher un point d'accès au droit en fonction de ses besoins en accessibilité et de sa position ou de son adresse"
          name="description"
        />
        <link
          href="/favicon.png"
          rel="icon"
          type="image/png"
        />
        <link
          href="/favicon.png"
          rel="apple-touch-icon"
        />
        <link
          href="/manifest.webmanifest"
          rel="manifest"
        />
        <meta
          content="#ffffff"
          name="theme-color"
        />
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="/tarteaucitron.js"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="/initTarteAuCitron.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <Header />
        <main id="contenu">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
