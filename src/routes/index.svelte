<script>
	import { Blurb } from '@sveltejs/site-kit';
	import Hero from '$lib/site/Hero.svelte';
</script>

<svelte:head>
	<title>Svelte Cubed</title>
</svelte:head>

<main>
	<h1 class="visually-hidden">Svelte Cubed</h1>

	<Hero />

	<div class="background">
		<Blurb>
			<div slot="one">
				<h2>The power of Three.js</h2>
				<p>Create beautiful, high-performance 3D apps with the most widely used WebGL framework</p>

				<a href="https://threejs.org">learn Three.js</a>
			</div>

			<div slot="two">
				<h2>The zen of Svelte</h2>
				<p>
					Wrangle complexity with a declarative component framework that lets you write less code
				</p>

				<a href="https://svelte.dev">learn Svelte</a>
			</div>

			<div slot="three">
				<h2>Familiar design</h2>
				<p>
					Use the same tools and techniques you use with your existing Svelte apps — no special
					equipment needed
				</p>

				<a sveltekit:prefetch href="/docs">read the docs</a>
			</div>

			<div class="description" slot="what">
				<p>
					Creating 3D graphics on the web has never been easier or more accessible. Svelte Cubed
					lets you build state-driven Three.js scenes with minimal code.
				</p>

				<p>
					When used with a framework like <a href="https://kit.svelte.dev">SvelteKit</a>, Svelte
					Cubed supercharges your Three.js development with features like hot module reloading,
					giving you the best possible development experience — while also optimising for user
					experience with techniques like treeshaking.
				</p>

				<p>
					Read the <a href="/docs/introduction">documentation</a> and check out the
					<a href="/examples">examples</a> to learn more.
				</p>
			</div>

			<div slot="how">
				<pre><code>npm install svelte-cubed</code></pre>
				<a sveltekit:prefetch href="/docs">get started</a>
			</div>
		</Blurb>
	</div>
</main>

<style>
	/* this is a bit of a hack, but it works */
	.background {
		position: relative;
	}

	.background::before {
		content: '';
		position: absolute;
		background: white;
		width: 100%;
		height: 100%;
		top: 12rem;
	}
</style>
