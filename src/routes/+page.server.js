import { client } from '$lib/utilities/apolloClient';
import gql from 'graphql-tag';

/** @type {import('../../.svelte-kit/types/src/routes/$types').PageLoad} */
export async function load() {
	const limit = 5;
	const query = gql`
		query RepositoriesQuery($limit: Int) {
			viewer {
				login
				name
				repositories(first: $limit, orderBy: { field: STARGAZERS, direction: DESC }) {
					nodes {
						id
						createdAt
						name
						description
						resourcePath
						pushedAt
						stargazerCount
					}
				}
			}
		}
	`;
	const { data } = await client.query({
		query,
		variables: { limit },
	});

	return {
		data,
	};
}
