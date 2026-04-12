import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './bookService'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('bookService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads all books from the expected endpoint', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1 }] })

    await expect(getAllBooks()).resolves.toEqual([{ id: 1 }])
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books')
  })

  it('loads a single book from the expected endpoint', async () => {
    axios.get.mockResolvedValue({ data: { id: 4 } })

    await expect(getBookById(4)).resolves.toEqual({ id: 4 })
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books/4')
  })

  it('creates, updates and deletes books through the API', async () => {
    axios.post.mockResolvedValue({ data: { id: 7 } })
    axios.put.mockResolvedValue({ data: { id: 7, title: 'Actualizado' } })
    axios.delete.mockResolvedValue({ data: undefined })

    await expect(createBook({ title: 'Nuevo' })).resolves.toEqual({ id: 7 })
    await expect(updateBook(7, { title: 'Actualizado' })).resolves.toEqual({ id: 7, title: 'Actualizado' })
    await expect(deleteBook(7)).resolves.toBeUndefined()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/books', { title: 'Nuevo' })
    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/books/7', { title: 'Actualizado' })
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/books/7')
  })

  it('rejects invalid book payloads returned by the backend', async () => {
    axios.get.mockResolvedValue({ data: {} })

    await expect(getAllBooks()).rejects.toThrow(/libros/i)
  })
})
