import { onMount } from 'svelte';

/** @param {() => void} callback */
export function onFrame(callback) {
	onMount(() => {
		/** @type {number} */
		let frame;

		requestAnimationFrame(function loop() {
			frame = requestAnimationFrame(loop);
			callback(); // TODO are there useful args we can pass here?
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
}
