import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Recommended from './Recommended'
import { LocationDisplay } from '../test/renderWithRouter'

function renderRecommended() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Recommended />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/books" element={<LocationDisplay />} />
        <Route path="/books/new" element={<LocationDisplay />} />
        <Route path="/authors" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Recommended', () => {
  it('renders the quick access links', () => {
    renderRecommended()

    expect(screen.getByRole('heading', { name: /accesos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explorar libros/i })).toHaveAttribute('href', '/books')
    expect(screen.getByRole('link', { name: /a.*adir un libro/i })).toHaveAttribute('href', '/books/new')
    expect(screen.getByRole('link', { name: /gestionar autores/i })).toHaveAttribute('href', '/authors')
    expect(screen.getByRole('link', { name: /abrir cat/i })).toHaveAttribute('href', '/books')
  })

  it('navigates to the new book form from the quick actions', async () => {
    const user = userEvent.setup()

    renderRecommended()

    await user.click(screen.getByRole('link', { name: /a.*adir un libro/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books/new')
  })
})
