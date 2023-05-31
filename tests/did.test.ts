import { Did } from '../src'

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { DIDS } from './fixtures/dids'

describe('Did', (_) => {
  it('should create a new did', (_) => {
    const didUrl = 'did:key:abc'
    const did = new Did(didUrl)

    assert.strictEqual(did.did, didUrl)
  })

  describe('should validate some dids', (_) => {
    it('should validate simple did key', (_) => {
      assert.strictEqual(Did.validate(DIDS.SIMPLE_KEY), true)
    })

    it('should validate did key with path, query and fragment', (_) => {
      assert.strictEqual(Did.validate(DIDS.KEY_WITH_EXTRA), true)
    })

    it('should validate did key from transmute #1', (_) => {
      assert.strictEqual(Did.validate(DIDS.TRANSMUTE_VALID_DID_KEY_01), true)
    })

    it('should validate did key from transmute #2', (_) => {
      assert.strictEqual(Did.validate(DIDS.TRANSMUTE_VALID_DID_KEY_02), true)
    })

    it('should validate did sov from spec #1', (_) => {
      assert.strictEqual(Did.validate(DIDS.SOV_FROM_SPEC_01), true)
    })

    it('should validate did sov from spec #2', (_) => {
      assert.strictEqual(Did.validate(DIDS.SOV_FROM_SPEC_02), true)
    })

    it('should validate did ala from uniresolver', (_) => {
      assert.strictEqual(Did.validate(DIDS.ALA_FROM_UNIRESOLVER), true)
    })

    it('should validate did evan from uniresolver', (_) => {
      assert.strictEqual(Did.validate(DIDS.EVAN_FROM_UNIRESOLVER), true)
    })

    it('should validate did cheqd from uniresolver', (_) => {
      assert.strictEqual(Did.validate(DIDS.CHEQD_FROM_UNIRESOLVER), true)
    })

    it('should validate did example #3 from the did-core spec', (_) => {
      assert.strictEqual(Did.validate(DIDS.EXAMPLE_03), true)
    })

    it('should validate did example #4 from the did-core spec', (_) => {
      assert.strictEqual(Did.validate(DIDS.EXAMPLE_04), true)
    })

    it('should validate did example #6 from the did-core spec', (_) => {
      assert.strictEqual(Did.validate(DIDS.EXAMPLE_06), true)
    })

    it('should validate did example #8 from the did-core spec', (_) => {
      assert.strictEqual(Did.validate(DIDS.EXAMPLE_08), true)
    })

    it('should validate did example #13 from the did-core spec', (_) => {
      assert.strictEqual(Did.validate(DIDS.EXAMPLE_13), true)
    })
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
