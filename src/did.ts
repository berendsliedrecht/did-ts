import { z } from 'zod'
import { stringOrDid, stringOrDidUrl } from './schemas'

export const PREFIX_PATH = '/'
export const PREFIX_QUERY = '?'
export const PREFIX_FRAGMENT = '#'
const DEFAULT_PARAMETER_KEYS = [
  'service',
  'relativeRef',
  'versionId',
  'versionTime',
  'hl',
]

export type DidParts = {
  scheme: string
  method: string
  namespaces?: Array<string>
  identifier: string
}

export type DidUrlParts = {
  path?: string
  query?: Record<string, string>
  fragment?: string
  parameters?: Record<string, string>
}

export class Did {
  public did: string
  private path?: string
  private query?: Record<string, string>
  private fragment?: string
  private parameters?: Record<string, string>
  private parameterKeys: Array<string>

  public constructor(did: string, parameterKeys?: Array<string>) {
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

    const query = url.search.substring(1)
    const queryParams = new URLSearchParams(query)

    const fragment = url.hash.substring(1)

    this.parameterKeys = parameterKeys
      ? [...DEFAULT_PARAMETER_KEYS, ...parameterKeys]
      : DEFAULT_PARAMETER_KEYS
    this.did = didBase
    this.path = path.length > 0 ? path : undefined
    this.query =
      queryParams.size > 0
        ? [...queryParams.entries()].reduce(
            (prev, [k, v]) => ({ [k]: v, ...prev } as Record<string, string>),
            {}
          )
        : undefined
    this.fragment = fragment.length > 0 ? fragment : undefined

    this.parameters = this.query
      ? Object.entries(this.query).reduce((prev, [k, v]) => {
          if (this.parameterKeys?.includes(k)) {
            return { [k]: v, ...prev }
          }
          return prev
        }, {})
      : undefined
  }

  public isDidUrl(): boolean {
    return Boolean(this.path || this.query || this.fragment)
  }

  public static validateDid(did: z.input<typeof stringOrDid>): boolean {
    return stringOrDid.safeParse(did).success
  }

  public static validateDidUrl(did: z.input<typeof stringOrDidUrl>): boolean {
    return stringOrDidUrl.safeParse(did).success
  }

  public validate(): boolean {
    if (this.isDidUrl()) {
      return Did.validateDidUrl(this.toUrl())
    } else {
      return Did.validateDid(this.did)
    }
  }

  public toUrl(): string {
    const path = this.path ? `${PREFIX_PATH}${this.path}` : ''
    const queryString = new URLSearchParams(this.query).toString()
    const query = this.query ? `${PREFIX_QUERY}${queryString}` : ''
    const fragment = this.fragment ? `${PREFIX_FRAGMENT}${this.fragment}` : ''

    return `${this.did}${path}${query}${fragment}`
  }

  public withPath(path: string): this {
    this.path = this.stripOptionalPrefix(path, PREFIX_PATH)
    return this
  }

  public addPath(path: string): this {
    if (this.path) {
      this.path = this.path + this.addPrefixIfNotSupplied(path, PREFIX_PATH)
    } else {
      return this.withPath(path)
    }
    return this
  }

  public removePath(): this {
    this.path = undefined
    return this
  }

  public withQuery(query: Record<string, string>): this {
    this.query = query
    return this
  }

  public addQuery(query: Record<string, string>): this {
    if (this.query) {
      this.query = { ...this.query, ...query }
    } else {
      this.withQuery(query)
    }
    return this
  }

  public removeQuery(): this {
    this.query = undefined
    return this
  }

  public withFragment(fragment: string): this {
    this.fragment = this.stripOptionalPrefix(fragment, PREFIX_FRAGMENT)
    return this
  }

  public removeFragment(): this {
    this.fragment = undefined
    return this
  }

  public get didParts(): DidParts {
    const parts = this.did.split(':')
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
  }

  public get didUrlParts(): DidUrlParts {
    // This is done because the params are calculated based on the query and parameterKeys, but is you set additional parameter keys later on the new parameter field is not updated
    const newDid = new Did(this.toUrl(), this.parameterKeys)

    return {
      fragment: newDid.fragment,
      path: newDid.path,
      query: newDid.query,
      parameters: newDid.parameters,
    }
  }

  private stripOptionalPrefix(s: string, p: string): string {
    if (s.startsWith(p)) {
      return s.slice(1)
    }
    return s
  }

  private addPrefixIfNotSupplied(s: string, p: string): string {
    if (s.startsWith(p)) {
      return s
    }
    return `${p}${s}`
  }

  public addParameterKey(key: string | Array<string>): this {
    if (typeof key === 'string') {
      this.parameterKeys.push(key)
    } else if (Array.isArray(key)) {
      this.parameterKeys.push(...key)
    }

    return this
  }

  public toString() {
    return this.toUrl()
  }

  public toJSON() {
    return this.toString()
  }
}
