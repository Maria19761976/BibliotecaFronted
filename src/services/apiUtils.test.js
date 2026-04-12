import { describe, expect, it } from 'vitest'
import { ensureArrayResponse, ensureObjectResponse, getApiErrorMessage } from './apiUtils'

describe('apiUtils', () => {
  it('returns array responses and rejects invalid list payloads', () => {
    expect(ensureArrayResponse([1, 2], 'los autores')).toEqual([1, 2])
    expect(() => ensureArrayResponse({}, 'los autores')).toThrow(/autores/i)
  })

  it('returns object responses and rejects invalid object payloads', () => {
    expect(ensureObjectResponse({ id: 1 }, 'el autor')).toEqual({ id: 1 })
    expect(() => ensureObjectResponse([], 'el autor')).toThrow(/autor/i)
    expect(() => ensureObjectResponse(null, 'el autor')).toThrow(/autor/i)
  })

  it('extracts the best message from different API error shapes', () => {
    expect(getApiErrorMessage({ response: { data: 'Mensaje directo' } }, 'fallback')).toBe('Mensaje directo')
    expect(getApiErrorMessage({ response: { data: { message: 'Mensaje objeto' } } }, 'fallback')).toBe(
      'Mensaje objeto',
    )
    expect(getApiErrorMessage({ response: { data: { error: 'Mensaje error' } } }, 'fallback')).toBe(
      'Mensaje error',
    )
    expect(
      getApiErrorMessage(
        { response: { data: { errors: ['Primero', { message: 'Segundo' }] } } },
        'fallback',
      ),
    ).toBe('Primero Segundo')
    expect(getApiErrorMessage({ message: 'Mensaje base' }, 'fallback')).toBe('Mensaje base')
    expect(getApiErrorMessage({}, 'fallback')).toBe('fallback')
  })
})
