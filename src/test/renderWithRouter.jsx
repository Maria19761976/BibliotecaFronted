/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'

export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

export function LocationDisplay() {
  const location = useLocation()

  return <div data-testid="location-display">{`${location.pathname}${location.search}`}</div>
}
