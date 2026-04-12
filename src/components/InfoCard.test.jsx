import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import InfoCard from './InfoCard'

const fields = [
  { label: 'ISBN', value: '9780307474728' },
  { label: 'Autor', value: 'Gabriel Garcia Marquez' },
]

describe('InfoCard', () => {
  it('renders the image, fields and actions', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(
      <InfoCard
        title="Cien anos de soledad"
        imageUrl="https://example.com/cover.jpg"
        fields={fields}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    )

    expect(screen.getByRole('img', { name: /cien anos de soledad/i })).toHaveAttribute(
      'src',
      'https://example.com/cover.jpg',
    )
    expect(screen.getByText(/isbn/i)).toBeInTheDocument()
    expect(screen.getByText(/gabriel garcia marquez/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /editar/i }))
    await user.click(screen.getByRole('button', { name: /eliminar/i }))

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('shows the normal fallback when the image fails to load', () => {
    render(
      <InfoCard
        title="Cien anos de soledad"
        imageUrl="https://example.com/broken.jpg"
        fields={fields}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    )

    fireEvent.error(screen.getByRole('img', { name: /cien anos de soledad/i }))

    expect(screen.getByText(/sin imagen/i)).toBeInTheDocument()
  })

  it('restores the image when a new source is provided after an error', () => {
    const { rerender } = render(
      <InfoCard
        title="Cien anos de soledad"
        imageUrl="https://example.com/broken.jpg"
        fields={fields}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    )

    fireEvent.error(screen.getByRole('img', { name: /cien anos de soledad/i }))
    expect(screen.getByText(/sin imagen/i)).toBeInTheDocument()

    rerender(
      <InfoCard
        title="Cien anos de soledad"
        imageUrl="https://example.com/fixed.jpg"
        fields={fields}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    )

    expect(screen.getByRole('img', { name: /cien anos de soledad/i })).toHaveAttribute(
      'src',
      'https://example.com/fixed.jpg',
    )
  })
})
