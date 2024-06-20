import { Aptos } from '@aptos-labs/ts-sdk';

export type TokenData = {
    name: string;
    image: string;
}

export const TOKEN_DATA = `
    query MyQuery($owner_address: String) {
        current_token_ownerships_v2(
            where: {current_token_data: {current_token_ownerships: {current_token_data: {current_collection: {collection_id: {_eq: "0x657d52c6786ba99a341eb3b356a19cb9bf4cf5830f6aa70a45166f40942e6725"}}, current_token_ownerships: {owner_address: {_eq: $owner_address}}}}}}
            limit: 100
        ) {
            current_token_data {
            token_name
            token_uri
            }
        }
    }
    `;

export class Queries {
    readonly provider: Aptos;

    constructor(provider: Aptos) {
        this.provider = provider;
    }

    async queryIndexer<T extends {}>(query: string, variables?: {}): Promise<T> {
        const graphqlQuery = {
          query,
          variables,
        };
        return this.provider.queryIndexer<T>({
          query: graphqlQuery,
        });
      }

    async getTokenData(ownerAddress: string): Promise<TokenData[]> {
        const variables = { ownerAddress };

        const response: any = await this.queryIndexer(TOKEN_DATA, variables);

        const data: TokenData[] = [];

        for (const token of response.current_token_ownerships_v2) {
            // add only tokens that does not exist in the data array
            if (!data.find((t) => t.name === token.current_token_data.token_name)) {
                data.push({
                    name: token.current_token_data.token_name,
                    image: token.current_token_data.token_uri,
                });
            }
        }

        return data;
    }
}