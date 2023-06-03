import { DidParts, DidUrlParts } from 'did'

export const DIDS: Record<string, { parts: DidParts; urlParts: DidUrlParts }> =
  {
    'did:key:z6Mkon4zmgRrGa5zsXSM3irBdFqRrzQdQuHkmnViw4Bjie57#z6Mkon4zmgRrGa5zsXSM3irBdFqRrzQdQuHkmnViw4Bjie57':
      {
        parts: {
          scheme: 'did',
          method: 'key',
          namespaces: undefined,
          identifier: 'z6Mkon4zmgRrGa5zsXSM3irBdFqRrzQdQuHkmnViw4Bjie57',
        },
        urlParts: {
          path: undefined,
          query: undefined,
          fragment: 'z6Mkon4zmgRrGa5zsXSM3irBdFqRrzQdQuHkmnViw4Bjie57',
          parameters: undefined,
        },
      },
    'did:key:z6MktP1rfftmkqV4HCCiRsmNj4tgbisxwocEVry6mKHoNiVu#z6MktP1rfftmkqV4HCCiRsmNj4tgbisxwocEVry6mKHoNiVu':
      {
        parts: {
          scheme: 'did',
          method: 'key',
          namespaces: undefined,
          identifier: 'z6MktP1rfftmkqV4HCCiRsmNj4tgbisxwocEVry6mKHoNiVu',
        },
        urlParts: {
          path: undefined,
          query: undefined,
          fragment: 'z6MktP1rfftmkqV4HCCiRsmNj4tgbisxwocEVry6mKHoNiVu',
          parameters: undefined,
        },
      },
    'did:sov:2wJPyULfLLnYTEFYzByfUR': {
      parts: {
        scheme: 'did',
        method: 'sov',
        namespaces: undefined,
        identifier: '2wJPyULfLLnYTEFYzByfUR',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:sov:HR6vs6GEZ8rHaVgjg2WodM': {
      parts: {
        scheme: 'did',
        method: 'sov',
        namespaces: undefined,
        identifier: 'HR6vs6GEZ8rHaVgjg2WodM',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w': {
      parts: {
        scheme: 'did',
        method: 'ion',
        namespaces: undefined,
        identifier: 'EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:ala:quor:redT:ec27f358fd0d11d8934ceb51305622ae79b6ad15': {
      parts: {
        scheme: 'did',
        method: 'ala',
        namespaces: ['quor', 'redT'],
        identifier: 'ec27f358fd0d11d8934ceb51305622ae79b6ad15',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:evan:testcore:0x126E901F6F408f5E260d95c62E7c73D9B60fd734': {
      parts: {
        scheme: 'did',
        method: 'evan',
        namespaces: ['testcore'],
        identifier: '0x126E901F6F408f5E260d95c62E7c73D9B60fd734',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:cheqd:testnet:55dbc8bf-fba3-4117-855c-1e0dc1d3bb47': {
      parts: {
        scheme: 'did',
        method: 'cheqd',
        namespaces: ['testnet'],
        identifier: '55dbc8bf-fba3-4117-855c-1e0dc1d3bb47',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:key:abc': {
      parts: {
        scheme: 'did',
        method: 'key',
        namespaces: undefined,
        identifier: 'abc',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: undefined,
        parameters: undefined,
      },
    },
    'did:key:abc/some-path?versionId=1#key-1': {
      parts: {
        scheme: 'did',
        method: 'key',
        namespaces: undefined,
        identifier: 'abc',
      },
      urlParts: {
        path: 'some-path',
        query: { versionId: '1' },
        fragment: 'key-1',
        parameters: { versionId: '1' },
      },
    },
    'did:example:123456?versionId=1': {
      parts: {
        scheme: 'did',
        method: 'example',
        namespaces: undefined,
        identifier: '123456',
      },
      urlParts: {
        path: undefined,
        query: { versionId: '1' },
        fragment: undefined,
        parameters: { versionId: '1' },
      },
    },
    'did:example:123#public-key-0': {
      parts: {
        scheme: 'did',
        method: 'example',
        namespaces: undefined,
        identifier: '123',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: 'public-key-0',
        parameters: undefined,
      },
    },
    'did:example:123?service=agent&relativeRef=/credentials#degree': {
      parts: {
        scheme: 'did',
        method: 'example',
        namespaces: undefined,
        identifier: '123',
      },
      urlParts: {
        path: undefined,
        query: { service: 'agent', relativeRef: '/credentials' },
        fragment: 'degree',
        parameters: { service: 'agent', relativeRef: '/credentials' },
      },
    },
    'did:example:123?service=files&relativeRef=/resume.pdf': {
      parts: {
        scheme: 'did',
        method: 'example',
        namespaces: undefined,
        identifier: '123',
      },
      urlParts: {
        path: undefined,
        query: { service: 'files', relativeRef: '/resume.pdf' },
        fragment: undefined,
        parameters: { service: 'files', relativeRef: '/resume.pdf' },
      },
    },
    'did:example:123#_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A': {
      parts: {
        scheme: 'did',
        method: 'example',
        namespaces: undefined,
        identifier: '123',
      },
      urlParts: {
        path: undefined,
        query: undefined,
        fragment: '_Qq0UL2Fq651Q0Fjd6TvnYE-faHiOpRlPVQcY_-tA4A',
        parameters: undefined,
      },
    },
  }
