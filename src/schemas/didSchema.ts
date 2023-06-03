import { DidError } from '../error'
import { Did } from '../did'
import { z } from 'zod'

const DID_URL_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*:(?:[a-z0-9]+(?:[._-][a-z0-9]+)*)?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i
const DID_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*(?:#[^s]*)?$/i

export const stringOrDid = z
  .union([
    z.string().regex(DID_REGEXP),
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
    z.string().regex(DID_URL_REGEXP),
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
