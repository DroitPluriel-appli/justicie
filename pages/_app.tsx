/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { ContextProvider } from '../configuration/useDependencies'
import '../configuration/globals.css'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ContextProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          name="viewport"
        />
        <meta
          content="Plateforme qui permet de rechercher un point d'accès au droit en fonction de ses besoins en accessibilité et de sa position ou de son adresse"
          name="description"
        />
        <link
          href="favicon.ico"
          rel="icon"
          type="image/x-icon"
        />
        <link
          href="favicon.ico"
          rel="apple-touch-icon"
        />
        <link
          href="manifest.webmanifest"
          rel="manifest"
        />
        <meta
          content="#ffffff"
          name="theme-color"
        />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ContextProvider>
  )
}
