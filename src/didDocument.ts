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
import { MakePropertyRequired, Modify } from './types'

type DidOrVerificationMethodArray = Array<VerificationMethodOrDidOrString>

type VerificationMethodOrDidOrString =
  | VerificationMethod
  | VerificationMethodOptions
  | Did
  | string

export type DidDocumentOptions<T extends Record<string, unknown> = {}> = Modify<
  z.input<typeof didDocumentSchema>,
  {
    verificationMethod?: Array<VerificationMethodOptions>
    authentication?: DidOrVerificationMethodArray
    assertionMethod?: DidOrVerificationMethodArray
    keyAgreement?: DidOrVerificationMethodArray
    capabilityInvocation?: DidOrVerificationMethodArray
    capabilityDelegation?: DidOrVerificationMethodArray
    service?: Array<ServiceOptions | Service>
  }
> &
  Record<string, unknown> &
  T

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
  public authentication?: Array<VerificationMethod | Did>
  public assertionMethod?: Array<VerificationMethod | Did>
  public keyAgreement?: Array<VerificationMethod | Did>
  public capabilityInvocation?: Array<VerificationMethod | Did>
  public capabilityDelegation?: Array<VerificationMethod | Did>
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

  public findVerificationMethodByDidUrl(didUrl: z.input<typeof stringOrDid>) {
    const did = stringOrDid.parse(didUrl)

    const verificationMethod = this.verificationMethod?.find(
      (verificationMethod) => verificationMethod.id.toUrl() === did.toUrl(),
    )

    if (!verificationMethod) {
      throw new DidDocumentError(
        `Verification method for did '${did.toString()}' not found`,
      )
    }

    return verificationMethod
  }

  public safeFindToVerificationMethodByDidUrl(
    didUrl: z.input<typeof stringOrDid>,
  ) {
    try {
      return this.findVerificationMethodByDidUrl(didUrl)
    } catch {
      return undefined
    }
  }

  public addAlsoKnownAs(
    alsoKnownAs: string,
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
    asArray = true,
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
    verificationMethod: VerificationMethodOptions,
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
    verificationMethodOrDidOrString: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithAuthentication<this> {
    this.authentication = this.addVerificationMethodOrDidOrString(
      'authentication',
      this.authentication,
      verificationMethodOrDidOrString,
    )

    return this as ReturnBuilderWithAuthentication<this>
  }

  public addAuthenticationUnsafe(
    verificationMethodOrDidOrString: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithAuthentication<this> {
    this.authentication = this.addVerificationMethodOrDidOrString(
      'authentication',
      this.authentication,
      verificationMethodOrDidOrString,
      true,
    )

    return this as ReturnBuilderWithAuthentication<this>
  }

  public addKeyAgreement(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithKeyAgreementMethod<this> {
    this.keyAgreement = this.addVerificationMethodOrDidOrString(
      'keyAgreement',
      this.keyAgreement,
      verificationMethodOrStringOrDid,
    )

    return this as ReturnBuilderWithKeyAgreementMethod<this>
  }

  public addKeyAgreementUnsafe(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithKeyAgreementMethod<this> {
    this.keyAgreement = this.addVerificationMethodOrDidOrString(
      'keyAgreement',
      this.keyAgreement,
      verificationMethodOrStringOrDid,
      true,
    )

    return this as ReturnBuilderWithKeyAgreementMethod<this>
  }

  public addAssertionMethod(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithAssertionMethod<this> {
    this.assertionMethod = this.addVerificationMethodOrDidOrString(
      'assertionMethod',
      this.assertionMethod,
      verificationMethodOrStringOrDid,
    )

    return this as ReturnBuilderWithAssertionMethod<this>
  }

  public addAssertionMethodUnsafe(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithAssertionMethod<this> {
    this.assertionMethod = this.addVerificationMethodOrDidOrString(
      'assertionMethod',
      this.assertionMethod,
      verificationMethodOrStringOrDid,
      true,
    )

    return this as ReturnBuilderWithAssertionMethod<this>
  }

  public addCapabilityDelegation(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithCapabilityDelegation<this> {
    this.capabilityDelegation = this.addVerificationMethodOrDidOrString(
      'capabilityDelegation',
      this.capabilityDelegation,
      verificationMethodOrStringOrDid,
    )

    return this as ReturnBuilderWithCapabilityDelegation<this>
  }

  public addCapabilityDelegationUnsafe(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithCapabilityDelegation<this> {
    this.capabilityDelegation = this.addVerificationMethodOrDidOrString(
      'capabilityDelegation',
      this.capabilityDelegation,
      verificationMethodOrStringOrDid,
      true,
    )

    return this as ReturnBuilderWithCapabilityDelegation<this>
  }

  public addCapabilityInvocation(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithCapabilityInvocation<this> {
    this.capabilityInvocation = this.addVerificationMethodOrDidOrString(
      'capabilityInvocation',
      this.capabilityInvocation,
      verificationMethodOrStringOrDid,
    )

    return this as ReturnBuilderWithCapabilityInvocation<this>
  }

  public addCapabilityInvocationUnsafe(
    verificationMethodOrStringOrDid: VerificationMethodOrDidOrString,
  ): ReturnBuilderWithCapabilityInvocation<this> {
    this.capabilityInvocation = this.addVerificationMethodOrDidOrString(
      'capabilityInvocation',
      this.capabilityInvocation,
      verificationMethodOrStringOrDid,
      true,
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

  private addVerificationMethodOrDidOrString(
    fieldName: string,
    previousItem: Array<VerificationMethod | Did> | undefined,
    verificationMethodOrDidOrString: VerificationMethodOrDidOrString,
    unsafe = false,
  ) {
    let newItem = previousItem

    const id =
      verificationMethodOrDidOrString instanceof Did
        ? verificationMethodOrDidOrString
        : typeof verificationMethodOrDidOrString === 'string'
        ? new Did(verificationMethodOrDidOrString)
        : undefined

    if (id && !unsafe) {
      const verificationMethodIds = this.verificationMethod?.map((vm) =>
        vm.id.toUrl(),
      )
      if (
        verificationMethodIds === undefined ||
        !verificationMethodIds.includes(id.toUrl())
      ) {
        throw new DidDocumentError(
          `Tried to add '${id.toUrl()}' to '${fieldName}', but it was not found in the verificationMethod. If you want to add it anyways, try 'this.add${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          }Unsafe(...)'`,
        )
      }
    }

    const vm =
      id === undefined
        ? verificationMethodOrDidOrString instanceof VerificationMethod
          ? verificationMethodOrDidOrString
          : new VerificationMethod(
              verificationMethodOrDidOrString as VerificationMethodOptions,
            )
        : undefined

    const item = id ?? vm
    if (item) {
      if (newItem) {
        newItem.push(item)
      } else {
        newItem = [item]
      }
    } else {
      throw new DidDocumentError(
        `Something went wrong while trying to parse verification method for ${fieldName} with item ${verificationMethodOrDidOrString}`,
      )
    }

    uniqueStringOrVerificationMethodsSchema(fieldName).parse(newItem)

    return newItem
  }

  public findServiceByType(type: string): Service {
    const service = this.service?.find((s) =>
      (typeof s.type === 'string' ? [s.type] : s.type).includes(type),
    )

    if (!service) {
      throw new DidDocumentError(`Service not found for type '${type}'`)
    }

    return service
  }

  public safeFindServiceByType(type: string): Service | undefined {
    try {
      return this.findServiceByType(type)
    } catch {
      return undefined
    }
  }

  public findServiceById(id: string): Service {
    const service = this.service?.find((s) => s.id === id)

    if (!service) {
      throw new DidDocumentError(`Service not found with id '${id}'`)
    }

    return service
  }

  public safeFindServiceById(id: string): Service | undefined {
    try {
      return this.findServiceById(id)
    } catch {
      return undefined
    }
  }

  public findVerificationMethodByTypeAndPurpose(
    type: string,
    purpose:
      | 'authentication'
      | 'keyAgreement'
      | 'assertionMethod'
      | 'capabilityInvocation'
      | 'capabilityDelegation'
      | 'verificationMethod' = 'verificationMethod',
  ): VerificationMethod {
    const field =
      purpose === 'authentication'
        ? this.authentication
        : purpose === 'keyAgreement'
        ? this.keyAgreement
        : purpose === 'assertionMethod'
        ? this.assertionMethod
        : purpose === 'capabilityInvocation'
        ? this.capabilityInvocation
        : purpose === 'capabilityDelegation'
        ? this.capabilityInvocation
        : this.verificationMethod

    if (!field) {
      throw new DidDocumentError(
        `Purpose '${purpose}' does not exist inside the did document`,
      )
    }

    const vm = field
      .map((f) =>
        f instanceof Did ? this.safeFindToVerificationMethodByDidUrl(f) : f,
      )
      .find((vm) => vm?.type === type)

    if (!vm) {
      throw new DidDocumentError(
        `Purpose '${purpose}' does not have a field with type '${type}'`,
      )
    }

    return vm
  }

  public safeFindVerificationMethodByTypeAndPurpose(
    type: string,
    purpose:
      | 'authentication'
      | 'keyAgreement'
      | 'assertionMethod'
      | 'capabilityInvocation'
      | 'capabilityDelegation'
      | 'verificationMethod' = 'verificationMethod',
  ): VerificationMethod | undefined {
    try {
      return this.findVerificationMethodByTypeAndPurpose(type, purpose)
    } catch {
      return undefined
    }
  }

  public isVerificationMethodTypeRegistered(
    id: Did | string,
    additionalAcceptedTypes: string | Array<string> = [],
  ): boolean {
    const vm = this.findVerificationMethodByDidUrl(id)

    return vm.isTypeInDidSpecRegistry(additionalAcceptedTypes)
  }

  public isServiceTypeRegistered(
    id: string,
    additionalAcceptedTypes: string | Array<string> = [],
  ): boolean {
    const service = this.findServiceById(id)

    return service.isTypeInDidSpecRegistry(additionalAcceptedTypes)
  }

  public toJSON(omitKeys?: Array<string>): Record<string, unknown> {
    const mapStringOrVerificationMethod = (i: Did | VerificationMethod) =>
      i.toJSON()

    const omitBase = ['fullDocument']
    const omitKeysWithBase = omitKeys ? [...omitBase, ...omitKeys] : omitBase

    const mappedRest = {
      ...this.fullDocument,
      id: this.id.did,
      alsoKnownAs: this.alsoKnownAs,
      controller:
        this.controller && this.controller instanceof Did
          ? this.controller?.did
          : this.controller?.map((c) => c.did),
      verificationMethod: this.verificationMethod?.map((v) => v.toJSON()),
      service: this.service?.map((s) => s.toJSON()),
      assertionMethod: this.assertionMethod?.map(mapStringOrVerificationMethod),
      keyAgreement: this.keyAgreement?.map(mapStringOrVerificationMethod),
      capabilityInvocation: this.capabilityInvocation?.map(
        mapStringOrVerificationMethod,
      ),
      capabilityDelegation: this.capabilityDelegation?.map(
        mapStringOrVerificationMethod,
      ),
      authentication: this.authentication?.map(mapStringOrVerificationMethod),
    }
    const cleanedRest = Object.fromEntries(
      Object.entries(mappedRest)
        .filter(([_, value]) => value !== undefined)
        .filter(([key]) => !omitKeysWithBase.includes(key)),
    )

    return cleanedRest
  }
}
