// Dependencies
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ENDPOINT, TOKEN } from '$helper/Env';

// Set up graphQl connection
async function fnGraphQl() {
	const module = await import('graphql-request');
	const GraphQLClient = module.GraphQLClient;
	const graphQLClient = new GraphQLClient(ENDPOINT, {
		headers: {
			authorization: `Bearer ${TOKEN}`
		}
	});
	return await graphQLClient;
}

export const graphQLClient = fnGraphQl();
