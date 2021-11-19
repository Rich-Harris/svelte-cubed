// for whatever reason, this script doesn't work — need to manually take screenshots for now
import fs from 'fs';
import { spawn } from 'child_process';
import { chromium } from 'playwright-chromium';
import * as ports from 'port-authority';

await ports.kill(3000);

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ javaScriptEnabled: true });
const page = await context.newPage();

page.on('console', (msg) => console.log(msg.text()));

const process = spawn('npm', ['run', 'preview'], {
	stdio: 'inherit'
});

await ports.wait(3000);

for (const slug of ['hello-world']) {
	console.group(`screenshotting ${slug}`);
	const file = `src/routes/examples/${slug}/index.svelte`;
	if (!fs.existsSync(file)) continue;

	await page.goto(`http://localhost:3000/examples/${slug}`);

	await page.evaluate(() => {
		const knobby = document.querySelector('.knobby');
		if (knobby) knobby.style.display = 'none';

		document.querySelector('header').style.display = 'none';

		return new Promise((f) => setTimeout(f, 1000));
	});

	const buffer = await page.screenshot();

	fs.writeFileSync(`static/example-thumbnails/${slug}.png`, buffer);
	console.groupEnd();
}

console.log('closing browser');
browser.close();

console.log('killing process');
process.kill();
