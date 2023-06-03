import { z } from 'zod'
import { stringOrDid } from './didSchema'
import {
  uniqueStringOrVerificationMethodsSchema,
  verificationMethodSchema,
} from './verificationMethodSchema'
import { uniqueServicesSchema } from './serviceSchema'
import { Service } from '../service'
import { VerificationMethod } from '../verificationMethod'

export const didDocumentSchema = z
  .object({
    id: stringOrDid,
    alsoKnownAs: z.optional(z.array(z.string().url())),
    controller: z.optional(z.union([stringOrDid, z.array(stringOrDid)])),
    verificationMethod: z.optional(z.array(verificationMethodSchema)),
    authentication: z.optional(
      uniqueStringOrVerificationMethodsSchema('authentication')
    ),
    assertionMethod: z.optional(
      uniqueStringOrVerificationMethodsSchema('assertionMethod')
    ),
    keyAgreement: z.optional(
      uniqueStringOrVerificationMethodsSchema('keyAgreement')
    ),
    capabilityInvocation: z.optional(
      uniqueStringOrVerificationMethodsSchema('capabilityInvocation')
    ),
    capabilityDelegation: z.optional(
      uniqueStringOrVerificationMethodsSchema('capabilityInvocation')
    ),
    service: z.optional(uniqueServicesSchema),
  })
  .transform((didDocument) => ({
    ...didDocument,
    service: didDocument.service?.map((s) => new Service(s)),
    verificationMethod: didDocument.verificationMethod?.map(
      (v) => new VerificationMethod(v)
    ),
  }))
