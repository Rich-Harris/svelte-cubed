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
				<h2>Small is beautiful</h2>
				<p>
					Ship only the parts of Three.js you actually need — Svelte Cubed keeps things
					treeshakeable
				</p>

				<a sveltekit:prefetch href="/docs">read the docs</a>
			</div>

			<div class="description" slot="what">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsum, necessitatibus
					eligendi sed amet laborum vel natus quae sint.
				</p>

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ad eligendi veritatis
					perspiciatis iure ducimus quia omnis temporibus veniam ut, fugiat at tempore incidunt
					minus vero molestiae quae odio maxime?
				</p>

				<p>
					Read the <a href="https://svelte.dev/blog/introducing-svelte-cubed">introductory blog</a>
					post to learn more.
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
