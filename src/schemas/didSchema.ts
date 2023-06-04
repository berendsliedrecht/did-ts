import { DidError } from '../error'
import { Did } from '../did'
import { z } from 'zod'

const DID_URL_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*:(?:[a-z0-9]+(?:[._-][a-z0-9]+)*)?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i
const DID_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*(?:#[^s]*)?$/i

export const didUrlSchemaWithouttransformation = z
  .string()
  .regex(DID_URL_REGEXP, { message: 'Invalid did url syntax' })

export const didSchemaWithouttransformation = z
  .string()
  .regex(DID_REGEXP, { message: 'Invalid did syntax' })

export const stringOrDid = z
  .union([
    didSchemaWithouttransformation,
    z.custom<Did>((did) => did instanceof Did),
  ])
  .transform((did: string | Did): Did => {
    if (typeof did === 'string') {
      return new Did(did)
    } else if (did instanceof Did) {
      return did
    } else {
      throw new DidError(`id must be of type 'string' or an instance of 'Did'`)
    }
  })

export const stringOrDidUrl = z
  .union([
    didUrlSchemaWithouttransformation,
    z.custom<Did>((did) => did instanceof Did),
  ])
  .transform((did: string | Did): Did => {
    if (typeof did === 'string') {
      return new Did(did)
    } else if (did instanceof Did) {
      return did
    } else {
      throw new DidError(`id must be of type 'string' or an instance of 'Did'`)
    }
  })
