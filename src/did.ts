const PREFIX_PATH = '/'
const PREFIX_QUERY = '?'
const PREFIX_FRAGMENT = '#'
const DID_URL_REGEXP =
  /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*:(?:[a-z0-9]+(?:[._-][a-z0-9]+)*)?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i

export type DidParts = {
  scheme: string
  method: string
  namespaces?: Array<string>
  identifier: string
}

export class Did {
  public did: string
  public path: string
  public query: string
  public fragment: string

  public constructor(did: string) {
    const url = new URL(did)
    const prefixPathIndex = url.pathname.indexOf(PREFIX_PATH)

    const stripUntil = Math.min(
      ...[
        did.indexOf(PREFIX_PATH),
        did.indexOf(PREFIX_QUERY),
        did.indexOf(PREFIX_FRAGMENT),
      ].filter((i) => i !== -1)
    )

    this.did = stripUntil !== -1 ? did.slice(0, stripUntil) : did

    this.path = (
      prefixPathIndex !== -1 ? url.pathname.slice(prefixPathIndex) : ''
    ).substring(1)

    this.query = url.search.substring(1)

    this.fragment = url.hash.substring(1)
  }

  public static validate(did: string): boolean {
    return DID_URL_REGEXP.test(did)
  }

  public validate(): boolean {
    return Did.validate(this.toUrl())
  }

  public toUrl(): string {
    const path = this.path ? `${PREFIX_PATH}${this.path}` : ''
    const query = this.query ? `${PREFIX_QUERY}${this.query}` : ''
    const fragment = this.fragment ? `${PREFIX_FRAGMENT}${this.fragment}` : ''

    return `${this.did}${path}${query}${fragment}`
  }

  public withPath(path: string): this {
    const strippedPath = this.stripOptionalPrefix(path, PREFIX_PATH)

    this.path = strippedPath

    return this
  }

  public withQuery(query: string): this {
    const strippedQuery = this.stripOptionalPrefix(query, PREFIX_QUERY)

    this.query = strippedQuery

    return this
  }

  public withFragment(fragment: string): this {
    const strippedFragment = this.stripOptionalPrefix(fragment, PREFIX_FRAGMENT)

    this.fragment = strippedFragment

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

  private stripOptionalPrefix(s: string, p: string): string {
    if (s.startsWith(p)) {
      return s.slice(1)
    }
    return s
  }
}
