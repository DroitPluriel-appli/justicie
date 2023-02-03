import Head from 'next/head'
import { ReactElement } from 'react'

export default function Title({ children }: { children: string }): ReactElement {
  return (
    <Head>
      <title>
        {children}
      </title>
    </Head>
  )
}
