import { z } from 'zod'
import { stringOrDid, stringOrDidUrl } from './didSchema'
import { publicKeyJwkSchema } from './publicKeyJwkSchema'
import { publicKeyMultibaseSchema } from './publicKeyMultibaseSchema'
import { PublicKeyJwk } from '../publicKeyJwk'
import { PublicKeyMultibase } from '../publicKeyMultibase'
import { VerificationMethod } from '../verificationMethod'
import { Did } from '../did'

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

export const uniqueVerificationMethodsSchema = z
  .array(verificationMethodSchema)
  .refine((verificationMethods) => {
    const idSet = new Set()
    for (const obj of verificationMethods) {
      if (idSet.has(obj.id)) {
        return false
      }
      idSet.add(obj.id)
    }
    return true
  }, `Duplicate verificationMethod.id found. They must be unique`)

export const stringOrVerificationMethod = z
  .union([stringOrDidUrl, verificationMethodSchema])
  .transform((verificationMethod) => {
    if (verificationMethod instanceof Did) {
      return verificationMethod
    }
    return new VerificationMethod(verificationMethod)
  })

export const uniqueStringOrVerificationMethodsSchema = (name: string) =>
  z.array(stringOrVerificationMethod).refine((verificationMethods) => {
    const idSet = new Set()
    for (const obj of verificationMethods) {
      const id = obj instanceof Did ? obj.toUrl() : obj.id.toUrl()
      if (idSet.has(id)) {
        return false
      }
      idSet.add(id)
    }
    return true
  }, `Duplicate ${name}.id found. They must be unique`)
