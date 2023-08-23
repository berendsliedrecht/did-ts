import { z } from 'zod'
import { serviceSchema } from './schemas'
import { ServiceTypes } from './serviceTypes'

export type ServiceOptions = z.input<typeof serviceSchema> &
    Record<string, unknown>

export class Service {
    public fullService: ServiceOptions

    public id: string
    public type: ServiceTypes | string | Array<ServiceTypes | string>
    public serviceEndpoint: string | Array<string> | Record<string, string>

    public constructor(options: ServiceOptions) {
        this.fullService = options

        const { id, type, serviceEndpoint } = serviceSchema.parse(options)
        this.id = id
        this.type = type
        this.serviceEndpoint = serviceEndpoint
    }

    /**
     * Checks whether the service type is registered inside the @{link https://www.w3.org/TR/did-spec-registries/#service-types | service types}
     *
     */
    public isTypeInDidSpecRegistry(
        additionalAcceptedTypes: string | Array<string> = []
    ): boolean {
        const additionalAcceptedTypesArray =
            typeof additionalAcceptedTypes === 'string'
                ? [additionalAcceptedTypes]
                : additionalAcceptedTypes

        const allTypes = (Object.values(ServiceTypes) as Array<string>).concat(
            additionalAcceptedTypesArray
        )

        return typeof this.type === 'string'
            ? allTypes.includes(this.type)
            : this.type.every(allTypes.includes)
    }

    public toJSON() {
        const { fullService, ...rest } = this

        return rest
    }
}
