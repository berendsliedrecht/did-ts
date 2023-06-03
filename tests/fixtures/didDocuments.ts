export const DID_DOCUMENTS = [
  {
    id: 'did:example:123456789abcdefghi',
    verificationMethod: [
      {
        id: 'did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          crv: 'Ed25519',
          x: 'VCpo2LMLhn6iWku8MKvSLg2ZAoC-nlOyPVQaO3FxVeQ',
          kty: 'OKP',
          kid: '_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        },
      },
      {
        id: 'did:example:123456789abcdefghi#keys-1',
        type: 'Ed25519VerificationKey2020',
        controller: 'did:example:pqrstuvwxyz0987654321',
        publicKeyMultibase: 'zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV',
      },
    ],
  },
]
