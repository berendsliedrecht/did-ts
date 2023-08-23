import {
    Did,
    DidDocument,
    DidRegistration,
    VerificationMethod,
    type DidResolution,
    type DidResolutionResolveOptions,
    type DidResolutionResolvePresentationOptions,
    type DidResolutionResolvePresentationResult,
    type DidResolutionResolveResult,
    VerificationMethodOptions,
    VerificationMethodTypes
} from 'did-core'

import varint from 'varint'
import base58 from 'bs58'

export type DidKeyRegisterOptions = {
    key: Uint8Array
    publicKeyFormat?: VerificationMethodTypes
    enableExperimentalPublicKeyTypes?: boolean
    enableEncryptionKeyDerivation?: boolean
}

enum AllowedMulticodecValues {
    Secp256k1 = 0xe37,
    X25519 = 0xec,
    Ed25519 = 0xed,
    P256 = 0x1200,
    P384 = 0x1201,
    P512 = 1202,
    Rsa = 0x1205
}

// TODO: add `publicKeyFormat` to the register and resolution options
export class DidKey implements DidResolution, DidRegistration {
    public method = 'key'

    public resolve(
        did: string,
        _resolutionOptions?: DidResolutionResolveOptions
    ): DidResolutionResolveResult {
        const parsedDid = new Did(did)

        // TODO: use proper did resolution errors
        if (parsedDid.didParts.scheme != this.method) {
            throw new Error(`'${did}' is not a valid did:${this.method}`)
        }

        // TODO: use proper did resolution errors
        if (!parsedDid.didParts.identifier.startsWith('z')) {
            throw new Error(
                `'${did}' must start with a 'z' indicating base58-btc encoding`
            )
        }

        return {
            didDocument: new DidDocument({ id: did }),
            didResolutionMetadata: {},
            didDocumentMetadata: {}
        }
    }

    public resolvePresentation(
        _did: string,
        _resolutionOptions?: DidResolutionResolvePresentationOptions
    ): DidResolutionResolvePresentationResult {
        throw new Error('Resolve presentation is not supported')
    }

    public register({
        key,
        publicKeyFormat = VerificationMethodTypes.MultiKey,
        enableExperimentalPublicKeyTypes = false,
        enableEncryptionKeyDerivation = false
    }: DidKeyRegisterOptions) {
        if (
            !enableExperimentalPublicKeyTypes &&
            !(
                publicKeyFormat === VerificationMethodTypes.JsonWebKey2020 ||
                publicKeyFormat === VerificationMethodTypes.MultiKey ||
                publicKeyFormat ===
                    VerificationMethodTypes.Ed25519VerificationKey2020
            )
        ) {
            throw new Error(`invalidPublicKeyType`)
        }

        const multibaseKey = `z${base58.encode(key)}`
        const did = new Did(`did:${this.method}:${multibaseKey}`)

        const verificationMethod = this.signatureMethodCreation(
            did,
            multibaseKey,
            {
                key,
                publicKeyFormat,
                enableExperimentalPublicKeyTypes,
                enableEncryptionKeyDerivation
            }
        )
        const didDocument = new DidDocument({
            id: did,
            verificationMethod: [verificationMethod],
            authentication: [verificationMethod.id],
            assertionMethod: [verificationMethod.id],
            capabilityInvocation: [verificationMethod.id],
            capabilityDelegation: [verificationMethod.id]
        })

        return {
            did,
            didDocument
        }
    }

    private signatureMethodCreation(
        identifier: Did,
        multibaseValue: string,
        { publicKeyFormat }: Required<DidKeyRegisterOptions>
    ) {
        let publicKey: Pick<
            VerificationMethodOptions,
            'publicKeyJwk' | 'publicKeyMultibase'
        >

        if (
            publicKeyFormat ===
                VerificationMethodTypes.Ed25519VerificationKey2020 ||
            publicKeyFormat === VerificationMethodTypes.MultiKey
        ) {
            publicKey = {
                publicKeyMultibase: multibaseValue
            }
        } else {
            // const { multicodecValue, decodedPublicKey } =
            // this.decodePublicKey(multibaseValue)
            throw new Error(
                `public key format: ${publicKeyFormat} is not yet supported`
            )
        }

        return new VerificationMethod({
            id: identifier.withFragment(multibaseValue),
            type: publicKeyFormat,
            controller: identifier,
            ...publicKey
        })
    }

    private decodePublicKey(multibaseValue: string): {
        multicodecValue: number
        decodedPublicKey: Uint8Array
    } {
        const key = multibaseValue.slice(1)
        const rawPublicKeyBytes = base58.decode(key)
        const multicodecValue = varint.decode(rawPublicKeyBytes)

        if (!Object.values(AllowedMulticodecValues).includes(multicodecValue)) {
            throw new Error(
                `Unsupported multicodec value '0x${multicodecValue.toString(
                    16
                )}'`
            )
        }

        return {
            multicodecValue,
            decodedPublicKey: rawPublicKeyBytes
        }
    }
}
