import type { Modify } from './utils'
import { verificationMethodSchema } from './schemas'
import { Did } from './did'
import { z } from 'zod'
import { PublicKeyJwk, PublicKeyJwkOptions } from './publicKeyJwk'
import {
  PublicKeyMultibaseOptions,
  PublicKeyMultibase,
} from './publicKeyMultibase'

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
  type: string
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
}
