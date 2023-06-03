import { Did } from './did'
import { VerificationMethodError } from './error'
import { Jwk } from './jwk'

export type VerificationMethodOptions = {
  id: Did | string
  controller: Did | string
  type: string
  publicKeyJwk?: Jwk
  publicKeyMultibase?: string
}

export class VerificationMethod {
  id: Did
  controller: Did
  type: string
  publicKeyJwk?: Jwk
  publicKeyMultibase?: string

  public constructor({
    id,
    type,
    controller,
    publicKeyJwk,
    publicKeyMultibase,
  }: VerificationMethodOptions) {
    if (typeof id === 'string') {
      this.id = new Did(id)
    } else if (id instanceof Did) {
      this.id = id
    } else {
      throw new VerificationMethodError(
        `id must be of type 'string' or an instance of 'Did'`
      )
    }

    if (typeof controller === 'string') {
      this.controller = new Did(controller)
    } else if (controller instanceof Did) {
      this.controller = controller
    } else {
      throw new VerificationMethodError(
        `controller must be of type 'string' or an instance of 'Did'`
      )
    }

    this.type = type
    this.publicKeyJwk = publicKeyJwk
    this.publicKeyMultibase = publicKeyMultibase
  }
}
