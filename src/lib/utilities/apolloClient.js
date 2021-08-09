import fetch from 'node-fetch';
import { ApolloClient } from '@apollo/client/core/core.cjs.js';
import { HttpLink } from '@apollo/client/link/http/http.cjs.js';
import { InMemoryCache } from '@apollo/client/cache/cache.cjs.js';
import { setContext } from '@apollo/client/link/context/context.cjs.js';

class Client {
	constructor() {
		if (Client._instance) {
			return Client._instance;
		}
		Client._instance = this;

		this.client = this.setupClient();
	}

	setupClient() {
		const link = new HttpLink({
			uri: process.env['GRAPHQL_ENDPOINT'],
			fetch
		});
		const authLink = setContext((_, { headers }) => {
			return {
				headers: {
					...headers,
					authorization: `Bearer ${process.env['GITHUB_PERSONAL_ACCESS_TOKEN']}`
				}
			};
		});
		const client = new ApolloClient({
			credentials: 'include',
			link: authLink.concat(link),
			cache: new InMemoryCache()
		});
		return client;
	}
}

export const client = new Client().client;
