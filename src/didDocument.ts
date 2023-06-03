import { z } from 'zod'
import { Did } from './did'
import { ServiceEndpoint } from './serviceEndpoint'
import { VerificationMethod } from './verificationMethod'
import { didDocumentSchema } from './schemas'

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

  public constructor(options: z.infer<typeof didDocumentSchema>) {
    const {
      id,
      service,
      capabilityDelegation,
      capabilityInvocation,
      keyAgreement,
      authentication,
      verificationMethod,
      controller,
      alsoKnownAs,
      assertionMethod,
    } = didDocumentSchema.parse(options)

    this.id = id
    this.alsoKnownAs = alsoKnownAs
    this.controller = controller
    this.verificationMethod = verificationMethod
    this.authentication = authentication
    this.assertionMethod = assertionMethod
    this.keyAgreement = keyAgreement
    this.service = service
    this.capabilityDelegation = capabilityDelegation
    this.capabilityInvocation = capabilityInvocation
  }
}
