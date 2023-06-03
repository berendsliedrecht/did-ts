import { verificationMethodSchema } from './schemas'
import { Did } from './did'
import { z } from 'zod'
import { PublicKeyJwk, PublicKeyJwkOptions } from './publicKeyJwk'
import {
  PublicKeyMultibaseOptions,
  publicKeyMultibase,
} from './publicKeyMultibase'

export type VerificationMethodOptions = z.input<
  typeof verificationMethodSchema
> & {
  publicKeyJwk?: PublicKeyJwkOptions
  publicKeyMultibase?: PublicKeyMultibaseOptions
} & Record<string, unknown>

const x: VerificationMethodOptions = { id: 'a', controller: 'b', type: 'a',publicKeyBase58: 'he' }

export class VerificationMethod {
  id: Did
  controller: Did
  type: string
  publicKeyJwk?: PublicKeyJwk
  publicKeyMultibase?: publicKeyMultibase

  public constructor(options: VerificationMethodOptions) {
    const { id, controller, type, publicKeyJwk, publicKeyMultibase } =
      verificationMethodSchema.parse(options)

    this.id = id
    this.controller = controller
    this.type = type
    this.publicKeyJwk = publicKeyJwk
    this.publicKeyMultibase = publicKeyMultibase
  }
}
