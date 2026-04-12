import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer copy', () => {
    render(<Footer />)

    expect(screen.getByText(/2026 biblioteca/i)).toBeInTheDocument()
    expect(screen.getByText(/un espacio sencillo para ordenar libros/i)).toBeInTheDocument()
  })
})
