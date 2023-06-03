import { verificationMethodSchema } from './schemas'
import { Did } from './did'
import { z } from 'zod'
import { PublicKeyJwk } from './publicKeyJwk'
import { publicKeyMultibase } from './publicKeyMultibase'

export class VerificationMethod {
  id: Did
  controller: Did
  type: string
  publicKeyJwk?: PublicKeyJwk
  publicKeyMultibase?: publicKeyMultibase

  public constructor(options: z.infer<typeof verificationMethodSchema>) {
    const { id, controller, type, publicKeyJwk, publicKeyMultibase } =
      verificationMethodSchema.parse(options)

    this.id = id
    this.controller = controller
    this.type = type
    this.publicKeyJwk = publicKeyJwk
    this.publicKeyMultibase = publicKeyMultibase
  }
}
