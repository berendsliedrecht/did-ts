import { Did } from '../src'

import assert from 'node:assert'
import { describe, it } from 'node:test'
import { DIDS } from './fixtures/dids'
import {
  createDidExtractPartsTest,
  createDidExtractUrlPartsTest,
  createDidIsDidUrlValidationTest,
  createDidValidationTest,
} from './utils'

describe('Did', (_) => {
  describe('Creation', () => {
    it('should create a new did', () => {
      const didUrl = 'did:key:abc'
      const did = new Did(didUrl)

      assert.strictEqual(did.did, didUrl)
    })

    it('should create a new did from a did-url', () => {
      const didUrl = 'did:key:abc/some-path?versionId=1#key-1'
      const did = new Did(didUrl)

      assert.deepStrictEqual(did.toUrl(), didUrl)
    })

    it('should create a new did via the builder pattern', () => {
      const did = new Did('did:key:abc')
        .withPath('some-path')
        .withQuery({ versionId: '1' })
        .withFragment('key-1')

      assert.deepStrictEqual(
        did.toUrl(),
        'did:key:abc/some-path?versionId=1#key-1'
      )
    })
  })

  describe('Validation', () => {
    describe('Validate did', () => {
      Object.keys(DIDS).forEach(createDidValidationTest)
    })

    describe('Validate whether did is url', () => {
      Object.entries(DIDS).forEach(([did, expected]) =>
        createDidIsDidUrlValidationTest(
          did,
          Boolean(
            expected.urlParts.path ||
              expected.urlParts.query ||
              expected.urlParts.fragment ||
              expected.urlParts.parameters
          )
        )
      )
    })
  })

  describe('Extraction', () => {
    describe('Extract did parts', () => {
      Object.entries(DIDS).forEach(([did, expected]) =>
        createDidExtractPartsTest(did, expected.parts)
      )
    })

    describe('Extract did url parts', () => {
      Object.entries(DIDS).forEach(([did, expected]) =>
        createDidExtractUrlPartsTest(did, expected.urlParts)
      )
    })
  })

  describe('Modify url parts', () => {
    const baseDid = 'did:key:abc'
    describe('Path', () => {
      it('should add a new path (withPath)', () => {
        const did = new Did(baseDid)
        did.withPath('test')
        assert.strictEqual(did.didUrlParts.path, 'test')
      })

      it('should add a new path (addPath)', () => {
        const did = new Did(baseDid)
        did.addPath('test')
        assert.strictEqual(did.didUrlParts.path, 'test')
      })

      it('should append a new path', () => {
        const did = new Did(baseDid)
        did.addPath('test').addPath('testTwo')
        assert.strictEqual(did.didUrlParts.path, 'test/testTwo')
      })

      it('should remove the path', () => {
        const did = new Did(baseDid)
        did.addPath('test').removePath()
        assert.strictEqual(did.didUrlParts.path, undefined)
      })
    })

    describe('Query', () => {
      it('should add a new query (withQuery)', () => {
        const did = new Did(baseDid)
        did.withQuery({ a: 'b' })
        assert.deepStrictEqual(did.didUrlParts.query, { a: 'b' })
      })

      it('should add a new query (addQuery)', () => {
        const did = new Did(baseDid)
        did.addQuery({ a: 'b' })
        assert.deepStrictEqual(did.didUrlParts.query, { a: 'b' })
      })

      it('should append a new query', () => {
        const did = new Did(baseDid)
        did.addQuery({ a: 'b' }).addQuery({ c: 'd' })
        assert.deepStrictEqual(did.didUrlParts.query, { a: 'b', c: 'd' })
      })

      it('should remove the query', () => {
        const did = new Did(baseDid)
        did.addQuery({ a: 'b' }).removeQuery()
        assert.strictEqual(did.didUrlParts.query, undefined)
      })
    })

    describe('Fragment', () => {
      it('should add a new fragment', () => {
        const did = new Did(baseDid)
        did.withFragment('a')
        assert.strictEqual(did.didUrlParts.fragment, 'a')
      })

      it('should remove the fragment', () => {
        const did = new Did(baseDid)
        did.withFragment('a').removeFragment()
        assert.strictEqual(did.didUrlParts.fragment, undefined)
      })
    })

    describe('Parameters', () => {
      it('should add a new parameter', () => {
        const did = new Did(baseDid)
        did.addParameterKey('a').addQuery({ a: 'b' })
        assert.deepStrictEqual(did.didUrlParts.parameters, { a: 'b' })
      })
    })
  })
})
