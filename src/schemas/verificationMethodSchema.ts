import { z } from 'zod'
import { stringOrDid, stringOrDidUrl } from './didSchema'
import { publicKeyJwkSchema } from './publicKeyJwkSchema'
import { publicKeyMultibaseSchema } from './publicKeyMultibaseSchema'
import { PublicKeyJwk } from '../publicKeyJwk'
import { PublicKeyMultibase } from '../publicKeyMultibase'
import { VerificationMethod } from '../verificationMethod'

export const verificationMethodSchema = z
  .union([
    z.object({
      id: stringOrDidUrl,
      controller: stringOrDid,
      type: z.string(),
      publicKeyJwk: z.optional(publicKeyJwkSchema),
      publicKeyMultibase: z.optional(publicKeyMultibaseSchema),
    }),
    z.custom<VerificationMethod>(
      (verificationMethod) => verificationMethod instanceof VerificationMethod
    ),
  ])
  .transform((verificationMethod) => ({
    id: verificationMethod.id,
    type: verificationMethod.type,
    controller: verificationMethod.controller,
    publicKeyJwk: verificationMethod.publicKeyJwk
      ? verificationMethod.publicKeyJwk instanceof PublicKeyJwk
        ? verificationMethod.publicKeyJwk
        : new PublicKeyJwk(verificationMethod.publicKeyJwk)
      : undefined,
    publicKeyMultibase: verificationMethod.publicKeyMultibase
      ? verificationMethod.publicKeyMultibase instanceof PublicKeyMultibase
        ? verificationMethod.publicKeyMultibase
        : new PublicKeyMultibase(verificationMethod.publicKeyMultibase)
      : undefined,
  }))

export const stringOrVerificationMethod = z
  .union([z.string(), verificationMethodSchema])
  .transform((verificationMethod) => {
    if (typeof verificationMethod === 'string') {
      return verificationMethod
    }
    return new VerificationMethod(verificationMethod)
  })
