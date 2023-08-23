import type { Modify } from './types'
import { verificationMethodSchema } from './schemas'
import { Did } from './did'
import { z } from 'zod'
import { PublicKeyJwk, PublicKeyJwkOptions } from './publicKeyJwk'
import {
    PublicKeyMultibaseOptions,
    PublicKeyMultibase
} from './publicKeyMultibase'
import { VerificationMethodTypes } from './verificationMethodTypes'

export type VerificationMethodOptions = Modify<
    z.input<typeof verificationMethodSchema>,
    {
        publicKeyJwk?: PublicKeyJwkOptions | PublicKeyJwk
        publicKeyMultibase?: PublicKeyMultibaseOptions | PublicKeyMultibase
    }
> &
    Record<string, unknown>

export class VerificationMethod {
    public fullVerificationMethod: VerificationMethodOptions

    id: Did
    controller: Did
    type: VerificationMethodTypes | string
    publicKeyJwk?: PublicKeyJwk
    publicKeyMultibase?: PublicKeyMultibase

    public constructor(options: VerificationMethodOptions) {
        this.fullVerificationMethod = options

        const { id, controller, type, publicKeyJwk, publicKeyMultibase } =
            verificationMethodSchema.parse(options)

        this.id = id
        this.controller = controller
        this.type = type
        this.publicKeyJwk = publicKeyJwk
        this.publicKeyMultibase = publicKeyMultibase
    }

    /**
     * Checks whether the verification method type is registered inside the @{link https://www.w3.org/TR/did-spec-registries/#verification-method-types | verification method types}
     *
     */
    public isTypeInDidSpecRegistry(
        additionalAcceptedTypes: string | Array<string> = []
    ): boolean {
        const additionalAcceptedTypesArray =
            typeof additionalAcceptedTypes === 'string'
                ? [additionalAcceptedTypes]
                : additionalAcceptedTypes

        const allTypes = (
            Object.values(VerificationMethodTypes) as Array<string>
        ).concat(additionalAcceptedTypesArray)

        return allTypes.includes(this.type)
    }

    public toJSON() {
        const mappedRest = {
            id: this.id.toJSON(),
            controller: this.controller.toJSON(),
            type: this.type,
            publicKeyJwk: this.publicKeyJwk?.toJSON(),
            publicKeyMultibase: this.publicKeyMultibase?.toJSON()
        }
        const cleanedRest = Object.fromEntries(
            Object.entries(mappedRest).filter(
                ([_, value]) => value !== undefined
            )
        )

        return cleanedRest
    }
}
