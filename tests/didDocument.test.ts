import { describe, it } from 'node:test'
import { DID_DOCUMENTS } from './fixtures/didDocuments'
import assert from 'node:assert'
import { createDidDocumentConstructTest } from './utils/createDidDocumentConstructTest'

describe('Did Document', () => {
  DID_DOCUMENTS.map(createDidDocumentConstructTest)
})
