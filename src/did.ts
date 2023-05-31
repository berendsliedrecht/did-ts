const PREFIX_PATH = '/'
const PREFIX_QUERY = '?'
const PREFIX_FRAGMENT = '#'

export class Did {
  public did: string
  public path: string
  public query: string
  public fragment: string

  public constructor(did: string) {
    const url = new URL(did)
    const prefixPathIndex = url.pathname.indexOf(PREFIX_PATH)

    const stripUntil = Math.min(
      did.indexOf(PREFIX_PATH),
      did.indexOf(PREFIX_QUERY),
      did.indexOf(PREFIX_FRAGMENT)
    )

    this.did = stripUntil !== -1 ? did.slice(0, stripUntil) : did

    this.path = (
      prefixPathIndex !== -1 ? url.pathname.slice(prefixPathIndex) : ''
    ).substring(1)

    this.query = url.search.substring(1)

    this.fragment = url.hash.substring(1)
  }

  public static validate(did: string): boolean {
    const didUrlRegexp =
      /^did:[a-z0-9]+(?::[a-z0-9]+(?:[._-][a-z0-9]+)*)*:(?:[a-z0-9]+(?:[._-][a-z0-9]+)*)?(?:\/[^?\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/i

    return didUrlRegexp.test(did)
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

  private stripOptionalPrefix(s: string, p: string): string {
    if (s.startsWith(p)) {
      return s.slice(1)
    }
    return s
  }
}
