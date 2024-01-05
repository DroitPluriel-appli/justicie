'use client'

import { ReactElement, useCallback } from 'react'

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
