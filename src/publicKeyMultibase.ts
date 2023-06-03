import { publicKeyMultibaseSchema } from './schemas'
import { z } from 'zod'

export class publicKeyMultibase {
  public publicKeyMultibase: string

  public constructor(options: z.input<typeof publicKeyMultibaseSchema>) {
    const publicKeyMultibase = publicKeyMultibaseSchema.parse(options)
    this.publicKeyMultibase = publicKeyMultibase
  }
}
