import { it } from 'node:test'
import assert from 'node:assert'
import { Did, DidParts, DidUrlParts } from '../../src'

export const createDidExtractPartsTest = (
  did: string,
  expectedParts: DidParts
) => {
  it(`should extract did parts from ${did}`, () => {
    assert.deepStrictEqual(new Did(did).didParts, expectedParts)
  })
}

export const createDidExtractUrlPartsTest = (
  did: string,
  expectedUrlParts: DidUrlParts
) => {
  it(`should extract did url parts from ${did}`, () => {
    assert.deepStrictEqual(new Did(did).didUrlParts, expectedUrlParts)
  })
}
