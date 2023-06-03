import { z } from 'zod'
import { stringOrDid, stringOrDidUrl } from './didSchema'
import { publicKeyJwkSchema } from './publicKeyJwkSchema'
import { publicKeyMultibaseSchema } from './publicKeyMultibaseSchema'

export const verificationMethodSchema = z.object({
  id: stringOrDidUrl,
  controller: stringOrDid,
  type: z.string(),
  publicKeyJwk: z.optional(publicKeyJwkSchema),
  publicKeyMultibase: z.optional(publicKeyMultibaseSchema),
})

export const stringOrVerificationMethod = z.string().or(verificationMethodSchema)
