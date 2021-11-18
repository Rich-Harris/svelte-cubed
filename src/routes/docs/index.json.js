import * as fs from 'fs';
import * as path from 'path';
import { make_session_slug_processor } from '@sveltejs/site-kit/utils/slug.js';

const dir = 'src/routes/docs/_content';

export function get() {
	return {
		body: fs
			.readdirSync(dir)
			.map((key) => {
				const filename = `${dir}/${key}/index.svelte.md`;
				if (!fs.existsSync(filename)) return null;

				let match = /---\n([\s\S]+?)\n---\n([\s\S]+)/.exec(fs.readFileSync(filename, 'utf-8'));

				if (!match) {
					throw new Error(`${key} missing frontmatter`);
				}

				const [, frontmatter, content] = match;

				/** @type {Record<string, string>} */
				const metadata = {};

				frontmatter.split('\n').forEach((line) => {
					const [key, value] = line.split(':');
					metadata[key.trim()] = value.trim();
				});

				const path = `/docs/${key.slice(3)}`;
				const sections = [];
				let current = null;
				let current_slug = null;

				const slugify = make_session_slug_processor();

				const pattern = /^##(#)? *(.+)/gm;
				while ((match = pattern.exec(content))) {
					const title = match[2].trim();
					const slug = slugify(title);

					if (match[1]) {
						// subsection
						if (!current) throw new Error(`encountered h3 before h2`);
						current.sections.push({
							title,
							path: `${path}#${current_slug}-${slug}`
						});
					} else {
						current = {
							title,
							path: `${path}#${slug}`,
							sections: []
						};

						current_slug = slug;

						sections.push(current);
					}
				}

				return {
					key,
					path,
					title: metadata.title,
					sections
				};
			})
			.filter(Boolean)
	};
}
