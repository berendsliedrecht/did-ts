import { z } from 'zod'

export const publicKeyJwkSchema = z.object({
  kty: z.string(),
  use: z.optional(z.string()),
  crv: z.string(),
  key_ops: z.optional(z.string()),
  alg: z.optional(z.string()),
  kid: z.optional(z.string()),
  x5u: z.optional(z.string().url()),
  x5c: z.optional(z.array(z.string())),
  x5t: z.optional(z.string()),
  'x5t#S256': z.optional(z.string()),

  d: z.optional(z.undefined()),
})
