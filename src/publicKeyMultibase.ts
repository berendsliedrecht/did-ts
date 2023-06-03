import { publicKeyMultibaseSchema } from './schemas'
import { z } from 'zod'

export type PublicKeyMultibaseOptions = z.input<typeof publicKeyMultibaseSchema>

export class publicKeyMultibase {
  public publicKeyMultibase: string

  public constructor(options: PublicKeyMultibaseOptions) {
    const publicKeyMultibase = publicKeyMultibaseSchema.parse(options)
    this.publicKeyMultibase = publicKeyMultibase
  }
}
