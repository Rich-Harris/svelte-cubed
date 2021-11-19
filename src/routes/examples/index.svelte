<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		return {
			props: {
				examples: await fetch('/examples.json').then((r) => r.json())
			}
		};
	}
</script>

<script>
	/** @type {import('./types').Example[]} */
	export let examples;
</script>

<main>
	<h1>Examples</h1>

	<div class="grid">
		{#each examples as example}
			<a
				href="/examples/{example.slug}"
				style="background-image: url(/example-thumbnails/{example.slug}.jpeg)"
			>
				<span>{example.title}</span>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		margin: 8rem auto;
		max-width: 800px;
	}

	h1 {
		position: relative;
		z-index: 2;
		font-size: 3.2rem;
		margin: 0 0 0.5em 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 200px;
		grid-gap: 1em;
		justify-content: end;
	}

	a {
		position: relative;
		display: flex;
		align-items: end;
		padding: 0.5em;
		background-color: #eee;
		color: white;
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		border-radius: 0.2em;
		overflow: hidden;
	}

	a::before {
		content: '';
		position: absolute;
		display: block;
		width: 100%;
		height: 80px;
		left: 0;
		bottom: 0;
		background: linear-gradient(
			to bottom,
			hsla(0, 0%, 0%, 0) 0%,
			hsla(0, 0%, 0%, 0.01) 8.1%,
			hsla(0, 0%, 0%, 0.036) 15.5%,
			hsla(0, 0%, 0%, 0.078) 22.5%,
			hsla(0, 0%, 0%, 0.132) 29%,
			hsla(0, 0%, 0%, 0.194) 35.3%,
			hsla(0, 0%, 0%, 0.264) 41.2%,
			hsla(0, 0%, 0%, 0.338) 47.1%,
			hsla(0, 0%, 0%, 0.412) 52.9%,
			hsla(0, 0%, 0%, 0.486) 58.8%,
			hsla(0, 0%, 0%, 0.556) 64.7%,
			hsla(0, 0%, 0%, 0.618) 71%,
			hsla(0, 0%, 0%, 0.672) 77.5%,
			hsla(0, 0%, 0%, 0.714) 84.5%,
			hsla(0, 0%, 0%, 0.74) 91.9%,
			hsla(0, 0%, 0%, 0.75) 100%
		);
	}

	a span {
		position: relative;
	}

	@media (min-width: 400px) {
		h1 {
			font-size: 4.2rem;
		}
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 5.4rem;
		}
	}
</style>
