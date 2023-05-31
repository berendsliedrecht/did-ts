import { it } from 'node:test'
import assert from 'node:assert'
import { Did, DidParts } from '../../src'

export const createDidExtractPartsTest = (
  did: string,
  expectedParts: DidParts
) => {
  it(`should extract did parts from ${did}`, (_) => {
    assert.deepStrictEqual(new Did(did).didParts, expectedParts)
  })
}
