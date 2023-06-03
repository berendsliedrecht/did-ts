import { z } from 'zod'
import { stringOrDid, stringOrDidUrl } from './didSchema'
import { publicKeyJwkSchema } from './publicKeyJwkSchema'
import { publicKeyMultibaseSchema } from './publicKeyMultibaseSchema'
import { PublicKeyJwk } from '../publicKeyJwk'
import { publicKeyMultibase } from '../publicKeyMultibase'

export const verificationMethodSchema = z
  .object({
    id: stringOrDidUrl,
    controller: stringOrDid,
    type: z.string(),
    publicKeyJwk: z.optional(publicKeyJwkSchema),
    publicKeyMultibase: z.optional(publicKeyMultibaseSchema),
  })
  .transform((verificationMethod) => ({
    ...verificationMethod,
    publicKeyJwk: verificationMethod.publicKeyJwk
      ? new PublicKeyJwk(verificationMethod.publicKeyJwk)
      : undefined,
    publicKeyMultibase: verificationMethod.publicKeyMultibase
      ? new publicKeyMultibase(verificationMethod.publicKeyMultibase)
      : undefined,
  }))

export const stringOrVerificationMethod = z.union([
  z.string(),
  verificationMethodSchema,
])
