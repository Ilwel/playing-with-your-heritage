import {
  ApolloClient,
  type DocumentNode,
  InMemoryCache,
  type ApolloQueryResult,
  type FetchResult,
  type NormalizedCacheObject,
} from '@apollo/client'

export default class ApiService {
  uri = process.env.API
  private readonly _client = new ApolloClient({
    uri: this.uri,
    cache: new InMemoryCache(),
  })

  public async query<T = Record<string, unknown>>(
    query: DocumentNode,
    headers: Record<string, string> = {}
  ): Promise<ApolloQueryResult<T>> {
    const res = await this._client.query({
      query,
      context: {
        headers,
      },
    })
    return res
  }

  public async mutation<T = Record<string, unknown>>(
    mutation: DocumentNode,
    headers: Record<string, string> = {},
    variables: Record<string, unknown>
  ): Promise<FetchResult<T>> {
    const res = await this._client.mutate({
      mutation,
      variables,
      context: {
        headers,
      },
    })
    return res
  }

  public getClient(): ApolloClient<NormalizedCacheObject> {
    return this._client
  }
}
