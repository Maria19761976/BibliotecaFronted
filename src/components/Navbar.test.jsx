import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the brand and navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /biblioteca/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^autores$/i })).toHaveAttribute('href', '/authors')
    expect(screen.getByRole('link', { name: /^libros$/i })).toHaveAttribute('href', '/books')
  })

  it('marks the current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/authors']}>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /^autores$/i })).toHaveClass('bg-emerald-700')
    expect(screen.getByRole('link', { name: /^libros$/i })).not.toHaveClass('bg-emerald-700')
  })
})
