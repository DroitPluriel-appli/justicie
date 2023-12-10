'use client'

import { Metadata } from 'next'
import { ReactElement, useCallback } from 'react'


export const metadata: Metadata = {
  title: 'Sentry',
}

export default function Page(): ReactElement {
  const genererUneErreur = () => {
    throw new Error('Erreur pour tester que Sentry fonctionne')
  }

  return (
    <button
      onClick={useCallback(genererUneErreur, [])}
      type="button"
    >
      {'Lancer l’erreur'}
    </button>
  )
}
