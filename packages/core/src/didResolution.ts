import { Impossible, OrPromise } from './types'
import { DidDocument, DidDocumentOptions } from './didDocument'
import { Did } from './did'

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

export type DidResolutionResolveOptions<
    AdditionalOptions extends Record<string, unknown> = {}
> = Impossible<ResolutionOptions<AdditionalOptions>, 'accept'>

export type DidResolutionResolveResult<
    AdditionalDidResolutionMetadata extends Record<string, unknown> = {},
    AdditionalDidDocument extends Record<string, unknown> = {},
    AdditionalDidDocumentMetadata extends Record<string, unknown> = {}
> = OrPromise<{
    didDocument: DidDocumentOptions<AdditionalDidDocument> | DidDocument
    didResolutionMetadata: Impossible<
        DidResolutionMetadata<AdditionalDidResolutionMetadata>,
        'contentType'
    >
    didDocumentMetadata: DidDocumentMetadata<AdditionalDidDocumentMetadata>
}>

export type DidResolutionResolvePresentationOptions<
    AdditionalOptions extends Record<string, unknown> = {}
> = ResolutionOptions<AdditionalOptions>

export type DidResolutionResolvePresentationResult<
    AdditionalDidResolutionMetadata extends Record<string, unknown> = {},
    AdditionalDidDocumentMetadata extends Record<string, unknown> = {}
> = OrPromise<{
    didResolutionMetadata: DidResolutionMetadata<AdditionalDidResolutionMetadata>
    didDocumentStream: Uint8Array
    didDocumentMetadata: DidDocumentMetadata<AdditionalDidDocumentMetadata>
}>

export interface DidResolution<
    AdditionalOptions extends Record<string, unknown> = {},
    AdditionalDidResolutionMetadata extends Record<string, unknown> = {},
    AdditionalDidDocument extends Record<string, unknown> = {},
    AdditionalDidDocumentMetadata extends Record<string, unknown> = {}
> {
    resolve(
        did: string,
        resolutionOptions?: DidResolutionResolveOptions<AdditionalOptions>
    ): DidResolutionResolveResult<
        AdditionalDidResolutionMetadata,
        AdditionalDidDocument,
        AdditionalDidDocumentMetadata
    >

    resolvePresentation(
        did: string,
        resolutionOptions?: DidResolutionResolvePresentationOptions
    ): DidResolutionResolvePresentationResult<
        AdditionalDidResolutionMetadata,
        AdditionalDidDocumentMetadata
    >
}

export type DidRegistrationRegisterResult = {
    did: Did
    didDocument: DidDocument
}

export interface DidRegistration<
    DidRegistrationOptions extends Record<string, unknown> = {}
> {
    register(options: DidRegistrationOptions): DidRegistrationRegisterResult
}
