import path from 'path';
import adapter from '@sveltejs/adapter-static';
import { preprocess } from './utils/preprocess.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svelte.md'],

	preprocess,

	kit: {
		adapter: adapter(),

		target: '#svelte',

		package: {
			files: (id) => !id.startsWith('site/')
		},

		vite: {
			resolve: {
				alias: {
					'svelte-cubed': path.resolve('src/lib')
				}
			},
			optimizeDeps: {
				include: ['svelte-knobby', '@sveltejs/site-kit'],
				exclude: ['three']
			},
			ssr: {
				noExternal: ['three', 'svelte-knobby', '@sveltejs/site-kit']
			},
			server: {
				fs: {
					allow: [
						// TODO temporary, so that we can link this package
						path.resolve('../../sites/packages/site-kit')
					]
				}
			}
		}
	}
};

export default config;
