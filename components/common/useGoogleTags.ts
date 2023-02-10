/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export function useGoogleTags() {
  const tagAucunResultatDeRecherche = () => {
    // @ts-ignore
    window.dataLayer?.push({ event: 'AucunResultatDeRecherche' })
    console.log('Send tagAucunResultatDeRecherche')
  }

  return { tagAucunResultatDeRecherche }
}
