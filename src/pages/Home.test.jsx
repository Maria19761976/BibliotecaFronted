import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'
import { renderWithRouter } from '../test/renderWithRouter'

describe('Home', () => {
  it('renders the hero, featured actions and quick links', () => {
    renderWithRouter(<Home />)

    expect(screen.getByRole('heading', { name: /consulta/i })).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ir a autores/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explorar libros/i })).toBeInTheDocument()
  })
})
