import { PublicKeyJwk } from '../publicKeyJwk'
import { z } from 'zod'

export const publicKeyJwkSchema = z.union([
  z.object({
    kty: z.string(),
    use: z.optional(z.string()),
    crv: z.optional(z.string()),
    x: z.optional(z.string()),
    y: z.optional(z.string()),
    e: z.optional(z.string()),
    n: z.optional(z.string()),
    key_ops: z.optional(z.string()),
    alg: z.optional(z.string()),
    kid: z.optional(z.string()),

    d: z.optional(
      z.undefined({
        invalid_type_error:
          "'d' is not allowed to be supplied as it contains a private key material",
      })
    ),
  }),
  z.custom<PublicKeyJwk>(
    (publicKeyJwk) => publicKeyJwk instanceof PublicKeyJwk
  ),
])
