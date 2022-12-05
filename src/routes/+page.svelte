<script>
	// Props from above context and put in a store
	export let data;

	// Variables
	let cats = data.allCategories;
	let facts = data.allFacts;

	console.log('cats on Page', cats);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
