<script>
	import '../app.css'
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
</script>

<svelte:head>
	<title>Poker Planning</title>
</svelte:head>

<html class="flex flex-col h-screen bg-base-200" lang="en-US">
	<Header />

	<main class="grow p-2">
		<slot />
	</main>

	<Footer />
</html>
