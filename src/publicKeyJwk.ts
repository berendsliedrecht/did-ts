import { publicKeyJwkSchema } from './schemas'
import { z } from 'zod'

export class PublicKeyJwk {
  public crv?: string
  public kty?: string
  public alg?: string
  public kid?: string
  public use?: string
  public keyOps?: string

  public constructor(options: z.infer<typeof publicKeyJwkSchema>) {
    const { crv, kty, alg, kid, use, key_ops } =
      publicKeyJwkSchema.parse(options)

    this.crv = crv
    this.kty = kty
    this.alg = alg
    this.kid = kid
    this.use = use
    this.keyOps = key_ops
  }
}
