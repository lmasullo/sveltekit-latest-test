<script>
	// Dependencies
	import { onMount } from 'svelte';
	import { graphQLClient } from '$helper/graphQl';
	// import { goto } from '$app/navigation';

	// Props from above context and put in a store
	export let data;
	// userTypes.set(data.allCategories);
	// facilities.set(data.allFacts);

	// Variables
	let isLoading = true;
	let showAddFact = false;
	let selected;
	let selectedNew;
	let newTopic;
	let newFact;
	let cats = data.allCategories;
	let facts = data.allFacts;
	let origfacts = data.allFacts;
	let edit;
	let checkString = '';
	let message = '';

	// Anytime facts is changed, the display will be updated
	// $: reactiveFacts = data.allFacts;

	// Reactive statement for the autocomplete, every time a letter is entered, this is triggered because
	// checkString changes, it's bound to the text field
	// $: {
	// 	console.log('In Autocomplete');
	// 	console.log(checkString);

	// 	// let elSelect = document.getElementById('selectCat');
	// 	// if (elSelect) {
	// 	// 	elSelect.selectedIndex = '0';
	// 	// }

	// 	// Filter based on autocomplete
	// 	let filteredFacts = origfacts.filter(
	// 		(fact) =>
	// 			fact.fact.toLowerCase().includes(checkString.toLowerCase()) ||
	// 			fact.topic.toLowerCase().includes(checkString.toLowerCase())
	// 	);
	// 	console.log('Filtered Facts: ', filteredFacts);

	// 	// Update facts
	// 	facts = filteredFacts;
	// }

	function fnSelect() {
		console.log('In fnSelect');
		console.log(selected);

		const filteredTopics = origfacts.filter((fact) => fact.medfactsCatId === selected);

		//let filteredTopics = facts.filter(fact => (fact.medfactsCatId = 1));
		console.log('Filtered Facts in fnSelect: ', filteredTopics);

		facts = filteredTopics;
	}

	function fnDisplayAdd() {
		console.log('In fnDisplayAdd');
		showAddFact = true;
	}

	async function fnSaveNew() {
		console.log('In saveNew');
		// Await for the graphQLClient promise to resolve
		const newGraphQLClient = await graphQLClient;

		console.log(selectedNew);
		console.log(newTopic);
		console.log(newFact);

		if (selectedNew === undefined || newTopic === undefined || newFact === undefined) {
			message = 'Please fill out all fields';
			return;
		}

		let createNewFact = `mutation {
      medfactsFactCreate(data: {
        userId: 1,
        medfactsCatId: ${selectedNew}, 
        topic: "${newTopic}",
        fact: """${newFact}""",
        userEditId: 1
      }) {
        id
        topic
      }
    }`;
		const respNewFact = await newGraphQLClient.request(createNewFact);
		console.log(respNewFact);
		message = 'Fact Added!';

		showAddFact = false;

		// Hide the message div after 3 secs
		setTimeout(fnHideMessage, 3000);
	}

	function fnCancel() {
		console.log('In fnCancel');
		showAddFact = false;
	}

	function showFavs() {
		console.log('In showFavs');
		const favTopics = origfacts.filter((fact) => fact.favorite === true);
		facts = favTopics;
	}

	function reset() {
		console.log('In reset');
		// document.getElementById('selectCat').selectedIndex = '0';
		checkString = '';
		facts = origfacts;
	}

	function fnHideMessage() {
		console.log('In fnHideMessage');
		message = '';
	}

	function fnEdit(id) {
		console.log('In fnEdit');
		edit = id;
	}

	async function fnFav(id, isFav) {
		console.log('In fnFav');
		console.log('ID: ', id);
		let imgId = `imgFav-${id}`;
		console.log('Image ID: ', imgId);
		console.log('isFav: ', isFav);

		// Await for the graphQLClient promise to resolve
		const newGraphQLClient = await graphQLClient;

		// Declare value to save as the new favorite value 0 or 1
		let value;

		//Change source of favorite image
		// if (imgClicked === "imgFavBlank") {
		if (isFav) {
			// document.getElementById(imgId).src = 'favblank.png';
			value = false;
		} else {
			// document.getElementById(imgId).src = 'fav.png';
			value = true;
		}

		// Update the fact with new favorite value
		const favUpdate = `
		mutation {
  	medfactsFactUpdate(data: {
    id: "${id}",
    favorite: ${value}
      }) {
        id,
        topic,
        fact,
        favorite     
      }
    }`;
		await newGraphQLClient.request(favUpdate);

		// Update the favorite value in the facts array
		let foundIndex = facts.findIndex((x) => x.id == id);
		facts[foundIndex].favorite = value;
	}

	async function fnSave(id) {
		// Await for the graphQLClient promise to resolve
		const newGraphQLClient = await graphQLClient;

		console.log('In fnSave');
		console.log('ID: ', id);

		let topicEdit = `topic-${id}`;
		let factEdit = `fact-${id}`;

		// Get the value from the textarea
		// let valueTopic = document.getElementById(topicEdit).value;
		// let valueFact = document.getElementById(factEdit).value;
		console.log('Value Topic: ', valueTopic);
		console.log('Value Fact: ', valueFact);

		// Update the fact
		const factUpdate = `
		mutation {
  	medfactsFactUpdate(data: {
    id: "${id}",
    topic: "${valueTopic}",
    fact: """${valueFact}""",
      }) {
        id,
        topic,
        fact      
      }
    }`;

		const respUpdatedFact = await newGraphQLClient.request(factUpdate);
		console.log(respUpdatedFact);
		edit = false;
		message = 'Fact Updated!';

		//Update the facts array
		let foundIndex = facts.findIndex((x) => x.id == id);
		facts[foundIndex].topic = valueTopic;
		facts[foundIndex].fact = valueFact;

		// Hide the message div after 3 secs
		setTimeout(fnHideMessage, 3000);
	}

	async function fnDelete(id) {
		console.log('In fnDelete');
		console.log('ID: ', id);

		// Await for the graphQLClient promise to resolve
		const newGraphQLClient = await graphQLClient;

		// Update the fact
		const factDelete = `
		mutation {
  	medfactsFactUpdate(data: {
    id: "${id}",
    deleted: true
      }) {
        id
        deleted 
      }
    }`;

		await newGraphQLClient.request(factDelete);

		edit = false;
		message = 'Fact Deleted!';

		// Update origfacts db, delete the fact
		let foundIndex = origfacts.findIndex((x) => x.id == id);
		origfacts.splice(foundIndex, 1);

		let foundIndex2 = facts.findIndex((x) => x.id == id);
		facts.splice(foundIndex2, 1);

		//fnSelect();
		selected = null;
		checkString = '';

		setTimeout(fnHideMessage, 3000);
	}

	function fnCancelSave() {
		console.log('In fnCancelSave');
		edit = false;
	}

	onMount(async () => {
		console.log('The Index Page has mounted');

		// Set the isLoading variable to false
		isLoading = false;
	});
</script>

<main>
	<h1 class="center">Medfacts</h1>
</main>

<style>
</style>
