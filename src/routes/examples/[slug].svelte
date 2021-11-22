<script context="module">
	const prefix = './_content/';
	const suffix = '/index.svelte';

	const examples = import.meta.glob('./_content/**/index.svelte');
	const meta = import.meta.glob('./_content/**/meta.json');

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		for (const key in examples) {
			const file = key.slice(prefix.length, -suffix.length);
			if (file.slice(3) === page.params.slug) {
				// remove the numeric prefix
				return {
					props: {
						file,
						metadata: await meta[`./_content/${file}/meta.json`](),
						module: await examples[key]()
					}
				};
			}
		}
	}
</script>

<script>
	/** @type {string} */
	export let file;

	/** @type {Record<string, string>} */
	export let metadata;

	/** @type {any} */
	export let module;
</script>

<svelte:head>
	<title>{metadata.title} • Svelte Cubed examples</title>
</svelte:head>

<main>
	<svelte:component this={module && module.default} />
</main>

<a
	target="_blank"
	href="https://github.com/Rich-Harris/svelte-cubed/tree/main/src/routes/examples/_content/{file}/index.svelte"
>
	view source code
</a>

<style>
	main {
		min-height: 100vh;
	}

	a {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		background: white url(/icons/source.svg) 50% 50% no-repeat;
		background-size: 50% 50%;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		text-indent: -9999px;
		opacity: 0.3;
		transition: opacity 0.4s;
	}

	a:hover {
		opacity: 1;
	}
</style>
