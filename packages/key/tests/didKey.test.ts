import { DidKey } from '../src'
import { describe } from 'node:test'
import { multibaseKeys } from './fixtures/didKey'
import base58 from 'bs58'
import { VerificationMethodTypes } from 'did-core'

describe('did:key', () => {
    describe('should create did:key', () => {
        const key = base58.decode(multibaseKeys[0].slice(1))
        const { did, didDocument } = new DidKey().register({
            key,
            publicKeyFormat: VerificationMethodTypes.Ed25519VerificationKey2020
        })
        console.log(did)
        console.log(JSON.stringify(didDocument.toJSON()))
    })
})
