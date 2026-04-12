import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BookList from './BookList'
import { booksFixture } from '../../test/fixtures'
import { LocationDisplay } from '../../test/renderWithRouter'
import { deleteBook, getAllBooks } from '../../services/bookService'

vi.mock('../../services/bookService', () => ({
  getAllBooks: vi.fn(),
  deleteBook: vi.fn(),
}))

function renderBookList(initialEntry = '/books') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/books"
          element={
            <>
              <BookList />
              <LocationDisplay />
            </>
          }
        />
        <Route path="/books/new" element={<LocationDisplay />} />
        <Route path="/books/edit/:id" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BookList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders books from the API and resolves the first missing cover', async () => {
    getAllBooks.mockResolvedValue(booksFixture)

    renderBookList()

    expect(await screen.findByRole('heading', { name: /listado de libros/i })).toBeInTheDocument()
    expect(screen.getByText(/cien anos de soledad/i)).toBeInTheDocument()
    expect(screen.getByText(/^1984$/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /cien anos de soledad/i })).toHaveAttribute(
      'src',
      'https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg',
    )
  })

  it('filters the list when a search query is present', async () => {
    getAllBooks.mockResolvedValue(booksFixture)

    renderBookList('/books?q=1984')

    expect(await screen.findByText(/^1984$/i)).toBeInTheDocument()
    expect(screen.queryByText(/cien anos de soledad/i)).not.toBeInTheDocument()
  })

  it('renders the search empty state and clears the query on demand', async () => {
    const user = userEvent.setup()

    getAllBooks.mockResolvedValue(booksFixture)

    renderBookList('/books?q=sin-resultados')

    expect(await screen.findByText(/no hay resultados/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /ver todos los libros/i }))

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books')
    expect(await screen.findByText(/cien anos de soledad/i)).toBeInTheDocument()
  })

  it('renders the empty catalog state', async () => {
    getAllBooks.mockResolvedValue([])

    renderBookList()

    expect(await screen.findByText(/libros registrados/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear primer libro/i })).toBeInTheDocument()
  })

  it('renders the error state and retries the request', async () => {
    const user = userEvent.setup()

    getAllBooks.mockRejectedValueOnce(new Error('fallo')).mockResolvedValueOnce(booksFixture)

    renderBookList()

    expect(await screen.findByRole('button', { name: /reintentar/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByText(/cien anos de soledad/i)).toBeInTheDocument()
    expect(getAllBooks).toHaveBeenCalledTimes(2)
  })

  it('deletes a book and shows success feedback', async () => {
    const user = userEvent.setup()

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    getAllBooks.mockResolvedValueOnce(booksFixture).mockResolvedValueOnce([booksFixture[1]])
    deleteBook.mockResolvedValue({})

    renderBookList()

    await screen.findByText(/cien anos de soledad/i)
    await user.click(screen.getAllByRole('button', { name: /eliminar/i })[0])

    expect(deleteBook).toHaveBeenCalledWith(1)
    expect(await screen.findByRole('status')).toHaveTextContent(/libro eliminado correctamente/i)
    expect(getAllBooks).toHaveBeenCalledTimes(2)
  })

  it('shows feedback passed from the form and allows navigating to edit', async () => {
    const user = userEvent.setup()

    getAllBooks.mockResolvedValue(booksFixture)

    renderBookList({
      pathname: '/books',
      state: { feedback: { type: 'success', text: 'Libro creado correctamente.' } },
    })

    expect(await screen.findByRole('status')).toHaveTextContent(/libro creado correctamente/i)

    await user.click(screen.getAllByRole('button', { name: /editar/i })[0])

    expect(screen.getByTestId('location-display')).toHaveTextContent('/books/edit/1')
  })
})
