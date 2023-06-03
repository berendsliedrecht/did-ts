import { z } from 'zod'
import { stringOrDid } from './didSchema'
import {
  stringOrVerificationMethod,
  verificationMethodSchema,
} from './verificationMethodSchema'
import { serviceSchema } from './serviceSchema'
import { ServiceEndpoint } from '../serviceEndpoint'
import { Did } from '../did'

export const didDocumentSchema = z.object({
  id: stringOrDid,
  alsoKnownAs: z.optional(z.array(z.string().url())),
  controller: z.optional(z.union([stringOrDid, z.array(stringOrDid)])),
  verificationMethod: z.optional(z.array(verificationMethodSchema)),
  authentication: z.optional(z.array(stringOrVerificationMethod)),
  assertionMethod: z.optional(z.array(stringOrVerificationMethod)),
  keyAgreement: z.optional(z.array(stringOrVerificationMethod)),
  capabilityInvocation: z.optional(z.array(stringOrVerificationMethod)),
  capabilityDelegation: z.optional(z.array(stringOrVerificationMethod)),
  service: z.optional(z.array(serviceSchema)),
})
// .transform((document) => ({
//   ...document,
//   service: document.service?.map((s) => new ServiceEndpoint(s)),
// }))
