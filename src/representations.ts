export enum Representations {
  /**
   * @see {@link https://www.w3.org/TR/did-core#json | DID Core}
   */
  DidJson = 'application/did+json',
  /**
   * JSON-LD has a representation-specific entry, which is the `@context` field inside the DID Document.
   *
   * @see {@link https://www.w3.org/TR/did-core#json | DID Core}
   * @see {@link https://w3c.github.io/did-core/ | DID Core 1.0 Working draft }
   *
   * @example
   * {
   *  "@context": [
   *    "https://www.w3.org/ns/did/v1",
   *    "https://example.com/blockchain-identity/v1"
   *  ],
   *  ...
   * }
   */
  DidJsonLd = 'application/did+ld+json',
  /**
   * @see {@link https://www.w3.org/TR/did-cbor-representation/#application-did-cbor | The Plain CBOR Representation}
   */
  DidCbor = 'application/did+cbor',
}
