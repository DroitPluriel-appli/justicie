'use client'

import { ReactElement } from 'react'

export default function Page(): ReactElement {
  const genererUneErreur = () => {
    throw new Error('Erreur pour tester que Sentry fonctionne')
  }

  return (
    <button
      onClick={genererUneErreur}
      type="button"
    >
      {'Lancer l’erreur'}
    </button>
  )
}
