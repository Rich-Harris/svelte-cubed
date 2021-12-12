<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { onFrame } from '$lib/utils/lifecycle.js';

	export let maxPolarAngle = Math.PI;
	export let minPolarAngle = 0;

	let isLocked = false;

	const { root } = setup();
	const dispatch = createEventDispatcher();

	/** @type {PointerLockControls} */
	export let controls = undefined;

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
			if (enableMovement) {
				document.addEventListener('keydown', setPressedKeys);
				document.addEventListener('keyup', removePressedKeys);
			}
			dispatch('lock', e);
		});

		controls.addEventListener('unlock', (e) => {
			isLocked = false;
			if (enableMovement) {
				document.removeEventListener('keydown', setPressedKeys);
				document.removeEventListener('keyup', removePressedKeys);
			}
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

	// Movement stuff only
	/** @type {Record<string | number | symbol, boolean>} */
	export let pressedKeys = {}
	export let speed = 1
	export let enableMovement = false

	const velocity = new THREE.Vector3();
	const direction = new THREE.Vector3();
	/** @type {number} */
	let prevTime;

	let time = performance.now()
	$: if (enableMovement && controls.isLocked) {
		const moveForward = [
			pressedKeys['w'],
			pressedKeys['ArrowUp'],
		].includes(true);

		const moveLeft = [
			pressedKeys['a'],
			pressedKeys['ArrowLeft'],
		].includes(true);

		const moveBackward = [
			pressedKeys['s'],
			pressedKeys['ArrowDown'],
		].includes(true);

		const moveRight = [
			pressedKeys['d'],
			pressedKeys['ArrowRight'],
		].includes(true);

		const moved = moveForward || moveLeft || moveBackward || moveRight;

		if (moved) {
			const delta = (time - prevTime) / 1000;

			velocity.x -= velocity.x * 10 * delta;
			velocity.z -= velocity.z * 10 * delta;

			direction.z = Number( moveForward ) - Number( moveBackward );
			direction.x = Number( moveRight ) - Number( moveLeft );
			direction.normalize(); // this ensures consistent movements in all directions

			if ( moveForward || moveBackward ) velocity.z -= direction.z * delta;
			if ( moveLeft || moveRight ) velocity.x -= direction.x * delta;

			controls.moveRight( -velocity.x * delta * speed * 10 );
			controls.moveForward( -velocity.z * delta * speed * 10);

			root.invalidate();
		} else {
			velocity.set(0,0,0);
		}
	}

	onFrame(() => {
		prevTime = time;
		time = performance.now();
	})

	onDestroy(() => {
		document.removeEventListener('keydown', setPressedKeys);
		document.removeEventListener('keyup', removePressedKeys);
	})

	function setPressedKeys(e) {
		pressedKeys[e.key] = true
	}
	function removePressedKeys(e) {
		pressedKeys[e.key] = false
	}
</script>
