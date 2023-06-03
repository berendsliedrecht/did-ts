import { Did } from './did'

export * from './did'
export * from './didDocument'
export * from './verificationMethod'
export * from './serviceEndpoint'
export * from './publicKeyJwk'

export * from './schemas'

console.log(
  JSON.stringify({ did: new Did('did:example:key/aba#yeeeeeeeeee') }, null, 2)
)
