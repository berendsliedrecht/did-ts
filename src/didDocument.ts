import { z } from 'zod'
import { Did } from './did'
import { Service, ServiceOptions } from './service'
import {
  VerificationMethod,
  VerificationMethodOptions,
} from './verificationMethod'
import { didDocumentSchema, stringOrDid } from './schemas'
import { DidDocumentError } from './error'
import { Modify } from './utils'

type StringOrVerificationMethodArray = Array<
  string | VerificationMethodOptions | VerificationMethod
>

export type DidDocumentOptions = Modify<
  z.input<typeof didDocumentSchema>,
  {
    verificationMethod?: Array<VerificationMethodOptions>
    authentication?: StringOrVerificationMethodArray
    assertionMethod?: StringOrVerificationMethodArray
    keyAgreement?: StringOrVerificationMethodArray
    capabilityInvocation?: StringOrVerificationMethodArray
    capabilityDelegation?: StringOrVerificationMethodArray
    service?: Array<ServiceOptions | Service>
  }
> &
  Record<string, unknown>

export class DidDocument {
  public fullDocument: DidDocumentOptions

  public id: Did
  public alsoKnownAs?: Array<string>
  public controller?: Did | Array<Did>
  public verificationMethod?: Array<VerificationMethod>
  public authentication?: Array<VerificationMethod | string>
  public assertionMethod?: Array<VerificationMethod | string>
  public keyAgreement?: Array<VerificationMethod | string>
  public capabilityInvocation?: Array<VerificationMethod | string>
  public capabilityDelegation?: Array<VerificationMethod | string>
  public service?: Array<Service>

  public constructor(options: DidDocumentOptions) {
    this.fullDocument = options
    const parsed = didDocumentSchema.parse(options)

    this.id = parsed.id
    this.alsoKnownAs = parsed.alsoKnownAs
    this.controller = parsed.controller
    this.verificationMethod = parsed.verificationMethod
    this.authentication = parsed.authentication
    this.assertionMethod = parsed.assertionMethod
    this.keyAgreement = parsed.keyAgreement
    this.capabilityDelegation = parsed.capabilityDelegation
    this.capabilityInvocation = parsed.capabilityInvocation
    this.service = parsed.service
  }

  public dereferenceToVerificationMethod(didUrl: z.input<typeof stringOrDid>) {
    const did = stringOrDid.parse(didUrl)

    const verificationMethod = this.verificationMethod?.find(
      (verificationMethod) => verificationMethod.id.did === did.toString()
    )

    if (!verificationMethod) {
      throw new DidDocumentError(
        `Verification method for did '${did.toString()}' not found`
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
