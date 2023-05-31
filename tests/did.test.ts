import { Did } from '../src'

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { DIDS } from './fixtures/dids'
import { createDidExtractPartsTest, createDidValidationTest } from './utils'

describe('Did', (_) => {
  it('should create a new did', (_) => {
    const didUrl = 'did:key:abc'
    const did = new Did(didUrl)

    assert.strictEqual(did.did, didUrl)
  })

  describe('should validate dids', (_) => {
    Object.keys(DIDS).forEach(createDidValidationTest)
  })

  describe('should extract correct parts from did', (_) => {
    Object.entries(DIDS).forEach(([did, expected]) =>
      createDidExtractPartsTest(did, expected)
    )
  })

  it('should create a new did from a did-url', (_) => {
    const didUrl = 'did:key:abc/some-path?versionId=1#key-1'
    const did = new Did(didUrl)

    assert.strictEqual(did.toUrl(), didUrl)
  })

  it('should extract the path, query and fragment', (_) => {
    const didUrl = 'did:key:abc/some-path?versionId=1#key-1'
    const did = new Did(didUrl)

    assert.strictEqual(did.path, 'some-path')
    assert.strictEqual(did.query, 'versionId=1')
    assert.strictEqual(did.fragment, 'key-1')
  })
})
