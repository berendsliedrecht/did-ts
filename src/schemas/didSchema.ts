import { PREFIX_FRAGMENT, PREFIX_PATH, PREFIX_QUERY } from '../did'
import { z } from 'zod'

const DID_URL_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*:(?:[a-z0-9]+(?:[._-][a-z0-9]+)*)?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i
const DID_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*(?:#[^s]*)?$/i

export const didUrlSchema = (parameterKeys?: Array<string>) =>
  z
    .string()
    .regex(DID_URL_REGEXP)
    .transform((did: string) => {
      const url = new URL(did)
      const prefixPathIndex = url.pathname.indexOf(PREFIX_PATH)

      const stripUntil = Math.min(
        ...[
          did.indexOf(PREFIX_PATH),
          did.indexOf(PREFIX_QUERY),
          did.indexOf(PREFIX_FRAGMENT),
        ].filter((i) => i !== -1)
      )

      const didBase = stripUntil !== -1 ? did.slice(0, stripUntil) : did

      const path = (
        prefixPathIndex !== -1 ? url.pathname.slice(prefixPathIndex) : ''
      ).substring(1)
      const p = path.length > 0 ? path : undefined

      const query = url.search.substring(1)
      const queryParams = new URLSearchParams(query)
      const queryObj =
        queryParams.size > 0
          ? [...queryParams.entries()].reduce(
              (prev, [k, v]) => ({ [k]: v, ...prev } as Record<string, string>),
              {}
            )
          : undefined

      const parameters = queryObj
        ? Object.entries(queryObj).reduce((prev, [k, v]) => {
            if (parameterKeys?.includes(k)) {
              return { [k]: v, ...prev }
            }
            return prev
          }, {})
        : undefined

      const fragment = url.hash.substring(1)
      const f = fragment.length > 0 ? fragment : undefined

      return {
        did: didBase,
        path: p,
        query: queryObj,
        fragment: f,
        parameters,
      }
    })

export const didSchema = z
  .string()
  .regex(DID_REGEXP)
  .transform((did: string) => {
    const parts = did.split(':')
    const scheme = parts[0]
    const method = parts[1]
    const identifier = parts[parts.length - 1]
    const namespaces = parts.slice(2, parts.length - 1)

    return {
      scheme,
      method,
      identifier,
      namespaces: namespaces.length > 0 ? namespaces : undefined,
    }
  })

export const stringOrDidUrl = z.string().or(didSchema)
export const stringOrDid = z.string().or(didSchema)
