import { describe, it } from 'node:test'
import { DID_DOCUMENTS } from './fixtures/didDocuments'
import assert from 'node:assert'
import { createDidDocumentConstructTest } from './utils/createDidDocumentConstructTest'
import {
    Did,
    DidDocument,
    VerificationMethod,
    DidDocumentError,
    VerificationMethodTypes,
    ServiceTypes
} from '../src'
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

        it('should show undefined properties', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                someField: 'a'
            })
            assert.deepStrictEqual(doc.toJSON(), {
                id: 'did:example:123',
                someField: 'a'
            })
        })

        it('should not show undefined properties, if specified inside the toJSON method', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                someField: 'a'
            })
            assert.deepStrictEqual(doc.toJSON(['someField']), {
                id: 'did:example:123'
            })
        })

        it('should error when providing a DID URL for the `controller` field', () => {
            assert.throws(
                () =>
                    new DidDocument({
                        id: 'did:example:123',
                        controller: 'did:key:abc/path'
                    }),
                ZodError
            )
        })

        it('should error when providing both a `publicKeyJwk` and `publicKeyMultibase` in a verification method', () => {
            assert.throws(
                () =>
                    new DidDocument({
                        id: 'did:example:123',
                        verificationMethod: [
                            {
                                id: 'did:some:id',
                                type: 'verification',
                                controller: 'did:example:123',
                                publicKeyJwk: { kty: 'keyType' },
                                publicKeyMultibase: 'someMultibase'
                            }
                        ]
                    }),
                ZodError
            )
        })

        it('should create a more complex did document with the builder', () => {
            const doc = new DidDocument({ id: 'did:example:123' })
                .addService({
                    id: 'some:uri',
                    type: ['a', 'b'],
                    serviceEndpoint: [
                        'https://google.com',
                        'https://github.com'
                    ]
                })
                .addVerificationMethod({
                    id: new Did('did:example:123'),
                    type: 'some-type',
                    controller: 'did:example:123',
                    publicKeyJwk: { kty: 'a' }
                })
                .addController(new Did('did:example:123'), true)
                .addAlsoKnownAs('AKA')
                .addKeyAgreementUnsafe(new Did('did:foo:bar'))
                .addAssertionMethod('did:example:123')
                .addAuthentication({
                    controller: 'did:me:123',
                    type: 'again-some-other-type',
                    id: 'did:cheese:bar'
                })
                .addCapabilityDelegation(
                    new VerificationMethod({
                        id: 'did:some:id',
                        type: 'some-type',
                        controller: 'did:me:duh'
                    })
                )
                .addCapabilityInvocationUnsafe('did:me:duh')
                .addAssertionMethod({
                    id: 'did:key:foobar',
                    type: 'a',
                    controller: 'did:example:123'
                })

            assert.deepStrictEqual(doc.toJSON(), {
                id: 'did:example:123',
                alsoKnownAs: ['AKA'],
                controller: ['did:example:123'],
                authentication: [
                    {
                        controller: 'did:me:123',
                        type: 'again-some-other-type',
                        id: 'did:cheese:bar'
                    }
                ],
                verificationMethod: [
                    {
                        id: 'did:example:123',
                        type: 'some-type',
                        controller: 'did:example:123',
                        publicKeyJwk: { kty: 'a' }
                    }
                ],
                assertionMethod: [
                    'did:example:123',
                    {
                        id: 'did:key:foobar',
                        type: 'a',
                        controller: 'did:example:123'
                    }
                ],
                keyAgreement: ['did:foo:bar'],
                capabilityInvocation: ['did:me:duh'],
                capabilityDelegation: [
                    {
                        id: 'did:some:id',
                        type: 'some-type',
                        controller: 'did:me:duh'
                    }
                ],
                service: [
                    {
                        id: 'some:uri',
                        type: ['a', 'b'],
                        serviceEndpoint: [
                            'https://google.com',
                            'https://github.com'
                        ]
                    }
                ]
            })
        })

        it('should error with duplicate ID in service', () => {
            assert.throws(
                () =>
                    new DidDocument({ id: 'did:foo:bar' })
                        .addService({
                            id: 'some:id',
                            type: 'some-type',
                            serviceEndpoint: 'https://github.com'
                        })
                        .addService({
                            id: 'some:id',
                            type: 'some-type',
                            serviceEndpoint: 'https://github.com'
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
                            controller: 'did:foo:bar'
                        })
                        .addAuthentication({
                            id: 'did:url:ref#1',
                            type: 'some-type',
                            controller: 'did:foo:bar'
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
                id: 'did:foo:bar'
            }).addAuthenticationUnsafe('did:example:key#01')

            assert.deepStrictEqual(doc.toJSON(), {
                id: 'did:foo:bar',
                authentication: ['did:example:key#01']
            })
        })
    })

    describe('Dereferencing to verification method', () => {
        it('should find correctly to the associated verification method', () => {
            const doc = new DidDocument({
                id: 'did:example:bar'
            }).addVerificationMethod({
                id: 'did:example:bar#01',
                type: 'some-type',
                controller: 'did:example:bar',
                publicKeyJwk: { kty: 'some-kty' }
            })

            assert.deepStrictEqual(
                doc
                    .findVerificationMethodByDidUrl('did:example:bar#01')
                    .toJSON(),
                {
                    id: 'did:example:bar#01',
                    type: 'some-type',
                    controller: 'did:example:bar',
                    publicKeyJwk: { kty: 'some-kty' }
                }
            )
        })

        it('should find safely to the associated verification method', () => {
            const doc = new DidDocument({
                id: 'did:example:bar'
            }).addVerificationMethod({
                id: 'did:example:bar#01',
                type: 'some-type',
                controller: 'did:example:bar',
                publicKeyJwk: { kty: 'some-kty' }
            })

            assert.deepStrictEqual(
                doc
                    .safeFindToVerificationMethodByDidUrl('did:example:bar#01')
                    ?.toJSON(),
                {
                    id: 'did:example:bar#01',
                    type: 'some-type',
                    controller: 'did:example:bar',
                    publicKeyJwk: { kty: 'some-kty' }
                }
            )
        })

        it('should find safely to undefined if the verification method does not exist', () => {
            const doc = new DidDocument({
                id: 'did:example:bar'
            })

            assert.strictEqual(
                doc.safeFindToVerificationMethodByDidUrl('did:example:bar#01'),
                undefined
            )
        })

        it('should not find if the verification method does not exist', () => {
            assert.throws(() => {
                const doc = new DidDocument({
                    id: 'did:example:bar'
                })
                doc.findVerificationMethodByDidUrl('did:example:bar#01')
            }, DidDocumentError)
        })
    })

    describe('Finding items in the did Document', () => {
        it('should find the service by type', () => {
            const doc = new DidDocument({ id: 'did:example:123' }).addService({
                id: 'did:example:123#service-1',
                type: 'some-type',
                serviceEndpoint: 'https://example.org'
            })

            assert.deepStrictEqual(
                doc.findServiceByType('some-type').toJSON(),
                {
                    id: 'did:example:123#service-1',
                    type: 'some-type',
                    serviceEndpoint: 'https://example.org'
                }
            )
        })

        it('should find the service by id', () => {
            const doc = new DidDocument({ id: 'did:example:123' }).addService({
                id: 'did:example:123#service-1',
                type: 'some-type',
                serviceEndpoint: 'https://example.org'
            })

            assert.deepStrictEqual(
                doc.findServiceById('did:example:123#service-1').toJSON(),
                {
                    id: 'did:example:123#service-1',
                    type: 'some-type',
                    serviceEndpoint: 'https://example.org'
                }
            )
        })

        it('should not find the service if the type does not exist', () => {
            const doc = new DidDocument({ id: 'did:example:123' }).addService({
                id: 'did:example:123#service-1',
                type: 'some-type',
                serviceEndpoint: 'https://example.org'
            })

            assert.throws(
                () => doc.findServiceByType('some-other-type'),
                DidDocumentError
            )
        })

        it('should not find the service if the id does not exist', () => {
            const doc = new DidDocument({ id: 'did:example:123' }).addService({
                id: 'did:example:123#service-1',
                type: 'some-type',
                serviceEndpoint: 'https://example.org'
            })

            assert.throws(
                () => doc.findServiceById('did:example:123#service-2'),
                DidDocumentError
            )
        })

        it('should find the verification method by purpose and type', () => {
            const doc = new DidDocument({
                id: 'did:example:123'
            }).addKeyAgreement({
                id: 'did:example:123#key-1',
                type: 'some-type',
                controller: 'did:example:123'
            })

            assert.deepStrictEqual(
                doc
                    .findVerificationMethodByTypeAndPurpose(
                        'some-type',
                        'keyAgreement'
                    )
                    .toJSON(),
                {
                    id: 'did:example:123#key-1',
                    type: 'some-type',
                    controller: 'did:example:123'
                }
            )
        })

        it('should find the verification method by purpose and type with reference', () => {
            const doc = new DidDocument({ id: 'did:example:123' })
                .addVerificationMethod({
                    id: 'did:example:123#key-1',
                    type: 'some-type',
                    controller: 'did:example:123'
                })
                .addKeyAgreement('did:example:123#key-1')

            assert.deepStrictEqual(
                doc
                    .findVerificationMethodByTypeAndPurpose(
                        'some-type',
                        'keyAgreement'
                    )
                    .toJSON(),
                {
                    id: 'did:example:123#key-1',
                    type: 'some-type',
                    controller: 'did:example:123'
                }
            )
        })

        it('should not find the verification method if the type does not exist', () => {
            const doc = new DidDocument({
                id: 'did:example:123'
            }).addVerificationMethod({
                id: 'did:example:123#key-1',
                type: 'some-type',
                controller: 'did:example:123'
            })

            assert.throws(
                () =>
                    doc.findVerificationMethodByTypeAndPurpose(
                        'some-other-type',
                        'verificationMethod'
                    ),
                DidDocumentError
            )
        })

        it('should not find the verification method if the purpose does not match', () => {
            const doc = new DidDocument({
                id: 'did:example:123'
            }).addCapabilityDelegation({
                id: 'did:example:123#key-1',
                type: 'some-type',
                controller: 'did:example:123'
            })

            assert.throws(
                () =>
                    doc.findVerificationMethodByTypeAndPurpose(
                        'some-type',
                        'keyAgreement'
                    ),
                DidDocumentError
            )
        })
    })

    describe('validate the registered types for verification methods and services', () => {
        it('should validate a correct type of a verification method by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                verificationMethod: [
                    {
                        id: 'did:example:123#key-1',
                        type: VerificationMethodTypes.JsonWebKey2020,
                        controller: 'did:example:123'
                    }
                ]
            })

            assert(
                doc.isVerificationMethodTypeRegistered('did:example:123#key-1')
            )
        })

        it('should validate an custom added type of a verification method by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                verificationMethod: [
                    {
                        id: 'did:example:123#key-1',
                        type: 'some-added-type',
                        controller: 'did:example:123'
                    }
                ]
            })

            assert(
                doc.isVerificationMethodTypeRegistered(
                    'did:example:123#key-1',
                    'some-added-type'
                )
            )
        })

        it('should not validate an incorrect type of a verification method by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                verificationMethod: [
                    {
                        id: 'did:example:123#key-1',
                        type: 'some-incorrect-type',
                        controller: 'did:example:123'
                    }
                ]
            })

            assert(
                doc.isVerificationMethodTypeRegistered(
                    'did:example:123#key-1'
                ) === false
            )
        })

        it('should validate a correct type of a service by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                service: [
                    {
                        id: 'did:example:some:id',
                        type: ServiceTypes.LinkedDomains,
                        serviceEndpoint: 'https://example.org'
                    }
                ]
            })

            assert(doc.isServiceTypeRegistered('did:example:some:id'))
        })

        it('should validate a correct type of a service by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                service: [
                    {
                        id: 'did:example:some:id',
                        type: 'some-added-type',
                        serviceEndpoint: 'https://example.org'
                    }
                ]
            })

            assert(
                doc.isServiceTypeRegistered(
                    'did:example:some:id',
                    'some-added-type'
                )
            )
        })

        it('should not validate an incorrect type of a service by id', () => {
            const doc = new DidDocument({
                id: 'did:example:123',
                service: [
                    {
                        id: 'did:example:some:id',
                        type: 'some-bad-type',
                        serviceEndpoint: 'https://example.org'
                    }
                ]
            })

            assert(doc.isServiceTypeRegistered('did:example:some:id') === false)
        })
    })
})
