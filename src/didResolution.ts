import { Impossible, OrPromise } from './types'
import { DidDocumentOptions } from './didDocument'

export type ResolutionOptions<T extends Record<string, unknown>> = {
  accept: string
} & T

export type DidResolutionMetadata<T extends Record<string, unknown>> = {
  contentType: string
  error?: 'invalidDid' | 'notFound' | 'representationNotSupported' | string
} & T

// resolveRepresentation(did, resolutionOptions) →
// « didResolutionMetadata, didDocumentStream, didDocumentMetadata »
export type DidDocumentMetadata<T extends Record<string, unknown>> = {
  created?: string
  updated?: string
  deactivated?: string
  nextUpdate?: string
  versionId?: string
  equivalentId?: Array<string>
  canonicalId?: string
} & T

export interface DidResolution<
  AdditionalOptions extends Record<string, unknown> = {},
  AdditionalDidResolutionMetadata extends Record<string, unknown> = {},
  AdditionalDidDocument extends Record<string, unknown> = {},
  AdditionalDidDocumentMetadata extends Record<string, unknown> = {}
> {
  resolve(
    did: string,
    resolutionOptions?: Impossible<
      ResolutionOptions<AdditionalOptions>,
      'accept'
    >
  ): OrPromise<{
    didResolutionMetadata: Impossible<
      DidResolutionMetadata<AdditionalDidResolutionMetadata>,
      'contentType'
    >
    didDocument: DidDocumentOptions<AdditionalDidDocument>
    didDocumentMetadata: DidDocumentMetadata<AdditionalDidDocumentMetadata>
  }>

  resolvePresentation(
    did: string,
    resolutionOptions?: ResolutionOptions<AdditionalOptions>
  ): OrPromise<{
    didResolutionMetadata: DidResolutionMetadata<AdditionalDidResolutionMetadata>
    didDocumentStream: Uint8Array
    didDocumentMetadata: DidDocumentMetadata<AdditionalDidDocumentMetadata>
  }>
}
