import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('renders the home route', () => {
    render(<App />)

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^autores$/i })).toBeInTheDocument()
  })

  it('renders the 404 page for unknown routes', () => {
    window.history.replaceState({}, '', '/ruta-inexistente')

    render(<App />)

    expect(screen.getByText(/error 404/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /ver autores/i })).toHaveAttribute('href', '/authors')
  })
})
