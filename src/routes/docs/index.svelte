<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load() {
		return {
			status: 308,
			redirect: '/docs/getting-started'
		};
	}
</script>
