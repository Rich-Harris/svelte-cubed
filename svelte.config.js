/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				external: ['three/examples/jsm/controls/OrbitControls.js']
			}
		}
	}
};

export default config;
