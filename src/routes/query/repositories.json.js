import { client } from '$lib/utilities/apolloClient';
import gql from 'graphql-tag';

export async function POST({ request }) {
  try {
    const { limit } = await request.json();
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
      body: JSON.stringify({ data }),
    };
  } catch (err) {
    console.error('Error: ', err);
    return {
      status: 500,
      error: 'Error receiving data',
    };
  }
}
