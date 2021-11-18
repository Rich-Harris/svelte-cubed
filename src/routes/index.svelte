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

	<Blurb>
		<div slot="one">
			<h2>The power of Three.js</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsum, necessitatibus
				eligendi sed amet laborum vel natus quae sint.
			</p>

			<a href="https://threejs.org">learn Three.js</a>
		</div>

		<div slot="two">
			<h2>The zen of Svelte</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsum, necessitatibus
				eligendi sed amet laborum vel natus quae sint.
			</p>

			<a href="https://svelte.dev">learn Svelte</a>
		</div>

		<div slot="three">
			<h2>TODO</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ipsum, necessitatibus
				eligendi sed amet laborum vel natus quae sint.
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
				perspiciatis iure ducimus quia omnis temporibus veniam ut, fugiat at tempore incidunt minus
				vero molestiae quae odio maxime?
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
</main>

<style>
</style>
