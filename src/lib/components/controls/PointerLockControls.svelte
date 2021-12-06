<script>
	import { setup } from '../../utils/context.js';
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
	import { createEventDispatcher } from 'svelte';

	export let maxPolarAngle = Math.PI;
	export let minPolarAngle = 0;

	let isLocked = false;

	const { root } = setup();
	const dispatch = createEventDispatcher();

	/** @type {PointerLockControls} */
	let controls;

	root.controls.set((camera, canvas) => {

		controls = new PointerLockControls(camera, canvas);

		controls.addEventListener('start', (e) => {
			dispatch('start', e);
		});

		controls.addEventListener('end', (e) => {
			dispatch('end', e);
		});

		controls.addEventListener('lock', (e) => {
			isLocked = true;
			dispatch('lock', e);
		});

		controls.addEventListener('unlock', (e) => {
			isLocked = false;
			dispatch('unlock', e);
		});

		// allows rotating the camera
		controls.addEventListener('change', (e) => {
			dispatch('change', e);

			root.invalidate();
		});

		canvas.addEventListener('click', () => {
			controls.lock();
		});

		return controls;
	});

	$: if (controls) {
		controls.isLocked = isLocked;
		controls.maxPolarAngle = maxPolarAngle;
		controls.minPolarAngle = minPolarAngle;
	}
</script>
