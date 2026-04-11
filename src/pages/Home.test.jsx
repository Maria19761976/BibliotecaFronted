import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('muestra la búsqueda principal y los accesos rápidos de la demo', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /consulta y gestiona tu catálogo con rapidez/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/busca por título, autor o isbn/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir catálogo/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gestionar autores/i })).toBeInTheDocument()
  })
})
