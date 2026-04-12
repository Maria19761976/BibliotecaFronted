import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AuthorList from './AuthorList'
import { authorsFixture } from '../../test/fixtures'
import { LocationDisplay } from '../../test/renderWithRouter'
import { deleteAuthor, getAllAuthors } from '../../services/authorService'

vi.mock('../../services/authorService', () => ({
  getAllAuthors: vi.fn(),
  deleteAuthor: vi.fn(),
}))

function renderAuthorList(initialEntry = '/authors') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/authors"
          element={
            <>
              <AuthorList />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/authors/new" element={<LocationDisplay />} />
        <Route path="/authors/edit/:id" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthorList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders authors from the API and resolves the first missing image', async () => {
    getAllAuthors.mockResolvedValue(authorsFixture)

    renderAuthorList()

    expect(await screen.findByRole('heading', { name: /listado de autores/i })).toBeInTheDocument()
    expect(screen.getByText(/gabriel garcia marquez/i)).toBeInTheDocument()
    expect(screen.getByText(/george orwell/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /gabriel garcia marquez/i })).toHaveAttribute(
      'src',
      expect.stringContaining('Gabriel_Garcia_Marquez_1984.jpg'),
    )
  })

  it('renders the empty state and links to create the first author', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue([])

    renderAuthorList()

    expect(await screen.findByText(/autores registrados/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /crear primer autor/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/authors/new')
  })

  it('renders the error state and retries the request', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockRejectedValueOnce(new Error('fallo de red')).mockResolvedValueOnce(authorsFixture)

    renderAuthorList()

    expect(await screen.findByRole('button', { name: /reintentar/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByText(/gabriel garcia marquez/i)).toBeInTheDocument()
    expect(getAllAuthors).toHaveBeenCalledTimes(2)
  })

  it('deletes an author and shows success feedback', async () => {
    const user = userEvent.setup()

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    getAllAuthors.mockResolvedValueOnce(authorsFixture).mockResolvedValueOnce([authorsFixture[1]])
    deleteAuthor.mockResolvedValue({})

    renderAuthorList()

    await screen.findByText(/gabriel garcia marquez/i)
    await user.click(screen.getAllByRole('button', { name: /eliminar/i })[0])

    expect(deleteAuthor).toHaveBeenCalledWith(1)
    expect(await screen.findByRole('status')).toHaveTextContent(/autor eliminado correctamente/i)
    expect(getAllAuthors).toHaveBeenCalledTimes(2)
  })

  it('shows feedback passed from the form after a successful save', async () => {
    getAllAuthors.mockResolvedValue(authorsFixture)

    renderAuthorList({
      pathname: '/authors',
      state: { feedback: { type: 'success', text: 'Autor creado correctamente.' } },
    })

    expect(await screen.findByRole('status')).toHaveTextContent(/autor creado correctamente/i)
  })

  it('navigates to the edit form from a card action', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue(authorsFixture)

    renderAuthorList()

    await screen.findByText(/gabriel garcia marquez/i)
    await user.click(screen.getAllByRole('button', { name: /editar/i })[0])

    expect(screen.getByTestId('location-display')).toHaveTextContent('/authors/edit/1')
  })
})
