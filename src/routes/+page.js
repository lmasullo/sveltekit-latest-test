// Dependencies
import { graphQLClient } from '$helper/graphQl';
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
	console.log('Getting All the Categories and Facts');

	// Await for the graphQLClient promise to resolve
	const newGraphQLClient = await graphQLClient;

	try {
		// Get the users types
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
		console.log('allCategories: ', allCategories);

		// Get all the facts
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
		console.log('allFacts: ', allFacts);

		// End timer
		// const afterAllTypes = Date.now();
		// Convert to seconds
		// const afterAllTypesTotal = (afterAllTypes - beforeAllTypes) / 1000;
		// console.log('afterAllTypes time: ', afterAllTypesTotal);

		// console.log('Getting Facilities');
		// const beforeFacilities = Date.now();
		// // Get the facilities
		// const getFacilities = `
		// query {
		// 	edshiftsfacilitiesList(filter:{
		// 		inactive:{
		// 		equals: false
		// 		},
		// 		deleted:{
		// 			equals: false
		// 		}

		// 	}){items{
		// 		id
		// 		facName
		// 	}}
		// 	}
		// `;
		// const respFacilities = await newGraphQLClient.request(getFacilities);
		// const allFacilities = respFacilities.edshiftsfacilitiesList.items;
		// console.log('allFacilities: ', allFacilities);
		// const afterFacilities = Date.now();
		// const afterFacilitiesTotal = (afterFacilities - beforeFacilities) / 1000;
		// console.log('afterFacilities time: ', afterFacilitiesTotal);

		// if (afterAllTypesTotal > 9) {
		// 	console.log('Slow afterAllTypesTotal response');

		// 	// Get the User Types
		// 	const getAllTypes = `
		//             query {
		//             edshiftsuserTypesList(filter:{
		//                 deleted:{
		//                 equals: false
		//                 }
		//             }){items{
		//                 id
		//                 userTypeName
		//             }}
		//             }
		//             `;
		// 	const respAllTypes = await newGraphQLClient.request(getAllTypes);
		// 	let allTypes = respAllTypes.edshiftsuserTypesList.items;
		// 	console.log('allTypes: ', allTypes);

		// 	const afterAllTypes = Date.now();
		// 	const afterAllTypesTotal = (afterAllTypes - beforeAllTypes) / 1000;

		// 	console.log('afterAllTypes time: ', afterAllTypesTotal);
		// } else if (afterFacilitiesTotal > 9) {
		// 	console.log('Slow afterAllTypesTotal response');
		// 	console.log('Getting Facilities');
		// 	const beforeFacilities = Date.now();
		// 	// Get the facilities
		// 	const getFacilities = `
		//             query {
		//                 edshiftsfacilitiesList(filter:{
		//                     inactive:{
		//                     equals: false
		//                     },
		//                     deleted:{
		//                         equals: false
		//                     }

		//                 }){items{
		//                     id
		//                     facName
		//                 }}
		//                 }
		//             `;
		// 	const respFacilities = await newGraphQLClient.request(getFacilities);
		// 	const allFacilities = respFacilities.edshiftsfacilitiesList.items;
		// 	console.log('allFacilities: ', allFacilities);
		// 	const afterFacilities = Date.now();
		// 	const afterFacilitiesTotal = (afterFacilities - beforeFacilities) / 1000;
		// 	console.log('afterFacilities time: ', afterFacilitiesTotal);
		// }

		return { allCategories, allFacts };
	} catch (error) {
		console.log(error);
		// return error(500, error);
		return { error };
	}
}
