import { Did } from 'did'
import { DidDocumentError } from 'error'
import { ServiceEndpoint } from 'serviceEndpoint'
import { VerificationMethod } from 'verificationMethod'

export type DidDocumentOptions = {
  id: Did
  alsoKnownAs?: Array<string>
  controller?: string | Array<Did>
  verificationMethod?: Array<VerificationMethod>
  authentication?: Array<VerificationMethod | string>
  assertionMethod?: Array<VerificationMethod | string>
  keyAgreement?: Array<VerificationMethod | string>
  capabilityInvocation?: Array<VerificationMethod | string>
  capabilityDelegation?: Array<VerificationMethod | string>
  service?: Array<ServiceEndpoint>
}

export class DidDocument {
  private id: Did
  private alsoKnownAs?: Array<string>
  private controller?: string | Did | Array<Did | string>
  private verificationMethod?: Array<VerificationMethod>
  private authentication?: Array<VerificationMethod | string>
  private assertionMethod?: Array<VerificationMethod | string>
  private keyAgreement?: Array<VerificationMethod | string>
  private capabilityInvocation?: Array<VerificationMethod | string>
  private capabilityDelegation?: Array<VerificationMethod | string>
  private service?: Array<ServiceEndpoint>

  public constructor({
    id,
    alsoKnownAs,
    controller,
    verificationMethod,
    authentication,
    assertionMethod,
    keyAgreement,
    capabilityInvocation,
    capabilityDelegation,
    service,
  }: DidDocumentOptions) {
    if (typeof id === 'string') {
      this.id = new Did(id)
    } else if (id instanceof Did) {
      this.id = id
    } else {
      throw new DidDocumentError(
        `id must be of type 'string' or an instance of 'Did'`
      )
    }

    this.alsoKnownAs = alsoKnownAs
    this.controller = controller
    this.verificationMethod = verificationMethod
    this.authentication = authentication
    this.assertionMethod = assertionMethod
    this.keyAgreement = keyAgreement
    this.capabilityInvocation = capabilityInvocation
    this.capabilityDelegation = capabilityDelegation
    this.service = service
  }
}
