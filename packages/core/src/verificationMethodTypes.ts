/**
 * These are values to be used for the type in a verification method object.
 *
 * @see {@link https://www.w3.org/TR/did-spec-registries/#verification-method-types}
 *
 * @note Do not include private or extraneous information in verification methods. The class of private information related to JWKs is defined here. Please review the DID Core specification for additional details on this topic.
 */
export enum VerificationMethodTypes {
    /**
     * @see {@link https://w3c-ccg.github.io/lds-jws2020/ | Normative definition}
     * @see {@link https://w3id.org/security/suite/jws-2020/v1 | JSON-LD}
     *
     * @example
     * {
     *  "id": "did:example:123#_TKzHv2jFIyvdTGF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
     *  "type": "JsonWebKey2020",
     *  "controller": "did:example:123",
     *  "publicKeyJwk": {
     *    "crv": "P-256",
     *    "x": "38M1FDts7Oea7urmseiugGW7tWc3mLpJh6rKe7xINZ8",
     *    "y": "nDQW6XZ7b_u2Sy9slofYLlG03sOEoug3I0aAPQ0exs4",
     *    "kty": "EC",
     *    "kid": "_TKzHv2jFIyvdTGF1Dsgwngfdg3SH6TpDv0Ta1aOEkw"
     *  }
     * }
     */
    JsonWebKey2020 = 'JsonWebKey2020',
    /**
     * @see {@link https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/ | Normative definition}
     * @see {@link https://w3id.org/security/suites/secp256k1-2019 | JSON-LD}
     *
     * @example
     * {
     *  "id": "did:example:123#WjKgJV7VRw3hmgU6--4v15c0Aewbcvat1BsRFTIqa5Q",
     *  "type": "EcdsaSecp256k1VerificationKey2019",
     *  "controller": "did:example:123",
     *  "publicKeyJwk": {
     *    "crv": "secp256k1",
     *    "x": "NtngWpJUr-rlNNbs0u-Aa8e16OwSJu6UiFf0Rdo1oJ4",
     *    "y": "qN1jKupJlFsPFc1UkWinqljv4YE0mq_Ickwnjgasvmo",
     *    "kty": "EC",
     *    "kid": "WjKgJV7VRw3hmgU6--4v15c0Aewbcvat1BsRFTIqa5Q"
     *  }
     * }
     */
    EcdsaSecp256k1VerificationKey2019 = 'EcdsaSecp256k1VerificationKey2019',
    /**
     * @see {@link https://w3c-ccg.github.io/lds-ed25519-2018/ | Normative definition}
     * @see {@link https://w3id.org/security/suites/ed25519-2018/v1 | JSON-LD}
     *
     * @example
     * {
     *  "id": "did:example:123#ZC2jXTO6t4R501bfCXv3RxarZyUbdP2w_psLwMuY6ec",
     *  "type": "Ed25519VerificationKey2018",
     *  "controller": "did:example:123",
     *  "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
     * }
     */
    Ed25519VerificationKey2018 = 'Ed25519VerificationKey2018',
    /**
     * @see {@link https://w3c-ccg.github.io/ldp-bbs2020/ | Normative definition}
     * @see {@link https://w3id.org/security/suites/bls12381-2020/v1 | JSON-LD}
     *
     * @example
     * {
     *  "id": "did:example:123#z3tEGVtEKzdhJB2rT5hLVjwQPis8k7bTM16t7vDZrQaoddk6wZ7or6xPPs1P8H9U16Xe75",
     *  "type": "Bls12381G1Key2020",
     *  "controller": "did:example:123",
     *  "publicKeyBase58": "7bXhTVonHPizXP72AE92PPmRiaXipC519yU7F6NxUFExWpyQo57LuKKBoTyuZ3uWm9",
     * }
     */
    Bls12381G1Key2020 = 'Bls12381G1Key2020',
    /**
     * @see {@link https://w3c-ccg.github.io/ldp-bbs2020/ | Normative definition}
     * @see {@link https://w3id.org/security/suites/bls12381-2020/v1 | JSON-LD}
     *
     * @example
     * {
     *   "id": "did:example:123#zUC7K51WYEsj8y6KPVa1XfwdW5ZJrW5kSbMV619j128T6atCLLXJjjovMZsJ3Ay4STdngRkvM4ygT4qm1mk6HR8FvipSY435nLgYS1TTcaqJAzDWzM1iB9vh3hTL1DEKitwn56i",
     *   "type": "Bls12381G2Key2020",
     *   "controller": "did:example:123",
     *   "publicKeyBase58": "25ETdUZDVnME6yYuAMjFRCnCPcDmYQcoZDcZuXAfeMhXPvjZg35QmZ7uctBcovA69YDM3Jf7s5BHo4u1y89nY6mHiji8yphZ4AMm4iNCRh35edSg76Dkasu3MY2VS9LnuaVQ",
     * }
     */
    Bls12381G2Key2020 = 'Bls12381G2Key2020',
    /**
     * @see {@link https://w3id.org/security/suites/pgp-2021#PgpVerificationKey2021 | Normative definition}
     * @see {@link https://w3id.org/security/suites/pgp-2021/v1 | JSON-LD}
     *
     * @note Use of this verification key should be in line with the OpenPGP Message Format as defined in {@link https://datatracker.ietf.org/doc/html/rfc4880 | RFC 4880}
     *
     * @example
     * {
     *  "@context":[
     *    "https://www.w3.org/ns/did/v1",
     *    "https://gpg.jsld.org/contexts/lds-gpg2020-v0.0.jsonld"
     *  ],
     *  "id":"did:example:123",
     *  "verificationMethod":[{
     *    "id": "did:example:123#989ed1057a294c8a3665add842e784c4d08de1e2",
     *    "type": "PgpVerificationKey2021",
     *    "controller": "did:example:123",
     *    "publicKeyPgp": "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.9.0\r\nComment: https://openpgpjs.org\r\n\r\nxjMEXkm5LRYJKwYBBAHaRw8BAQdASmfrjYr7vrjwHNiBsdcImK397Vc3t4BL\r\nE8rnN......v6\r\nDw==\r\n=wSoi\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n"
     *  }]
     * }
     */
    PgpVerificationKey2021 = 'PgpVerificationKey2021',
    /**
     * @see {@link https://w3c-ccg.github.io/lds-rsa2018/ | Normative definition}
     * @see {@link https://www.w3.org/2018/credentials/v1 | JSON-LD}
     *
     * @note {@link https://github.com/w3c/did-spec-registries/issues/370 | DID Specification Registries Issue 370} This property should be moved into a separate suite and linked to here rather than relying on the Verifiable Credentials vocabulary. There are known issues with the first version of the Security vocabulary JSON-LD context and the first version of the Verifiable Credentials JSON-LD context which will prevent these contexts from being listed in the same document. For now it's suggested that implementers rely upon the first version of the Verifiable Credentials JSON-LD context and not rely on the Security vocabulary JSON-LD context in the same document.
     *
     * @example
     * {
     *  "id": "did:example:123#key-0",
     *  "type": "RsaVerificationKey2018",
     *  "controller": "did:example:123",
     *  "publicKeyJwk": {
     *    "kty":"RSA",
     *    "e":"AQAB",
     *    "use":"sig",
     *    "kid":"tNksV42EUs3Xct9AkgZyFWglItRGMxVZ1A1XM68SNq0
     *    "n":"kO2d_qQTEBjYFGcoY_da7ziFY4L2QX14K7snCee09n-cY2eP-oJXk8T2_lL20YnpYhf4i
     *    jhkWHGU8kY8-FWPRrzSeu3JUMVSZoqTgoAiKWdnSLNvPVxvGuD2CiA3T6AkwUC03D2AkOLCcJV
     *    8h_hxUEPeDawF7ArpuJW5DXzEJjE7gOjN4r6d7VB6sd5y-3la54H2ADz2amHLdBWs30fL4BRBH
     *    lVdx0YmF37V4u5yvnnb5Iyr3kBXJes8t0MUMPkjqEEXRmukpKUzZYNpWDXY0tVcXeK5sRx0DAn
     *    lNgNNf14-vsyjGkj2Rz0oGW73jjWa8dw-yVlDEHyIkQU9-UY4dFXbVjdIO8j_5ghh62o1T7Y4w
     *    5CWMc-FxPE3LHe-_teW97X__NN-ToYgfi42IvV2mYOdQMCbvnvY2oMdK3b9wmeVi0marToauL5
     *    LMg5xHDKopmIR7E3VyRtNYwDFAZ89kadcbSrZ8zTR5APaB7Tmp2L2ZfXKxqKQuxlFTTCcZtg4e
     *    5AN8QuYdI18DEDQn2umUU_Twj7k4CXvuIKVL8p4yRHC4CHAGIm9cH_t11dF3wXygaENVOGRXQu
     *    0g1iKq0mO2rWpOqkGJ5uXMFb5lx54i8uOjCdZ9y2el28xA55Ve95KCxeTHp997Bn3TIgbeQ-B_
     *    -3PBVTuuAAH8y9fFNKtu5E"
     *  }
     * }
     */
    RsaVerificationKey2018 = 'RsaVerificationKey2018',
    /**
     * Normative definition pending
     * @see {@link http://w3id.org/security/suites/x25519-2019/v1 | JSON-LD}
     *
     * @note Normative definition in a suite is required for registration, this entry should be updated or removed.
     */
    X25519KeyAgreementKey2019 = 'X25519KeyAgreementKey2019',
    /**
     * @see {@link https://identity.foundation/EcdsaSecp256k1RecoverySignature2020/#ES256K-R | Normative definition}
     * @see {@link https://w3id.org/security/suites/secp256k1recovery-2020/v1 | JSON-LD}
     *
     * @example
     * {
     *  "@context": [
     *    "https://www.w3.org/ns/did/v1",
     *    "https://identity.foundation/EcdsaSecp256k1RecoverySignature2020#"
     *  ],
     *  "id":"did:example:123",
     *  "verificationMethod": [
     *    {
     *      "id": "did:example:123#vm-1",
     *      "controller": "did:example:123",
     *      "type": "EcdsaSecp256k1RecoveryMethod2020",
     *      "publicKeyJwk": {
     *        "crv": "secp256k1",
     *        "kid": "JUvpllMEYUZ2joO59UNui_XYDqxVqiFLLAJ8klWuPBw",
     *        "kty": "EC",
     *        "x": "dWCvM4fTdeM0KmloF57zxtBPXTOythHPMm1HCLrdd3A",
     *        "y": "36uMVGM7hnw-N6GnjFcihWE3SkrhMLzzLCdPMXPEXlA"
     *      }
     *    },
     *    {
     *      "id": "did:example:123#vm-2",
     *      "controller": "did:example:123",
     *      "type": "EcdsaSecp256k1RecoveryMethod2020",
     *      "publicKeyHex": "027560af3387d375e3342a6968179ef3c6d04f5d33b2b611cf326d4708badd7770"
     *    },
     *    {
     *      "id": "did:example:123#vm-3",
     *      "controller": "did:example:123",
     *      "type": "EcdsaSecp256k1RecoveryMethod2020",
     *      "ethereumAddress": "0xF3beAC30C498D9E26865F34fCAa57dBB935b0D74"
     *    }
     *  ]
     * }
     */
    EcdsaSecp256k1RecoveryMethod2020 = 'EcdsaSecp256k1RecoveryMethod2020',
    /**
     * @see {@link https://w3c-ccg.github.io/verifiable-conditions | Normative definition}
     * @see {@link https://w3c-ccg.github.io/verifiable-conditions/contexts/verifiable-conditions-2021-v1.json | JSON-LD}
     *
     * @example
     * {
     *    "id": "did:example:123#1",
     *    "controller": "did:example:123",
     *    "type": "VerifiableCondition2021",
     *    "conditionAnd": [{
     *        "id": "did:example:123#1-1",
     *        "controller": "did:example:123",
     *        "type": "VerifiableCondition2021",
     *        "conditionOr": [{
     *            "id": "did:example:123#1-1-1",
     *            "controller": "did:example:123",
     *            "type": "EcdsaSecp256k1VerificationKey2019",
     *            "publicKeyBase58": "5JBxKqYKzzoHrzeqwp6zXk8wZU3Ah94ChWAinSj1fYmyJvJS5rT"
     *        }, {
     *            "id": "did:example:123#1-1-2",
     *            "controller": "did:example:123",
     *            "type": "Ed25519VerificationKey2018",
     *            "publicKeyBase58": "PZ8Tyr4Nx8MHsRAGMpZmZ6TWY63dXWSCzamP7YTHkZc78MJgqWsAy"
     *        }]
     *    }, {
     *        "id": "did:example:123#1-2",
     *        "controller": "did:example:123",
     *        "type": "Ed25519VerificationKey2018",
     *        "publicKeyBase58": "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
     *    }]
     * }
     */
    VerifiableCondition2021 = 'VerifiableCondition2021'
}
