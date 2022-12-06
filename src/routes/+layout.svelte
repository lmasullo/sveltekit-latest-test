<script>
	// Dependencies
	import { fade } from 'svelte/transition';

	// Import the stylesheets
	import '$css/normalize.css';
	import '$css/base.css';
	import '$css/global.css';

	// Variables
	// Show back to top button with fade
	let visible = false;

	function scrollFunction() {
		// console.log('In scrollFunction');
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			visible = true;
		} else {
			visible = false;
		}
	}

	// Check if window is defined
	if (typeof window !== 'undefined') {
		console.log('Window is defined');
		// Add event listener for scroll
		// When the user scrolls down 20px from the top of the document, show the button
		window.onscroll = function () {
			scrollFunction();
		};
	} else {
		console.log('Window is not defined');
	}
</script>

<svelte:head />
<slot />

{#if visible}
	<button
		id="btnBackTop"
		class="btn btnPrimary"
		transition:fade
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	>
		Top
	</button>
{/if}
