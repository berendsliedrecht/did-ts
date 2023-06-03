import { z } from 'zod'
import { Did } from './did'
import { ServiceEndpoint, ServiceEndpointOptions } from './serviceEndpoint'
import {
  VerificationMethod,
  VerificationMethodOptions,
} from './verificationMethod'
import { didDocumentSchema, stringOrDid } from './schemas'
import { DidDocumentError } from './error'

type StringOrVerificationMethodArray = Array<string | VerificationMethodOptions>

export type DidDocumentOptions = z.input<typeof didDocumentSchema> & {
  verificationMethod?: Array<VerificationMethodOptions>
  authentication?: StringOrVerificationMethodArray
  assertionMethod?: StringOrVerificationMethodArray
  keyAgreement?: StringOrVerificationMethodArray
  capabilityInvocation?: StringOrVerificationMethodArray
  capabilityDelegation?: StringOrVerificationMethodArray
  service?: Array<ServiceEndpointOptions>
} & Record<string, unknown>

export class DidDocument {
  public id: Did
  public alsoKnownAs?: Array<string>
  public controller?: Did | Array<Did>
  public verificationMethod?: Array<VerificationMethod>
  public authentication?: Array<VerificationMethod | string>
  public assertionMethod?: Array<VerificationMethod | string>
  public keyAgreement?: Array<VerificationMethod | string>
  public capabilityInvocation?: Array<VerificationMethod | string>
  public capabilityDelegation?: Array<VerificationMethod | string>
  public service?: Array<ServiceEndpoint>

  public constructor(options: DidDocumentOptions) {
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

  public dereferenceToVerificationMethod(didUrl: z.input<typeof stringOrDid>) {
    const did = stringOrDid.parse(didUrl)

    const verificationMethod = this.verificationMethod?.find(
      (verificationMethod) => verificationMethod.id.did === did.did
    )

    if (!verificationMethod) {
      throw new DidDocumentError(
        `Verification method for did '${did}' not found`
      )
    }
  }

  public safeDereferenceToVerificationMethod(
    didUrl: z.input<typeof stringOrDid>
  ) {
    try {
      return this.dereferenceToVerificationMethod(didUrl)
    } catch {
      return undefined
    }
  }
}
