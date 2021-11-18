<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const contents = await fetch('/docs.json').then((r) => r.json());

		return {
			props: { contents }
		};
	}
</script>

<script>
	import { Main, Contents } from '@sveltejs/site-kit/components/docs';
	import './styles.css';

	/** @type {import('./types').Section[]} */
	export let contents;

	/** @type {string} */
	let path = null;
</script>

<Main bind:path>
	<h1 slot="header">test</h1>
	<slot />
</Main>

<Contents {contents} {path} />
