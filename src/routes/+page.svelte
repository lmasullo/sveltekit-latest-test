<script>
	// Dependencies
	import { onMount } from 'svelte';
	import { graphQLClient } from '$helper/graphQl';

	// Props from above context and put in a store
	export let data;

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

	let reactiveFacts = [];

	// Anytime facts is changed, the display will be updated
	// $: reactiveFacts = facts;

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
		document.getElementById('selectCat').selectedIndex = '0';
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
			document.getElementById(imgId).src = 'favblank.png';
			value = false;
		} else {
			document.getElementById(imgId).src = 'fav.png';
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
		let valueTopic = document.getElementById(topicEdit).value;
		let valueFact = document.getElementById(factEdit).value;
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
	<div id="divLoggedIn">
		<div class="center">
			<button id="btnDisplayAdd" class="btn btnPrimary" on:click={fnDisplayAdd}>
				Add New Fact
			</button>
			<br />
			{#if message !== ''}
				<div class="message">
					{message}
				</div>
			{/if}

			{#if showAddFact}
				<div id="divAddFact">
					<!-- <select bind:value={selectedNew}> -->
					<select id="selectCatNew" bind:value={selectedNew}>
						<option value="">Choose a Category New</option>
						{#each cats as cat}
							<option value={cat.medfactsCatID}>{cat.cat}</option>
						{/each}
					</select>
					<br />
					<label for="textTopic">Topic</label>
					<br />
					<input id="textTopic" class="inputEl" type="text" bind:value={newTopic} />
					<br />
					<label for="textAreaFact">Fact</label>
					<textarea id="textAreaFact" bind:value={newFact} cols="30" rows="10" />
					<button id="btnSave" class="btn btnSuccess" on:click={fnSaveNew}> Save New Fact </button>
					<button id="btnCancel" class="btn btnWarning" on:click={fnCancel}> Cancel </button>
					<hr />
				</div>
			{/if}

			<!-- Reactive -->
			{#if !showAddFact}
				<select id="selectCat" bind:value={selected} on:change={fnSelect}>
					<option value="">Choose a Category</option>
					{#each cats as cat}
						<option value={cat.medfactsCatID}>{cat.cat}</option>
					{/each}
				</select>
				<br />
				or Type to Search:
				<br />
				<input type="text" class="inputEl" bind:value={checkString} />
				<br />
				<button class="btn btnSecondary" on:click={showFavs}>Just Favorites</button>
				<button class="btn btnWarning" on:click={reset}>Clear Filters</button>

				<!-- <div>Number of Facts: {reactiveFacts.length}</div> -->
				<br />
				<div>
					<strong>Click Topic to Edit Fact</strong>
				</div>

				{#if isLoading}
					<div id="loading" class="bold">Loading...</div>
				{/if}

				<!-- {#if facts.length === 0 && isLoading === false}
					<div id="loading" class="bold">No Matching Facts</div>
				{/if} -->
			{/if}
			<!-- </div> -->
			{#if !showAddFact}
				<!-- {#each reactiveFacts as fact}
					<div class="card">
						<div class="cardHeading">
							{#if edit === fact.id}
								<input id="topic-{fact.id}" type="text" class="inputEl" value={fact.topic} />
							{:else}
								<div id="cardTopic" on:click={() => fnEdit(fact.id)}>
									{fact.topic}
								</div>
							{/if}
							<div id="favorite">
								{#if fact.favorite === true}
									<img
										id="imgFav-{fact.id}"
										src="fav.png"
										alt="favorite"
										on:click={() => fnFav(fact.id, fact.favorite)}
									/>
								{:else}
									<img
										id="imgFav-{fact.id}"
										src="favblank.png"
										alt="favorite"
										on:click={() => fnFav(fact.id, fact.favorite)}
									/>
								{/if}
							</div>
						</div>
						{#if edit === fact.id}
							<div class="edit">
								<textarea id="fact-{fact.id}" value={fact.fact} />
								<br />
								<button class="btn btnSuccess" on:click={() => fnSave(fact.id)}>
									Save Changes
								</button>
								<button class="btn btnDanger" on:click={() => fnDelete(fact.id)}> Delete </button>
								<button class="btn btnWarning" on:click={fnCancelSave}>Cancel</button>
							</div>
						{:else}
							<div class="fact">{fact.fact}</div>
						{/if}
					</div>
				{/each} -->
			{/if}
		</div>
	</div>
</main>

<style>
</style>
