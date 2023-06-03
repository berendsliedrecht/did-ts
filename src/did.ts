import { didSchema, didUrlSchema } from './schemas'

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
  private parameterKeys: Array<string> = DEFAULT_PARAMETER_KEYS

  public constructor(did: string) {
    const {
      did: didBase,
      fragment,
      path,
      query,
    } = didUrlSchema(this.parameterKeys).parse(did)
    this.did = didBase
    this.path = path
    this.query = query
    this.fragment = fragment
  }

  public isDidUrl(): boolean {
    return Boolean(this.path || this.query || this.fragment)
  }

  public static validateDid(did: string): boolean {
    return didSchema.safeParse(did).success
  }

  public static validateDidUrl(did: string): boolean {
    return didUrlSchema().safeParse(did).success
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
    return didSchema.parse(this.did)
  }

  public get didUrlParts(): DidUrlParts {
    const { fragment, path, query, parameters } = didUrlSchema(
      this.parameterKeys
    ).parse(this.toUrl())

    return {
      fragment,
      path,
      query,
      parameters,
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
}
