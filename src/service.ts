import { z } from 'zod'
import { serviceSchema } from './schemas'

export type ServiceOptions = z.input<typeof serviceSchema> &
  Record<string, unknown>

export class Service {
  public fullService: ServiceOptions

  public id: string
  public type: string | string[]
  public serviceEndpoint: string | string[] | Record<string, string>

  public constructor(options: ServiceOptions) {
    this.fullService = options

    const { id, type, serviceEndpoint } = serviceSchema.parse(options)
    this.id = id
    this.type = type
    this.serviceEndpoint = serviceEndpoint
  }
}
