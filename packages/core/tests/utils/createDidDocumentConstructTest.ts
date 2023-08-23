import { DidDocument, DidDocumentOptions } from '../../src'
import assert from 'node:assert'
import { it } from 'node:test'

export const createDidDocumentConstructTest = (
    didDocument: DidDocumentOptions
) =>
    it(`should construct the did document for ${didDocument.id}`, () => {
        const instance = new DidDocument(didDocument)
        assert.strictEqual(instance.id.toString(), didDocument.id)
    })
