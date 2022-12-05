const ENDPOINT = "https://api.8base.com/ckb9f8fky000207lb1vuoc6kv";
const TOKEN = "6d8d2cba-7ee7-4b33-b84d-8a7ea2e4691b";
async function fnGraphQl() {
  const module = await import("graphql-request");
  const GraphQLClient = module.GraphQLClient;
  const graphQLClient2 = new GraphQLClient(ENDPOINT, {
    headers: {
      authorization: `Bearer ${TOKEN}`
    }
  });
  return await graphQLClient2;
}
const graphQLClient = fnGraphQl();
export {
  graphQLClient as g
};
