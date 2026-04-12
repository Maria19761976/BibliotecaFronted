import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Hero from './Hero'
import { LocationDisplay } from '../test/renderWithRouter'

function renderHero() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/books" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Hero', () => {
  it('renders the search UI without category chips', () => {
    renderHero()

    expect(screen.getByRole('heading', { name: /consulta/i })).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
    expect(screen.queryByText(/ciencia/i)).not.toBeInTheDocument()
  })

  it('navigates to the filtered books view when a query is submitted', async () => {
    const user = userEvent.setup()

    renderHero()

    await user.type(screen.getByRole('searchbox'), '1984')
    await user.click(screen.getByRole('button', { name: /buscar/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books?q=1984')
  })

  it('navigates to the full books catalog when the query is blank', async () => {
    const user = userEvent.setup()

    renderHero()

    await user.click(screen.getByRole('button', { name: /buscar/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books')
  })
})
