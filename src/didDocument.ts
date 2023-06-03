import { z } from 'zod'
import { Did } from './did'
import { Service, ServiceOptions } from './service'
import {
  VerificationMethod,
  VerificationMethodOptions,
} from './verificationMethod'
import {
  didDocumentSchema,
  stringOrDid,
  uniqueServicesSchema,
  uniqueStringOrVerificationMethodsSchema,
  uniqueVerificationMethodsSchema,
} from './schemas'
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

type MakePropertyRequired<T, K extends keyof T> = T & Required<Pick<T, K>>
type ReturnBuilderWithAlsoKnownAs<T extends DidDocument> = MakePropertyRequired<
  T,
  'alsoKnownAs'
>
type ReturnBuilderWithController<T extends DidDocument> = MakePropertyRequired<
  T,
  'controller'
>
type ReturnBuilderWithVerificationMethod<T extends DidDocument> =
  MakePropertyRequired<T, 'verificationMethod'>
type ReturnBuilderWithAuthentication<T extends DidDocument> =
  MakePropertyRequired<T, 'authentication'>
type ReturnBuilderWithAssertionMethod<T extends DidDocument> =
  MakePropertyRequired<T, 'assertionMethod'>
type ReturnBuilderWithKeyAgreementMethod<T extends DidDocument> =
  MakePropertyRequired<T, 'keyAgreement'>
type ReturnBuilderWithCapabilityInvocation<T extends DidDocument> =
  MakePropertyRequired<T, 'capabilityInvocation'>
type ReturnBuilderWithCapabilityDelegation<T extends DidDocument> =
  MakePropertyRequired<T, 'capabilityDelegation'>
type ReturnBuilderWithService<T extends DidDocument> = MakePropertyRequired<
  T,
  'service'
>

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

  public addAlsoKnownAs(
    alsoKnownAs: string
  ): ReturnBuilderWithAlsoKnownAs<this> {
    if (this.alsoKnownAs) {
      this.alsoKnownAs.push(alsoKnownAs)
    } else {
      this.alsoKnownAs = [alsoKnownAs]
    }

    return this as ReturnBuilderWithAlsoKnownAs<this>
  }

  public addController(
    controller: string | Did,
    asArray = true
  ): ReturnBuilderWithController<this> {
    const instancedController =
      typeof controller === 'string' ? new Did(controller) : controller

    if (this.controller) {
      if (Array.isArray(this.controller)) {
        this.controller.push(instancedController)
      } else {
        this.controller = [this.controller, instancedController]
      }
    } else {
      this.controller = asArray ? [instancedController] : instancedController
    }

    return this as ReturnBuilderWithController<this>
  }

  public addVerificationMethod(
    verificationMethod: VerificationMethodOptions
  ): ReturnBuilderWithVerificationMethod<this> {
    if (this.verificationMethod) {
      this.verificationMethod.push(new VerificationMethod(verificationMethod))
    } else {
      this.verificationMethod = [new VerificationMethod(verificationMethod)]
    }

    uniqueVerificationMethodsSchema.parse(this.verificationMethod)

    return this as ReturnBuilderWithVerificationMethod<this>
  }

  public addAuthentication(
    verificationMethodOrString: VerificationMethodOptions | string
  ): ReturnBuilderWithAuthentication<this> {
    this.authentication = this.addVerificationMethodOrString(
      'authentication',
      this.authentication,
      verificationMethodOrString
    )

    return this as ReturnBuilderWithAuthentication<this>
  }

  public addKeyAgreement(
    verificationMethodOrString: VerificationMethodOptions | string
  ): ReturnBuilderWithKeyAgreementMethod<this> {
    this.keyAgreement = this.addVerificationMethodOrString(
      'keyAgreement',
      this.keyAgreement,
      verificationMethodOrString
    )

    return this as ReturnBuilderWithKeyAgreementMethod<this>
  }

  public addAssertionMethod(
    verificationMethodOrString: VerificationMethodOptions | string
  ): ReturnBuilderWithAssertionMethod<this> {
    this.assertionMethod = this.addVerificationMethodOrString(
      'assertionMethod',
      this.assertionMethod,
      verificationMethodOrString
    )

    return this as ReturnBuilderWithAssertionMethod<this>
  }

  public addCapabilityDelegation(
    verificationMethodOrString: VerificationMethodOptions | string
  ): ReturnBuilderWithCapabilityDelegation<this> {
    this.capabilityDelegation = this.addVerificationMethodOrString(
      'capabilityDelegation',
      this.capabilityDelegation,
      verificationMethodOrString
    )

    return this as ReturnBuilderWithCapabilityDelegation<this>
  }

  public addCapabilityInvocation(
    verificationMethodOrString: VerificationMethodOptions | string
  ): ReturnBuilderWithCapabilityInvocation<this> {
    this.capabilityInvocation = this.addVerificationMethodOrString(
      'capabilityInvocation',
      this.capabilityInvocation,
      verificationMethodOrString
    )

    return this as ReturnBuilderWithCapabilityInvocation<this>
  }

  public addService(service: ServiceOptions): ReturnBuilderWithService<this> {
    const instanceService = new Service(service)
    if (this.service) {
      this.service.push(instanceService)
    } else {
      this.service = [instanceService]
    }

    uniqueServicesSchema.parse(this.service)

    return this as ReturnBuilderWithService<this>
  }

  private addVerificationMethodOrString(
    fieldName: string,
    previousItem: Array<VerificationMethod | string> | undefined,
    verificationMethodOrString: VerificationMethodOptions | string
  ) {
    let newItem = previousItem
    if (typeof verificationMethodOrString === 'string') {
      if (newItem) {
        newItem.push(verificationMethodOrString)
      } else {
        newItem = [verificationMethodOrString]
      }
    } else {
      const vm = new VerificationMethod(verificationMethodOrString)
      if (newItem) {
        newItem.push(vm)
      } else {
        newItem = [vm]
      }
    }

    uniqueStringOrVerificationMethodsSchema(fieldName).parse(newItem)

    return newItem
  }

  public toJSON() {
    const { fullDocument, ...rest } = this

    return rest
  }
}
