/**
 * These are values to be used for the type property in a service object.
 *
 * @see {@link https://www.w3.org/TR/did-spec-registries/#service-types}
 */
export enum ServiceTypes {
  /**
   * LinkedDomains IRI is not stable
   *
   * @see {@link https://identity.foundation/.well-known/resources/did-configuration/#LinkedDomains}
   *
   * @note If this link changes the term defintion registered in did core will need to change, we should be sure we like this URL as is... forever.
   */
  LinkedDomains = 'LinkedDomains',
  DIDCommMessaging = 'DIDCommMessaging',
  /**
   * The CredentialRegistry endpoint allows publication of a dedicated service
   * endpoint in a DID document, through which verifiable credentials can be
   * queried. Each registry endpoint is a REST endpoint. When a GET request is
   * sent to the URI formed by appending the credentialSubject.id as a
   * URL-encoded string to the given endpoint URI, the registry MUST return an
   * array of verifiable credentials associated with the subject ID. A sample
   * registry endpoint can be found here.
   */
  CredentialRegistry = 'CredentialRegistry',
}
