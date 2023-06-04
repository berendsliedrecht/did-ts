import { describe, it } from 'node:test'
import { DID_DOCUMENTS } from './fixtures/didDocuments'
import assert from 'node:assert'
import { createDidDocumentConstructTest } from './utils/createDidDocumentConstructTest'
import { Did, DidDocument, VerificationMethod, DidDocumentError } from '../src'
import { ZodError } from 'zod'

describe('Did Document', () => {
  DID_DOCUMENTS.map(createDidDocumentConstructTest)

  describe('Create did document with builder', () => {
    it('should create basic did document with the builder', () => {
      const doc = new DidDocument({ id: 'did:example:123' })
      assert.deepStrictEqual(doc.toJSON(), { id: 'did:example:123' })
    })

    it('should strip URL parts on `id` field', () => {
      const doc = new DidDocument({ id: 'did:example:123#key-01' })
      assert.deepStrictEqual(doc.toJSON(), { id: 'did:example:123' })
    })

    it('should create a more complex did document with the builder', () => {
      const doc = new DidDocument({ id: 'did:example:123' })
        .addService({
          id: 'some:uri',
          type: ['a', 'b'],
          serviceEndpoint: ['https://google.com', 'https://github.com'],
        })
        .addVerificationMethod({
          id: new Did('did:example:123'),
          type: 'some-type',
          controller: 'did:example:123',
          publicKeyJwk: { kty: 'a' },
        })
        .addController(new Did('did:example:123'), true)
        .addAlsoKnownAs('AKA')
        .addKeyAgreementUnsafe(new Did('did:foo:bar'))
        .addAssertionMethod('did:example:123')
        .addAuthentication({
          controller: 'did:me:123',
          type: 'again-some-other-type',
          id: 'did:cheese:bar',
        })
        .addCapabilityDelegation(
          new VerificationMethod({
            id: 'did:some:id',
            type: 'some-type',
            controller: 'did:me:duh',
          })
        )
        .addCapabilityInvocationUnsafe('did:me:duh')
        .addAssertionMethod({
          id: 'did:key:foobar',
          type: 'a',
          controller: 'did:example:123',
        })

      assert.deepStrictEqual(doc.toJSON(), {
        id: 'did:example:123',
        alsoKnownAs: ['AKA'],
        controller: ['did:example:123'],
        authentication: [
          {
            controller: 'did:me:123',
            type: 'again-some-other-type',
            id: 'did:cheese:bar',
          },
        ],
        verificationMethod: [
          {
            id: 'did:example:123',
            type: 'some-type',
            controller: 'did:example:123',
            publicKeyJwk: { kty: 'a' },
          },
        ],
        assertionMethod: [
          'did:example:123',
          { id: 'did:key:foobar', type: 'a', controller: 'did:example:123' },
        ],
        keyAgreement: ['did:foo:bar'],
        capabilityInvocation: ['did:me:duh'],
        capabilityDelegation: [
          { id: 'did:some:id', type: 'some-type', controller: 'did:me:duh' },
        ],
        service: [
          {
            id: 'some:uri',
            type: ['a', 'b'],
            serviceEndpoint: ['https://google.com', 'https://github.com'],
          },
        ],
      })
    })

    it('should error with duplicate ID in service', () => {
      assert.throws(
        () =>
          new DidDocument({ id: 'did:foo:bar' })
            .addService({
              id: 'some:id',
              type: 'some-type',
              serviceEndpoint: 'https://github.com',
            })
            .addService({
              id: 'some:id',
              type: 'some-type',
              serviceEndpoint: 'https://github.com',
            }),
        ZodError
      )
    })

    it('should error with duplicate ID in verificationMethod reference', () => {
      assert.throws(
        () =>
          new DidDocument({ id: 'did:foo:bar' })
            .addAuthentication({
              id: 'did:url:ref#1',
              type: 'some-type',
              controller: 'did:foo:bar',
            })
            .addAuthentication({
              id: 'did:url:ref#1',
              type: 'some-type',
              controller: 'did:foo:bar',
            }),
        ZodError
      )
    })

    it('should error when the verification method reference is not inside the verification method', () => {
      assert.throws(
        () =>
          new DidDocument({ id: 'did:foo:bar' }).addAuthentication(
            'did:example:key#01'
          ),
        DidDocumentError
      )
    })

    it('should not error when the verification method reference is not inside the verification method, but using unsafe', () => {
      const doc = new DidDocument({
        id: 'did:foo:bar',
      }).addAuthenticationUnsafe('did:example:key#01')

      assert.deepStrictEqual(doc.toJSON(), {
        id: 'did:foo:bar',
        authentication: ['did:example:key#01'],
      })
    })
  })

  describe('Dereferencing to verification method', () => {
    it('should dereference correctly to the associated verification method', () => {
      const doc = new DidDocument({
        id: 'did:example:bar',
      }).addVerificationMethod({
        id: 'did:example:bar#01',
        type: 'some-type',
        controller: 'did:example:bar',
        publicKeyJwk: { kty: 'some-kty' },
      })

      assert.deepStrictEqual(
        doc.dereferenceToVerificationMethod('did:example:bar#01').toJSON(),
        {
          id: 'did:example:bar#01',
          type: 'some-type',
          controller: 'did:example:bar',
          publicKeyJwk: { kty: 'some-kty' },
        }
      )
    })

    it('should dereference safely to the associated verification method', () => {
      const doc = new DidDocument({
        id: 'did:example:bar',
      }).addVerificationMethod({
        id: 'did:example:bar#01',
        type: 'some-type',
        controller: 'did:example:bar',
        publicKeyJwk: { kty: 'some-kty' },
      })

      assert.deepStrictEqual(
        doc.safeDereferenceToVerificationMethod('did:example:bar#01')?.toJSON(),
        {
          id: 'did:example:bar#01',
          type: 'some-type',
          controller: 'did:example:bar',
          publicKeyJwk: { kty: 'some-kty' },
        }
      )
    })

    it('should dereference safely to undefined if the verification method does not exist', () => {
      const doc = new DidDocument({
        id: 'did:example:bar',
      })

      assert.strictEqual(
        doc.safeDereferenceToVerificationMethod('did:example:bar#01'),
        undefined
      )
    })

    it('should not dereference if the verification method does not exist', () => {
      assert.throws(() => {
        const doc = new DidDocument({
          id: 'did:example:bar',
        })
        doc.dereferenceToVerificationMethod('did:example:bar#01')
      }, DidDocumentError)
    })
  })
})
