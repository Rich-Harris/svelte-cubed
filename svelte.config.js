/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',

		package: {
			exports: {
				// include: ['**/*.svelte']
			}
		},

		vite: {
			optimizeDeps: {
				include: ['svelte-knobby'],
				exclude: ['three']
			},
			ssr: {
				noExternal: ['three', 'svelte-knobby']
			}
		}
	}
};

export default config;
