import { publicKeyJwkSchema } from './schemas'
import { z } from 'zod'

export type PublicKeyJwkOptions = z.input<typeof publicKeyJwkSchema> &
    Record<string, unknown>

export class PublicKeyJwk {
    public fullPublicKeyJwk: PublicKeyJwkOptions

    public constructor(options: PublicKeyJwkOptions) {
        this.fullPublicKeyJwk = options
        publicKeyJwkSchema.parse(options)
    }

    public toJSON() {
        const { fullPublicKeyJwk, ...rest } = this.fullPublicKeyJwk
        return rest
    }
}
