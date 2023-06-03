import { z } from 'zod'
import { stringOrDid } from './didSchema'
import {
  stringOrVerificationMethod,
  verificationMethodSchema,
} from './verificationMethodSchema'
import { serviceSchema } from './serviceSchema'

export const didDocumentSchema = z.object({
  id: stringOrDid,
  alsoKnownAs: z.optional(z.array(z.string().url())),
  controller: z.optional(stringOrDid.or(z.array(stringOrDid))),
  verificationMethod: z.optional(verificationMethodSchema),
  authentication: z.optional(stringOrVerificationMethod),
  assetionMethod: z.optional(stringOrVerificationMethod),
  keyAgreement: z.optional(stringOrVerificationMethod),
  capabilityInvocation: z.optional(stringOrVerificationMethod),
  capabilityDelegation: z.optional(stringOrVerificationMethod),
  service: z.optional(serviceSchema),
})
