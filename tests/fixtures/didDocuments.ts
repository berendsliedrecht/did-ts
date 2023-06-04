import { DidDocumentOptions } from '../../src'

export const DID_DOCUMENTS: Array<DidDocumentOptions> = [
  {
    id: 'did:example:foobar',
  },
  {
    id: 'did:example:123456789abcdefghi',
    verificationMethod: [
      {
        id: 'did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          crv: 'Ed25519',
          jsldkfalskd: 'asldhfsadj',
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
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1',
    ],
    id: 'did:example:123',
    authentication: [
      {
        id: 'did:example:123#z6MkecaLyHuYWkayBDLw5ihndj3T1m6zKTGqau3A51G7RBf3',
        type: 'Ed25519VerificationKey2020', // external (property value)
        controller: 'did:example:123',
        publicKeyMultibase: 'zAKJP3f7BD6W4iWEQ9jwndVTCBq8ua2Utt8EEjJ6Vxsf',
      },
    ],
    capabilityInvocation: [
      {
        id: 'did:example:123#z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k',
        type: 'Ed25519VerificationKey2020', // external (property value)
        controller: 'did:example:123',
        publicKeyMultibase: 'z4BWwfeqdp1obQptLLMvPNgBw48p7og1ie6Hf9p5nTpNN',
      },
    ],
    capabilityDelegation: [
      {
        id: 'did:example:123#z6Mkw94ByR26zMSkNdCUi6FNRsWnc2DFEeDXyBGJ5KTzSWyi',
        type: 'Ed25519VerificationKey2020', // external (property value)
        controller: 'did:example:123',
        publicKeyMultibase: 'zHgo9PAmfeoxHG8Mn2XHXamxnnSwPpkyBHAMNF3VyXJCL',
      },
    ],
    assertionMethod: [
      {
        id: 'did:example:123#z6MkiukuAuQAE8ozxvmahnQGzApvtW7KT5XXKfojjwbdEomY',
        type: 'Ed25519VerificationKey2020', // external (property value)
        controller: 'did:example:123',
        publicKeyMultibase: 'z5TVraf9itbKXrRvt2DSS95Gw4vqU3CHAdetoufdcKazA',
      },
    ],
  },
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
    ],
    id: 'did:example:method-id',
    verificationMethod: [
      {
        id: 'did:example:123#key-0',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'OKP', // external (property name)
          crv: 'Ed25519', // external (property name)
          x: 'VCpo2LMLhn6iWku8MKvSLg2ZAoC-nlOyPVQaO3FxVeQ', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-1',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'OKP', // external (property name)
          crv: 'X25519', // external (property name)
          x: 'pE_mG098rdQjY3MKK2D5SUQ6ZOEW3a6Z6T7Z4SgnzCE', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-2',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'secp256k1', // external (property name)
          x: 'Z4Y3NNOxv0J6tCgqOBFnHnaZhJF6LdulT7z8A-2D5_8', // external (property name)
          y: 'i5a2NtJoUKXkLm6q8nOEu9WOkso1Ag6FTUT6k_LMnGk', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-3',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'secp256k1', // external (property name)
          x: 'U1V4TVZVMUpUa0ZVU1NBcU9CRm5IbmFaaEpGNkxkdWx', // external (property name)
          y: 'i5a2NtJoUKXkLm6q8nOEu9WOkso1Ag6FTUT6k_LMnGk', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-4',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'P-256', // external (property name)
          x: 'Ums5WVgwRkRTVVFnU3k5c2xvZllMbEcwM3NPRW91ZzN', // external (property name)
          y: 'nDQW6XZ7b_u2Sy9slofYLlG03sOEoug3I0aAPQ0exs4', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-5',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'P-384', // external (property name)
          x: 'VUZKSlUwMGdpSXplekRwODhzX2N4U1BYdHVYWUZsaXVDR25kZ1U0UXA4bDkxeHpE', // external (property name)
          y: 'jq4QoAHKiIzezDp88s_cxSPXtuXYFliuCGndgU4Qp8l91xzD1spCmFIzQgVjqvcP', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-6',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'P-521', // external (property name)
          x: 'VTI5c1lYSmZWMmx1WkhNZ0dQTXhaYkhtSnBEU3UtSXZwdUtpZ0VOMnB6Z1d0U28tLVJ3ZC1uNzhuclduWnplRGMx', // external (property name)
          y: 'UW5WNVgwSnBkR052YVc0Z1VqY1B6LVpoZWNaRnliT3FMSUpqVk9sTEVUSDd1UGx5RzBnRW9NV25JWlhoUVZ5cFB5', // external (property name)
        },
      },
      {
        id: 'did:example:123#key-7',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'RSA', // external (property name)
          e: 'AQAB', // external (property name)
          n: 'UkhWaGJGOUZRMTlFVWtKSElBdENGV2hlU1F2djFNRXh1NVJMQ01UNGpWazlraEpLdjhKZU1YV2UzYldIYXRqUHNrZGYyZGxhR2tXNVFqdE9uVUtMNzQybXZyNHRDbGRLUzNVTElhVDFoSkluTUhIeGoyZ2N1Yk82ZUVlZ0FDUTRRU3U5TE8wSC1MTV9MM0RzUkFCQjdRamE4SGVjcHl1c3BXMVR1X0RicXhjU253ZW5kYW13TDUyVjE3ZUtobE80dVh3djJIRmx4dWZGSE0wS21DSnVqSUt5QXhqRF9tM3FfX0lpSFVWSEQxdERJRXZMUGhHOUF6c24zajk1ZC1zYU', // external (property name)
        },
      },
    ],
  },
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2018/v1',
      'https://w3id.org/security/suites/x25519-2019/v1',
      'https://w3id.org/security/suites/secp256k1-2019/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
    ],
    id: 'did:example:method-id',
    verificationMethod: [
      {
        id: 'did:example:123#key-0',
        type: 'Ed25519VerificationKey2018',
        controller: 'did:example:123',
        // publicKeyBase58: '3M5RCDjPTWPkKSN3sxUmmMqHbmRPegYP1tjcKyrDbt9J', // external (property name)
      },
      {
        id: 'did:example:123#key-1',
        type: 'X25519KeyAgreementKey2019',
        controller: 'did:example:123',
        publicKeyBase58: 'FbQWLPRhTH95MCkQUeFYdiSoQt8zMwetqfWoxqPgaq7x', // external (property name)
      },
      {
        id: 'did:example:123#key-2',
        type: 'EcdsaSecp256k1VerificationKey2019',
        controller: 'did:example:123',
        publicKeyBase58: 'ns2aFDq25fEV1NUd3wZ65sgj5QjFW8JCAHdUJfLwfodt', // external (property name)
      },
      {
        id: 'did:example:123#key-3',
        type: 'JsonWebKey2020',
        controller: 'did:example:123',
        publicKeyJwk: {
          kty: 'EC', // external (property name)
          crv: 'P-256', // external (property name)
          x: 'Er6KSSnAjI70ObRWhlaMgqyIOQYrDJTE94ej5hybQ2M', // external (property name)
          y: 'pPVzCOTJwgikPjuUE6UebfZySqEJ0ZtsWFpj7YSPGEk', // external (property name)
        },
      },
    ],
  },
  {
    '@context': 'https://w3id.org/did/v1',
    id: 'did:github:OR13',
    publicKey: [
      {
        encoding: 'application/pgp-keys',
        type: 'OpenPgpVerificationKey2019',
        id: 'did:github:OR13#kid=ibHP1ksrJp5FQjP7hhmTXV7YE5o5bB6YFoODu9n_82E',
        controller: 'did:github:OR13',
        publicKeyPem:
          '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nxk8EXNhPhBMFK4EEAAoCAwSTAb5KPYRzxaQoplpY8olodfbG3OxFqm6ULA6p\r\nvaCxZLKVwd4XCwSL8XcMMrPb78kmDEk0H5/Jl0qpRteRoy8CzRdhbm9uIDxh\r\nbm9uQGV4YW1wbGUuY29tPsJ3BBATCAAfBQJc2E+EBgsJBwgDAgQVCAoCAxYC\r\nAQIZAQIbAwIeAQAKCRAeL9f86407tSxDAP4/dXtxQKQxAsURQmNxwwlD03YM\r\n778dcM753Y4f96jW7QEAkLEDur/hKPLKKdFAi/9TCKNQvr7GVk1wYeYeiHMi\r\nJ/fOUwRc2E+EEgUrgQQACgIDBA7fIkmeQmvaG6a5B3X808pdFStePh7+uevf\r\njWpXbDYYTsxARpBT/xb34m0wrXGo7DEG6pAknQ6NBWiXSWX7qTkDAQgHwmEE\r\nGBMIAAkFAlzYT4QCGwwACgkQHi/X/OuNO7U8gQEAn3/lFx3C7iqzVG2BJgtH\r\n08Oc3h0YPwYnZjM9NXDsvEgA/3v5C28Jhx10RFKi9NDxAPjilwBDOZqYPK/s\r\nW3qWhGNU\r\n=RgYO\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n',
      },
      {
        encoding: 'application/pgp-keys',
        type: 'OpenPgpVerificationKey2019',
        id: 'did:github:OR13#kid=jNeDDagaBn466F-wH26YdQ5_NiabBvOlXTv5xItQakU',
        controller: 'did:github:OR13',
        publicKeyPem:
          '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nxk8EXNhPhBMFK4EEAAoCAwRzQtkzDYQJy7xfHE0ld/Yoznx0q5bfVrx51FPG\r\nXzjd28wktnePW+3Riq0+3YUa09mZJWEuGPwrrGGXEqobjlVBzRdhbm9uIDxh\r\nbm9uQGV4YW1wbGUuY29tPsJ3BBATCAAfBQJc2E+EBgsJBwgDAgQVCAoCAxYC\r\nAQIZAQIbAwIeAQAKCRC0BtN9z0XDqWsSAQCso31Utz8xji2B7WUBX+2798ae\r\ncqxSxMPWnOQKenBA0gD+N9Qiq6sQ/sDipXuG7xIg4NH4qpf96xvPwC4hX9Jv\r\n3FzOUwRc2E+EEgUrgQQACgIDBIPkRAFeFOrFMXa4XoZ8+aZb4iXLhce6N0LE\r\nCh3YZNJLwxWVKVCxr8niWq3Fa8RTkLA+F7PvIHjnpgx5UGeqPzgDAQgHwmEE\r\nGBMIAAkFAlzYT4QCGwwACgkQtAbTfc9Fw6nomAEAl+1tioF0BlbTNm3c879W\r\nadI46tXfqHt8T6TGdIsKbmoA/RjOfCUvMT277p+v3aYjROI3M7ygh24jbjzx\r\nKBQj/GIJ\r\n=UGd9\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n',
      },
    ],
    authentication: [],
    service: [],
    proof: {
      type: 'OpenPgpSignature2019',
      creator:
        'did:github:OR13#kid=ibHP1ksrJp5FQjP7hhmTXV7YE5o5bB6YFoODu9n_82E',
      domain: 'GitHubDID',
      nonce: '9c28424e440806718a5165670f79bbc2',
      created: '2019-05-12T16:53:25.038Z',
      signatureValue:
        '-----BEGIN PGP SIGNATURE-----\r\nVersion: OpenPGP.js v4.4.7\r\nComment: https://openpgpjs.org\r\n\r\nwl0EARMIAAYFAlzYT4UACgkQHi/X/OuNO7WZQAD47BbeS2pgFW/WwPbHvC8I\r\nMfsOFhSJEywkED7uz0E4RwD/RRrsmPPb4S4Z+7D2skjiFtnd2nWd+BXcxvhm\r\nGzKk1FU=\r\n=W/tu\r\n-----END PGP SIGNATURE-----\r\n',
    },
  },
  {
    id: 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w',
    '@context': [
      'https://www.w3.org/ns/did/v1',
      {
        '@base': 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w',
      },
    ],
    service: [
      {
        id: 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w#linkedin',
        type: 'linkedin',
        serviceEndpoint: 'https://linkedin.com/in/henry-tsai-6b884014',
      },
      {
        id: 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w#github',
        type: 'github',
        serviceEndpoint: 'https://github.com/thehenrytsai',
      },
    ],
    verificationMethod: [
      {
        id: 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w#someKeyId',
        controller: 'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w',
        type: 'EcdsaSecp256k1VerificationKey2019',
        publicKeyJwk: {
          kty: 'EC',
          crv: 'secp256k1',
          x: 'WfY7Px6AgH6x-_dgAoRbg8weYRJA36ON-gQiFnETrqw',
          y: 'IzFx3BUGztK0cyDStiunXbrZYYTtKbOUzx16SUK0sAY',
        },
      },
    ],
    authentication: [
      'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w#someKeyId',
    ],
  },
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3c-ccg.github.io/verifiable-conditions/contexts/verifiable-conditions-2021-v1.json',
    ],
    id: 'did:eosio:eos:eoscanadacom',
    verificationMethod: [
      {
        id: 'did:eosio:eos:eoscanadacom#active',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 1,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#active-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'EcdsaSecp256k1VerificationKey2019',
              publicKeyJwk: {
                crv: 'secp256k1',
                kty: 'EC',
                x: '0xMG4S6nDAGYjy6un2-l53-s0RC2t619_LqPDxyPcf0',
                y: 'gRsWsrqWqnlr-jCDVeqatVjFghLADydjOlUPImBwhYs',
                kid: 'PUB_K1_8SC96RUoYvM1X47isBBrebY1kjqVT4w37Q4tNNHtT8XN35v33D',
              },
            },
            weight: 1,
          },
        ],
        relationshipParent: ['did:eosio:eos:eoscanadacom#owner'],
      },
      {
        id: 'did:eosio:eos:eoscanadacom#blacklistops',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 1,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#blacklistops-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'EcdsaSecp256k1VerificationKey2019',
              publicKeyJwk: {
                crv: 'secp256k1',
                kty: 'EC',
                x: 'dLOnSPgih47eVwlWAlrcm4wD1cJnjc-Jh_UFdlb29mw',
                y: 'vwsVDd__tmPumdQ2Yo-TdozxbhGnyDMg3Htd52-SEw0',
                kid: 'PUB_K1_7idX86zQ6M3mrzkGQ9MGHf4btSECmcTj4i8Le59ga7CpLxRu4s',
              },
            },
            weight: 1,
          },
        ],
        relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
      },
      {
        id: 'did:eosio:eos:eoscanadacom#claimer',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 1,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#claimer-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'EcdsaSecp256k1VerificationKey2019',
              publicKeyJwk: {
                crv: 'secp256k1',
                kty: 'EC',
                x: 'RnFk1oqh28hDY2WHWUhQzAZYXjfvv0oR43h69RCCkIA',
                y: 'e8aXe3M9xKgYsj6U-KOonbgEtjHGPDtAUavq9nY4lI8',
                kid: 'PUB_K1_7NFuBesBKK5XHHLtzFxm7S57Eq11gUtndrsvq3Mt3XZNNT5cXo',
              },
            },
            weight: 1,
          },
        ],
        relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
      },
      {
        id: 'did:eosio:eos:eoscanadacom#day2day',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 1,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaaa#active',
            },
            weight: 1,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-1',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaac#active',
            },
            weight: 1,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-2',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaaf#active',
            },
            weight: 1,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-3',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaag#active',
            },
            weight: 1,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-4',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaah#active',
            },
            weight: 1,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#day2day-5',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaai#active',
            },
            weight: 1,
          },
        ],
        relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
      },
      {
        id: 'did:eosio:eos:eoscanadacom#eosforumdapp',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 1,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#eosforumdapp-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'EcdsaSecp256k1VerificationKey2019',
              publicKeyJwk: {
                crv: 'secp256k1',
                kty: 'EC',
                x: 'XWelm_LA5OvSwDPBQT_dwxWZ1Li1BiYbP3w2yhkcb6k',
                y: 'wfydp1B25ylTsaR-W1Wld6TVLnJHXGgC7AgJ50Y0FHM',
                kid: 'PUB_K1_7YNS1swh6QWANkzGgFrjiX8E3u8WK5CK9GMAb6EzKVNZKnMUfs',
              },
            },
            weight: 1,
          },
        ],
        relationshipParent: ['did:eosio:eos:eoscanadacom#active'],
      },
      {
        id: 'did:eosio:eos:eoscanadacom#owner',
        controller: 'did:eosio:eos:eoscanadacom',
        type: 'VerifiableCondition',
        threshold: 5,
        conditionWeightedThreshold: [
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-0',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaaa#active',
            },
            weight: 2,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-1',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaab#active',
            },
            weight: 2,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-2',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaac#active',
            },
            weight: 2,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-3',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaad#active',
            },
            weight: 2,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-4',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaae#active',
            },
            weight: 2,
          },
          {
            condition: {
              id: 'did:eosio:eos:eoscanadacom#owner-5',
              controller: 'did:eosio:eos:eoscanadacom',
              type: 'VerifiableCondition',
              conditionDelegated: 'id:eosio:eos::eoscanadaaaf#active',
            },
            weight: 1,
          },
        ],
      },
    ],
    service: [
      {
        id: 'https://eos.greymass.com',
        type: 'LinkedDomains',
        serviceEndpoint: 'https://eos.greymass.com',
      },
      {
        id: 'https://eos.dfuse.eosnation.io',
        type: 'LinkedDomains',
        serviceEndpoint: 'https://eos.dfuse.eosnation.io',
      },
    ],
  },
  {
    '@context': 'https://w3id.org/did/v0.11',
    id: 'did:meta:0000000000000000000000000000000000000000000000000000000000005e65',
    publicKey: [
      {
        id: 'did:meta:0000000000000000000000000000000000000000000000000000000000005e65#MetaManagementKey#028efef184e144285eb1bf12c1a95c7bbc09ac2e',
        type: 'EcdsaSecp256k1VerificationKey2019',
        controller:
          'did:meta:0000000000000000000000000000000000000000000000000000000000005e65',
        publicKeyHex:
          '041e5281968ebdd9266b7b841dd6f8ae9088b8399a1eab172ecad2cc5f98a795c98c82e60d58263c4cdfc7ff4ebafea06ab9cfdcdfb5529965b42817db331d66ce',
      },
    ],
    authentication: [
      'did:meta:0000000000000000000000000000000000000000000000000000000000005e65#MetaManagementKey#028efef184e144285eb1bf12c1a95c7bbc09ac2e',
    ],
    service: [
      {
        id: 'did:meta:0000000000000000000000000000000000000000000000000000000000000527',
        publicKey:
          'did:meta:0000000000000000000000000000000000000000000000000000000000005e65#MetaManagementKey#028efef184e144285eb1bf12c1a95c7bbc09ac2e',
        type: 'identityHub',
        serviceEndpoint: 'https://datahub.metadium.com',
      },
    ],
  },
  {
    authentication: ['did:indy:sovrin:WRfXPg8dantKVubE3HX8pw#verkey'],
    id: 'did:indy:sovrin:WRfXPg8dantKVubE3HX8pw',
    service: [
      {
        id: 'did:indy:sovrin:WRfXPg8dantKVubE3HX8pw#xdi',
        serviceEndpoint:
          'https://xdi03-at.danubeclouds.com/cl/+!:did:sov:WRfXPg8dantKVubE3HX8pw',
        type: 'xdi',
      },
      {
        id: 'did:indy:sovrin:WRfXPg8dantKVubE3HX8pw#agent',
        serviceEndpoint:
          'https://agents.danubeclouds.com/agent/WRfXPg8dantKVubE3HX8pw',
        type: 'agent',
      },
    ],
    verificationMethod: [
      {
        controller: 'did:indy:sovrin:WRfXPg8dantKVubE3HX8pw',
        id: 'did:indy:sovrin:WRfXPg8dantKVubE3HX8pw#verkey',
        publicKeyBase58: 'H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV',
        type: 'Ed25519VerificationKey2018',
      },
    ],
  },
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      {
        '@vocab': 'https://www.iana.org/assignments/jose#',
      },
    ],
    id: 'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ',
    verificationMethod: [
      {
        id: 'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ#0',
        type: 'JsonWebKey2020',
        controller:
          'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ',
        publicKeyJwk: {
          kid: 'urn:ietf:params:oauth:jwk-thumbprint:sha-256:FfMbzOjMmQ4efT6kvwTIJjelTqjl0xjEIWQ2qobsRMM',
          kty: 'OKP',
          crv: 'Ed25519',
          alg: 'EdDSA',
          x: 'ANRjH_zxcKBxsjRPUtzRbp7FSVLKJXQ9APX9MP1j7k4',
        },
      },
    ],
    authentication: [
      'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ#0',
    ],
    assertionMethod: [
      'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ#0',
    ],
    capabilityInvocation: [
      'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ#0',
    ],
    capabilityDelegation: [
      'did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ#0',
    ],
  },
  {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      {
        '@base': 'did:web:did.actor:bob',
      },
    ],
    id: 'did:web:did.actor:bob',
    publicKey: [
      {
        id: '#z6MkkQBvgvqb6zGvS4cydworpUaRDzpszSFixq49ahbDeUTG',
        type: 'Ed25519VerificationKey2018',
        controller: '',
        publicKeyBase58: '6wvt6gb9mSnTKZnGxNr1yP2RQRZ2aZ1NGp9DkRdCjFft',
      },
    ],
  },
]
