import { describe, expect, it } from 'vitest'
import { apiBaseUrl } from './apiConfig'

describe('apiConfig', () => {
  it('uses the default localhost backend URL when no env override is provided', () => {
    expect(apiBaseUrl).toBe('http://localhost:8080')
  })
})
