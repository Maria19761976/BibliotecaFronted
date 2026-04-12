import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from './authorService'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('authorService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads all authors from the expected endpoint', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1 }] })

    await expect(getAllAuthors()).resolves.toEqual([{ id: 1 }])
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/authors')
  })

  it('loads a single author from the expected endpoint', async () => {
    axios.get.mockResolvedValue({ data: { id: 4 } })

    await expect(getAuthorById(4)).resolves.toEqual({ id: 4 })
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/authors/4')
  })

  it('creates, updates and deletes authors through the API', async () => {
    axios.post.mockResolvedValue({ data: { id: 7 } })
    axios.put.mockResolvedValue({ data: { id: 7, name: 'Actualizado' } })
    axios.delete.mockResolvedValue({ data: undefined })

    await expect(createAuthor({ name: 'Nuevo' })).resolves.toEqual({ id: 7 })
    await expect(updateAuthor(7, { name: 'Actualizado' })).resolves.toEqual({ id: 7, name: 'Actualizado' })
    await expect(deleteAuthor(7)).resolves.toBeUndefined()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/authors', { name: 'Nuevo' })
    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/authors/7', { name: 'Actualizado' })
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/authors/7')
  })

  it('rejects invalid author payloads returned by the backend', async () => {
    axios.get.mockResolvedValue({ data: {} })

    await expect(getAllAuthors()).rejects.toThrow(/autores/i)
  })
})
