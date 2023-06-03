import { z } from 'zod'
import { stringOrDid } from './didSchema'
import { publicKeyJwkSchema } from './publicKeyJwkSchema'
import { publicKeyMultibaseSchema } from './publicKeyMultibaseSchema'
import { PublicKeyJwk } from '../publicKeyJwk'
import { publicKeyMultibase } from '../publicKeyMultibase'
import { VerificationMethod } from '../verificationMethod'

export const verificationMethodSchema = z
  .object({
    id: stringOrDid,
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

export const stringOrVerificationMethod = z
  .string()
  .or(verificationMethodSchema)
  .transform((verificationMethod) => {
    if (typeof verificationMethod === 'string') {
      return verificationMethod
    }
    return new VerificationMethod(verificationMethod)
  })
