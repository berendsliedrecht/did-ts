import { z } from 'zod'
import { serviceSchema } from './schemas'

export type ServiceEndpointOptions = z.input<typeof serviceSchema> &
  Record<string, unknown>

export class ServiceEndpoint {
  public id: string
  public type: string | string[]
  public serviceEndpoint: string | string[] | Record<string, string>

  public constructor(options: ServiceEndpointOptions) {
    const { id, type, serviceEndpoint } = serviceSchema.parse(options)
    this.id = id
    this.type = type
    this.serviceEndpoint = serviceEndpoint
  }
}
