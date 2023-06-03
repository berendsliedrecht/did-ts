import { publicKeyMultibaseSchema } from './schemas'
import { z } from 'zod'

export type PublicKeyMultibaseOptions = z.input<typeof publicKeyMultibaseSchema>

export class PublicKeyMultibase {
  public publicKeyMultibase: PublicKeyMultibaseOptions
  public properties: PublicKeyMultibaseOptions

  public constructor(options: PublicKeyMultibaseOptions) {
    this.publicKeyMultibase = options
    this.properties = publicKeyMultibaseSchema.parse(options)
  }
}
