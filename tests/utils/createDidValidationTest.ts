import { it } from 'node:test'
import assert from 'node:assert'
import { Did } from '../../src'

export const createDidValidationTest = (did: string) => {
  it(`should validate ${did}`, (_) => {
    assert.strictEqual(Did.validateDidUrl(did), true)
  })
}
