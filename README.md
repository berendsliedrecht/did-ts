# DID Core

This repository contains a library which is a reference implementation of
[Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/).

## Design goal

The main design goal of this library is to be unopinionated and extendible by
the consumer. Unopinionated in this sense means that the library does not
enforce a specific ideology to use it. Extendible means that the consumer of
this library can use this as a base on which they can build more use-case
specific functionality. For example, it is possible for the user to provide
their own [JWK](https://datatracker.ietf.org/doc/html/rfc7517). This class is
used to parse into from the DID Document.

Another goal is to provide as much utility as possible regarding the main data
types (DIDs and DID Documents). By adding this, it allows the consumer to
choose their usage of the library to make it fit into their existing
infrastructure.

## Usage

Using this library is rather straightforward. Please feel free to open an issue
if a pattern is missing or does not make sense.

### Did class

To create an instance of the `Did` class, the following code can be used:

```typescript
import { Did } from 'did-core'

const did = new Did('did:example:org#key-01')
```

Creating an instance of a `Did` will also validate the provided DID via a Regex
and [Zod](https://zod.dev). Validation however, does not mean that the DID is
resolvable or registered.

The URL parts (path, query, fragment and parameters) and DID parts, can be
retrieved with the following code:

```typescript
import { Did } from 'did-core'

const did = new Did('did:example:org#key-01')

const urlParts = did.urlParts
const didParts = did.didParts
```

A common builder pattern is also applied to this class and can be used to
quickly, for example, add a path.

```typescript
import { Did } from 'did-core'

const did = new Did('did:example:org#key-01').addPath('some-path')

const didWithPath = did.toUrl()
```

### Did Document class

A DID Document can be used with the `DidDocument` class. As with the `Did`
class, a builder pattern is applied to add fields to the document. The
`DidDocument` does some validation, like making sure the `service.id`s are
unique and the verification method references exist, but it will require
additional business logic for use-case specific validation. In the future, it
should be possible to supply your own validation functionality (please open an
issue if this is required).

```typescript
import { DidDocument } from 'did-core'

const didDocument = new DidDocument({ id: 'did:example:org' })
```

The `id` is the only required field, but all the fields of the document can be
supplied. The `id` field also may take an instance of a `Did` class.

Adding items like verification methods, capability invocations, etc. can be
done when instantiating the class, or with builder functionality.

```typescript
import { DidDocument } from 'did-core'

const didDocument = new DidDocument({
  id: 'did:example:org',
  verificationMethod: [
    {
      id: 'did:example:org#key-01',
      type: 'some-type',
      controller: 'did:example:org',
    },
  ],
}).addAuthentication('did:example:org#key-01')
```

The `addAuthentication` method is created for all items inside the DID Document
and maybe take a `string`, `Did`, `VerificationMethod` or
`VerificationMethodOptions`. If a `string` or `Did` is supplied, it must be a
valid reference to an item inside the `verificationMethod` list inside the DID
Document. If it is a not inside it will throw an error, if it should be added
anyways, `addAuthenticationUnsafe` can be used and it will not throw an if the
reference is not inside the `verificationMethod`. It will however, still error
if it is not a valid DID URL.

To get the associated verification method from a DID URL, the following method can be used:

```typescript
import { DidDocument } from 'did-core'

const didDocument = new DidDocument({
  id: 'did:example:org',
  verificationMethod: [
    {
      id: 'did:example:org#key-01',
      type: 'some-type',
      controller: 'did:example:org',
    },
  ],
})

const verificationMethod = didDocument.findVerificationMethodByDidUrl(
  'did:example:org#key-01'
) // errors if not found

// or

const maybeVerificationMethod = didDocument.safeFindVerificationMethodByDidUrl(
  'did:example:org#key-01'
) // returns undefined if not found
```
