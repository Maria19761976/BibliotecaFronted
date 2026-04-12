import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FeatureSection from './FeatureSection'
import { LocationDisplay } from '../test/renderWithRouter'

function renderFeatureSection() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FeatureSection />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/books" element={<LocationDisplay />} />
        <Route path="/authors" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('FeatureSection', () => {
  it('renders the featured action cards', () => {
    renderFeatureSection()

    expect(screen.getByText(/selecci/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver.*logo/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ir a libros/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ir a autores/i })).toBeInTheDocument()
  })

  it('navigates to the books route from the main action', async () => {
    const user = userEvent.setup()

    renderFeatureSection()

    await user.click(screen.getByRole('button', { name: /ver.*logo/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books')
  })

  it('navigates to the authors route from the side action', async () => {
    const user = userEvent.setup()

    renderFeatureSection()

    await user.click(screen.getByRole('button', { name: /ir a autores/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/authors')
  })

  it('navigates to the books route from the secondary books action', async () => {
    const user = userEvent.setup()

    renderFeatureSection()

    await user.click(screen.getByRole('button', { name: /ir a libros/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books')
  })
})
