import { publicKeyJwkSchema } from './schemas'
import { z } from 'zod'

export class PublicKeyJwk {
  public properties: z.infer<typeof publicKeyJwkSchema>

  public constructor(options: z.input<typeof publicKeyJwkSchema>) {
    const properties = publicKeyJwkSchema.parse(options)
    this.properties = properties
  }
}
