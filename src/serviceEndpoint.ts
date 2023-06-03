import { z } from 'zod'
import { serviceSchema } from './schemas'

export class ServiceEndpoint {
  public id: string
  public type: string | string[]
  public serviceEndpoint: string | string[] | Record<string, string>

  public constructor(options: z.infer<typeof serviceSchema>) {
    const { id, type, serviceEndpoint } = serviceSchema.parse(options)
    this.id = id
    this.type = type
    this.serviceEndpoint = serviceEndpoint
  }
}
