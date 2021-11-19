import * as fs from 'fs';
import glob from 'tiny-glob/sync.js';

const cwd = 'src/routes/examples/_content';

export function get() {
	return {
		body: glob('**/meta.json', { cwd })
			.map((file) => {
				const filename = `${cwd}/${file}`;
				const meta = JSON.parse(fs.readFileSync(filename, 'utf-8'));

				const slug = file.slice(3, -'/meta.json'.length);

				return {
					...meta,
					slug
				};
			})
			.filter(Boolean)
	};
}
