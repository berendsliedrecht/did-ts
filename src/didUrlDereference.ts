import { OrPromise } from './types'

export type DereferenceOptions<T extends Record<string, unknown>> = {
  accept?: string
} & T

export type DereferencingMetadata<T extends Record<string, unknown>> = {
  contentType?: string
  error?: 'invalidDidUrl' | 'notFound' | string
} & T

export interface DidUrlDereference<
  AdditionalDereferenceOptions extends Record<string, unknown> = {},
  AdditionalDereferencingMetadata extends Record<string, unknown> = {},
  ContentStream = unknown,
  ContentMetadata extends Record<string, unknown> = {},
> {
  dereference(
    didUrl: string,
    dereferenceOptions: DereferenceOptions<AdditionalDereferenceOptions>,
  ): OrPromise<{
    dereferencingMetadata: DereferencingMetadata<AdditionalDereferencingMetadata>
    contentStream?: ContentStream
    contentMetadata: ContentMetadata
  }>
}
