import { Did } from '../src'

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { DIDS } from './fixtures/dids'
import {
  createDidExtractPartsTest,
  createDidExtractUrlPartsTest,
  createDidValidationTest,
} from './utils'

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
      createDidExtractPartsTest(did, expected.parts)
    )
  })

  describe('should extract correct url parts from did', (_) => {
    Object.entries(DIDS).forEach(([did, expected]) =>
      createDidExtractUrlPartsTest(did, expected.urlParts)
    )
  })

  it('should create a new did from a did-url', (_) => {
    const didUrl = 'did:key:abc/some-path?versionId=1#key-1'
    const did = new Did(didUrl)

    assert.deepStrictEqual(did.toUrl(), didUrl)
  })

  it('should add a new parameter key', (_) => {
    const didUrl = 'did:key:abc?some-key=test'
    const did = new Did(didUrl)
    did.addParameterKey('some-key')

    assert.deepStrictEqual(did.didUrlParts.parameters, { 'some-key': 'test' })
  })

  it('should add a new parameter keys', (_) => {
    const didUrl = 'did:key:abc?some-key=test&some-other-key=test-two'
    const did = new Did(didUrl)
    did.addParameterKey(['some-key', 'some-other-key'])

    assert.deepStrictEqual(did.didUrlParts.parameters, {
      'some-key': 'test',
      'some-other-key': 'test-two',
    })
  })
})
