import { publicKeyJwkSchema } from './schemas'
import { z } from 'zod'

export type PublicKeyJwkOptions = z.input<typeof publicKeyJwkSchema> &
  Record<string, unknown>

export class PublicKeyJwk {
  public properties: PublicKeyJwkOptions

  public constructor(options: PublicKeyJwkOptions) {
    const properties = publicKeyJwkSchema.parse(options)
    this.properties = properties
  }
}
