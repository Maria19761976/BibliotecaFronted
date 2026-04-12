import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import AuthorForm from './AuthorForm'
import { authorDetailFixture } from '../../test/fixtures'
import { createAuthor, getAuthorById, updateAuthor } from '../../services/authorService'

vi.mock('../../services/authorService', () => ({
  getAuthorById: vi.fn(),
  createAuthor: vi.fn(),
  updateAuthor: vi.fn(),
}))

function RouteStateDisplay() {
  const location = useLocation()
  const feedback = location.state?.feedback?.text || ''

  return <div data-testid="route-state">{`${location.pathname}|${feedback}`}</div>
}

function renderAuthorForm(initialEntry = '/authors/new') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/authors/new" element={<AuthorForm />} />
        <Route path="/authors/edit/:id" element={<AuthorForm />} />
        <Route path="/authors" element={<RouteStateDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthorForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates required fields before creating an author', async () => {
    renderAuthorForm()

    fireEvent.submit(screen.getByRole('button', { name: /crear autor/i }).closest('form'))

    expect(screen.getByRole('alert')).toHaveTextContent(/campos obligatorios/i)
    expect(createAuthor).not.toHaveBeenCalled()
  })

  it('validates the birth year before saving', async () => {
    const user = userEvent.setup()

    renderAuthorForm()

    await user.type(screen.getByLabelText(/nombre/i), 'Isabel')
    await user.type(screen.getByLabelText(/apellido/i), 'Allende')
    await user.type(screen.getByLabelText(/nacionalidad/i), 'Chilena')
    await user.type(screen.getByLabelText(/nacimiento/i), '0')
    fireEvent.submit(screen.getByRole('button', { name: /crear autor/i }).closest('form'))

    expect(screen.getByRole('alert')).toHaveTextContent(/n.*mero.*v.*lido/i)
    expect(createAuthor).not.toHaveBeenCalled()
  })

  it('creates a new author with trimmed values and redirects to the list', async () => {
    const user = userEvent.setup()

    createAuthor.mockResolvedValue({ id: 10 })

    renderAuthorForm()

    await user.type(screen.getByLabelText(/nombre/i), ' Isabel ')
    await user.type(screen.getByLabelText(/apellido/i), ' Allende ')
    await user.type(screen.getByLabelText(/nacionalidad/i), ' Chilena ')
    await user.type(screen.getByLabelText(/nacimiento/i), '1942')
    await user.type(screen.getByLabelText(/imagen/i), ' https://example.com/isabel.jpg ')
    await user.click(screen.getByLabelText(/vive/i))
    await user.click(screen.getByRole('button', { name: /crear autor/i }))

    await waitFor(() => {
      expect(createAuthor).toHaveBeenCalledWith({
        name: 'Isabel',
        surname: 'Allende',
        nationality: 'Chilena',
        birthYear: 1942,
        image: 'https://example.com/isabel.jpg',
        alive: false,
      })
    })
    expect(screen.getByTestId('route-state')).toHaveTextContent('/authors|Autor creado correctamente.')
  })

  it('loads an existing author and updates it', async () => {
    const user = userEvent.setup()

    getAuthorById.mockResolvedValue(authorDetailFixture)
    updateAuthor.mockResolvedValue(authorDetailFixture)

    renderAuthorForm('/authors/edit/7')

    expect(await screen.findByDisplayValue('Isabel')).toBeInTheDocument()

    const nationalityInput = screen.getByLabelText(/nacionalidad/i)
    await user.clear(nationalityInput)
    await user.type(nationalityInput, 'Peruana')
    await user.click(screen.getByRole('button', { name: /guardar cambios/i }))

    await waitFor(() => {
      expect(updateAuthor).toHaveBeenCalledWith('7', {
        name: 'Isabel',
        surname: 'Allende',
        nationality: 'Peruana',
        birthYear: 1942,
        image: 'https://example.com/isabel.jpg',
        alive: true,
      })
    })
    expect(screen.getByTestId('route-state')).toHaveTextContent('/authors|Autor actualizado correctamente.')
  })

  it('shows the API error message when saving fails', async () => {
    const user = userEvent.setup()

    createAuthor.mockRejectedValue({ response: { data: { message: 'No se pudo guardar el autor.' } } })

    renderAuthorForm()

    await user.type(screen.getByLabelText(/nombre/i), 'Isabel')
    await user.type(screen.getByLabelText(/apellido/i), 'Allende')
    await user.type(screen.getByLabelText(/nacionalidad/i), 'Chilena')
    await user.type(screen.getByLabelText(/nacimiento/i), '1942')
    await user.click(screen.getByRole('button', { name: /crear autor/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no se pudo guardar el autor/i)
    expect(screen.getByRole('button', { name: /crear autor/i })).toBeEnabled()
  })

  it('shows the load error state and retries fetching the author', async () => {
    const user = userEvent.setup()

    getAuthorById.mockRejectedValueOnce(new Error('fallo')).mockResolvedValueOnce(authorDetailFixture)

    renderAuthorForm('/authors/edit/7')

    expect(await screen.findByRole('heading', { name: /no se pudo abrir este autor/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByDisplayValue('Isabel')).toBeInTheDocument()
    expect(getAuthorById).toHaveBeenCalledTimes(2)
  })
})
