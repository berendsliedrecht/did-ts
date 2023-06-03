import { z } from 'zod'
import { stringOrDid } from './didSchema'
import {
  stringOrVerificationMethod,
  verificationMethodSchema,
} from './verificationMethodSchema'
import { serviceSchema } from './serviceSchema'
import { Service } from '../service'
import { VerificationMethod } from '../verificationMethod'

export const didDocumentSchema = z
  .object({
    id: stringOrDid,
    alsoKnownAs: z.optional(z.array(z.string().url())),
    controller: z.optional(z.union([stringOrDid, z.array(stringOrDid)])),
    verificationMethod: z.optional(z.array(verificationMethodSchema)),
    authentication: z.optional(z.array(stringOrVerificationMethod)),
    assertionMethod: z.optional(z.array(stringOrVerificationMethod)),
    keyAgreement: z.optional(z.array(stringOrVerificationMethod)),
    capabilityInvocation: z.optional(z.array(stringOrVerificationMethod)),
    capabilityDelegation: z.optional(z.array(stringOrVerificationMethod)),
    service: z.optional(
      z.array(serviceSchema).refine((services) => {
        const idSet = new Set()
        for (const obj of services) {
          if (idSet.has(obj.id)) {
            return false
          }
          idSet.add(obj.id)
        }
        return true
      }, 'Duplicate service.id found. They must be unique')
    ),
  })
  .transform((didDocument) => ({
    ...didDocument,
    service: didDocument.service?.map((s) => new Service(s)),
    verificationMethod: didDocument.verificationMethod?.map(
      (v) => new VerificationMethod(v)
    ),
  }))
