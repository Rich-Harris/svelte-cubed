<script context="module">
	const prefix = './_content/';
	const suffix = '/index.svelte.md';

	const docs = import.meta.glob('./_content/**/index.svelte.md');

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		for (const key in docs) {
			const file = key.slice(prefix.length, -suffix.length);
			if (file.slice(3) === page.params.slug) {
				// remove the numeric prefix
				return {
					props: {
						file,
						module: await docs[key]()
					}
				};
			}
		}
	}
</script>

<script>
	import { Icon } from '@sveltejs/site-kit';

	/** @type {string} */
	export let file;

	/** @type {any} */
	export let module;
</script>

<svelte:head>
	<title>{module.metadata.title} • Svelte Cubed documentation</title>
</svelte:head>

<h1>
	{module.metadata.title}

	<small>
		<a
			href="https://github.com/rich-harris/svelte-cubed/tree/master/src/routes/docs/_content/{file}/index.svelte.md"
			title="edit this section"
		>
			<Icon name="edit" />
		</a>
	</small>
</h1>

<svelte:component this={module && module.default} />
