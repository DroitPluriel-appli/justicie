import { within } from '@testing-library/react'

import { renderFakeComponent } from '../../configuration/testHelper'
import ExternalLink from './ExternalLink'

describe('lien externe', () => {
  it('cree un lien qui s ouvre dans un nouvel onglet/fenêtre', () => { // GIVEN
    const href = 'htts://fakehref.fr'
    const title = 'Title fake href'
    const rel = 'external noopener noreferrer'
    const target = '_blank'

    // WHEN
    renderFakeComponent(
      <ExternalLink
        href={href}
        title={title}
      >
        {'Contenu du lien'}
      </ExternalLink>
    )

    // THEN
    const link = within(document).getByRole('link', { name: title })
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveAttribute('title', title)
    expect(link).toHaveAttribute('rel', rel)
    expect(link).toHaveAttribute('target', target)
  })

  it('affiche le contenu dans le lien', () => {
    // GIVEN
    const href = 'htts://fakehref.fr'
    const title = 'Title fake href'
    const idTest = 'div-contenu'
    const contenu = (
      <div data-testid={idTest}>
        {'Contenu du lien'}
      </div>
    )

    // WHEN
    renderFakeComponent(
      <ExternalLink
        href={href}
        title={title}
      >
        {contenu}
      </ExternalLink>
    )

    // THEN
    const link = within(document).getByRole('link', { name: title })
    const contenuDansLien = within(link).getByTestId(idTest)
    expect(contenuDansLien).toBeInTheDocument()
  })
})
