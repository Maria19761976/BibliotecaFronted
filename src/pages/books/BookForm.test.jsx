import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import BookForm from './BookForm'
import { authorsFixture, bookDetailFixture } from '../../test/fixtures'
import { getAllAuthors } from '../../services/authorService'
import { createBook, getBookById, updateBook } from '../../services/bookService'

vi.mock('../../services/authorService', () => ({
  getAllAuthors: vi.fn(),
}))

vi.mock('../../services/bookService', () => ({
  createBook: vi.fn(),
  getBookById: vi.fn(),
  updateBook: vi.fn(),
}))

function RouteStateDisplay() {
  const location = useLocation()
  const feedback = location.state?.feedback?.text || ''

  return <div data-testid="route-state">{`${location.pathname}|${feedback}`}</div>
}

function renderBookForm(initialEntry = '/books/new') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/edit/:id" element={<BookForm />} />
        <Route path="/books" element={<RouteStateDisplay />} />
        <Route path="/authors/new" element={<RouteStateDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('BookForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the empty-authors state when there are no authors available', async () => {
    getAllAuthors.mockResolvedValue([])

    renderBookForm()

    expect(await screen.findByRole('heading', { name: /no hay autores disponibles/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear autor/i })).toBeInTheDocument()
  })

  it('validates required fields before creating a book', async () => {
    getAllAuthors.mockResolvedValue(authorsFixture)

    renderBookForm()

    expect(await screen.findByRole('button', { name: /crear libro/i })).toBeInTheDocument()

    fireEvent.submit(screen.getByRole('button', { name: /crear libro/i }).closest('form'))

    expect(screen.getByRole('alert')).toHaveTextContent(/campos obligatorios|rellena todos/i)
    expect(createBook).not.toHaveBeenCalled()
  })

  it('validates the publication year before saving', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue(authorsFixture)

    renderBookForm()

    expect(await screen.findByRole('button', { name: /crear libro/i })).toBeInTheDocument()

    await user.type(screen.getByLabelText(/t.*tulo/i), 'La casa de los espiritus')
    await user.type(screen.getByLabelText(/isbn/i), '9780553383805')
    await user.type(screen.getByLabelText(/publicaci/i), '0')
    await user.selectOptions(screen.getByRole('combobox', { name: /autor/i }), '1')
    fireEvent.submit(screen.getByRole('button', { name: /crear libro/i }).closest('form'))

    expect(screen.getByRole('alert')).toHaveTextContent(/n.*mero.*v.*lido/i)
    expect(createBook).not.toHaveBeenCalled()
  })

  it('creates a new book and redirects back to the list', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue(authorsFixture)
    createBook.mockResolvedValue({ id: 20 })

    renderBookForm()

    expect(await screen.findByRole('button', { name: /crear libro/i })).toBeInTheDocument()

    await user.type(screen.getByLabelText(/t.*tulo/i), ' La casa de los espiritus ')
    await user.type(screen.getByLabelText(/isbn/i), ' 9780553383805 ')
    await user.type(screen.getByLabelText(/publicaci/i), '1982')
    await user.type(screen.getByLabelText(/imagen/i), ' https://example.com/casa.jpg ')
    await user.selectOptions(screen.getByRole('combobox', { name: /autor/i }), '1')
    await user.click(screen.getByRole('button', { name: /crear libro/i }))

    await waitFor(() => {
      expect(createBook).toHaveBeenCalledWith({
        title: 'La casa de los espiritus',
        isbn: '9780553383805',
        publicationYear: 1982,
        image: 'https://example.com/casa.jpg',
        author: {
          id: 1,
        },
      })
    })
    expect(screen.getByTestId('route-state')).toHaveTextContent('/books|Libro creado correctamente.')
  })

  it('shows the API error message when saving fails', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue(authorsFixture)
    createBook.mockRejectedValue({ response: { data: { message: 'No se pudo guardar el libro.' } } })

    renderBookForm()

    expect(await screen.findByRole('button', { name: /crear libro/i })).toBeInTheDocument()

    await user.type(screen.getByLabelText(/t.*tulo/i), 'La casa de los espiritus')
    await user.type(screen.getByLabelText(/isbn/i), '9780553383805')
    await user.type(screen.getByLabelText(/publicaci/i), '1982')
    await user.selectOptions(screen.getByRole('combobox', { name: /autor/i }), '1')
    await user.click(screen.getByRole('button', { name: /crear libro/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se pudo guardar el libro/i)
    expect(screen.getByRole('button', { name: /crear libro/i })).toBeEnabled()
  })

  it('loads an existing book and updates it', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue([
      ...authorsFixture,
      {
        id: 7,
        name: 'Isabel',
        surname: 'Allende',
        nationality: 'Chilena',
        birthYear: 1942,
        alive: true,
        image: 'https://example.com/isabel.jpg',
      },
    ])
    getBookById.mockResolvedValue(bookDetailFixture)
    updateBook.mockResolvedValue(bookDetailFixture)

    renderBookForm('/books/edit/8')

    expect(await screen.findByDisplayValue('La casa de los espiritus')).toBeInTheDocument()

    const yearInput = screen.getByLabelText(/publicaci/i)
    await user.clear(yearInput)
    await user.type(yearInput, '1983')
    await user.click(screen.getByRole('button', { name: /guardar cambios/i }))

    await waitFor(() => {
      expect(updateBook).toHaveBeenCalledWith('8', {
        title: 'La casa de los espiritus',
        isbn: '9780553383805',
        publicationYear: 1983,
        image: 'https://example.com/casa.jpg',
        author: {
          id: 7,
        },
      })
    })
    expect(screen.getByTestId('route-state')).toHaveTextContent('/books|Libro actualizado correctamente.')
  })

  it('shows the load error state and retries fetching the book data', async () => {
    const user = userEvent.setup()

    getAllAuthors.mockResolvedValue(authorsFixture)
    getBookById.mockRejectedValueOnce(new Error('fallo')).mockResolvedValueOnce(bookDetailFixture)

    renderBookForm('/books/edit/8')

    expect(await screen.findByRole('heading', { name: /no se pudo abrir esta ficha/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByDisplayValue('La casa de los espiritus')).toBeInTheDocument()
    expect(getBookById).toHaveBeenCalledTimes(2)
  })
})
