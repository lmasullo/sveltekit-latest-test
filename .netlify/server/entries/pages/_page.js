import { g as graphQLClient } from "../../chunks/graphQl.js";
async function load() {
  console.log("Getting All the Categories and Facts");
  const newGraphQLClient = await graphQLClient;
  try {
    const getAllCategories = `
  query {
    medfactsCatsList{
      items{
        medfactsCatID
        cat
      }
    }
  }
  `;
    const respAllCategories = await newGraphQLClient.request(getAllCategories);
    const allCategories = respAllCategories.medfactsCatsList.items;
    const getAllFacts = `
    query {
      medfactsFactsList(filter:{
        deleted:{equals: false}})
        {
          items{
            id
            medfactsCatId
            topic
            fact
            favorite
            deleted
          }
      }
    }
    `;
    const respAllFacts = await newGraphQLClient.request(getAllFacts);
    const allFacts = respAllFacts.medfactsFactsList.items;
    return { allCategories, allFacts };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
export {
  load
};
