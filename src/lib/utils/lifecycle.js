import { onMount } from 'svelte';

/** @param {(elapsedTime: number, deltaTime: number) => void} callback */
export function onFrame(callback) {
	onMount(() => {
		/** @type {number} */
		let frame;
		let lastTime = 0.0;

		requestAnimationFrame(function loop(frameTime) {
			frame = requestAnimationFrame(loop);
			callback(frameTime, frameTime - lastTime);
			lastTime = frameTime;
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
}
