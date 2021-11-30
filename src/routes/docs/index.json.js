import * as fs from 'fs';
import { make_session_slug_processor } from '@sveltejs/site-kit/utils/slug.js';

const dir = 'src/routes/docs/_content';

export function get() {
	return {
		body: fs
			.readdirSync(dir)
			.map((key) => {
				const filename = `${dir}/${key}/index.svelte.md`;
				if (!fs.existsSync(filename)) return null;

				let match_list = fs.readFileSync(filename, 'utf-8').split("---")
				// first is before first --- line, which is blank
				if (match_list.length != 3) {
					throw new Error(`${key} missing frontmatter`);
				}
				const [, frontmatter, content] = match_list;

				/** @type {Record<string, string>} */
				const metadata = {};
				frontmatter.split('\n').forEach((line) => {
					if (line.includes(":")) {
						const [key, value] = line.split(':');
						metadata[key.trim()] = value.trim();
					}
				});

				const path = `/docs/${key.slice(3)}`;
				const sections = [];
				let current = null;
				let current_slug = null;

				const slugify = make_session_slug_processor();

				const pattern = /^##(#)? *(.+)/gm;
				while ((match_list = pattern.exec(content))) {
					const title = match_list[2].trim();

					if (match_list[1]) {
						// subsection
						if (!current) throw new Error(`encountered h3 before h2`);
						current.sections.push({
							title,
							path: `${path}#${slugify(`${current_slug}-${title}`)}`
						});
					} else {
						current_slug = slugify(title);

						current = {
							title,
							path: `${path}#${current_slug}`,
							sections: []
						};

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
