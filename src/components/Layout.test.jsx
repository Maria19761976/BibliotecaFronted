import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Layout from './Layout'

describe('Layout', () => {
  it('renders the navbar, page content and footer', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Contenido principal de prueba</div>
        </Layout>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /biblioteca/i })).toBeInTheDocument()
    expect(screen.getByText(/contenido principal de prueba/i)).toBeInTheDocument()
    expect(screen.getByText(/2026 biblioteca/i)).toBeInTheDocument()
  })
})
