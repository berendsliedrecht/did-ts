import { Did } from '../../src'
import { it } from 'node:test'
import assert from 'node:assert'

export const createDidIsDidUrlValidationTest = (
  did: string,
  expected: boolean,
) =>
  it(`should validate if did is url for ${did}`, () => {
    const instance = new Did(did)
    assert.strictEqual(instance.isDidUrl(), expected)
  })
