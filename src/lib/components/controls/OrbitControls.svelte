<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { createEventDispatcher } from 'svelte';
	import { onFrame } from '../../utils/lifecycle.js';

	export let autoRotate = false;
	export let autoRotateSpeed = 2;
	export let dampingFactor = 0.05;
	export let enableDamping = false;
	export let enabled = true;
	export let enablePan = true;
	export let enableRotate = true;
	export let enableZoom = true;
	export let keyPanSpeed = 7;
	export let keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };
	export let maxAzimuthAngle = Infinity;
	export let maxDistance = Infinity;
	export let maxPolarAngle = Math.PI;
	export let maxZoom = Infinity;
	export let minAzimuthAngle = Infinity;
	export let minDistance = 0;
	export let minPolarAngle = 0;
	export let minZoom = 0;
	export let mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.PAN
	};
	export let panSpeed = 1;
	export let rotateSpeed = 1;
	export let screenSpacePanning = true;
	export let touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
	export let zoomSpeed = 1;

	/** @type {import('../../types/common').Position} */
	export let target = [0, 0, 0];

	const { root } = setup();
	const dispatch = createEventDispatcher();

	/** @type {OrbitControls} */
	let controls;

	root.controls.set((camera, canvas) => {
		controls = new OrbitControls(camera, canvas);

		controls.addEventListener('start', (e) => {
			dispatch('start', e);
		});

		controls.addEventListener('end', (e) => {
			dispatch('end', e);
		});

		controls.addEventListener('change', (e) => {
			dispatch('change', e);

			if (
				!target ||
				controls.target.x !== target[0] ||
				controls.target.y !== target[1] ||
				controls.target.z !== target[2]
			) {
				target = [controls.target.x, controls.target.y, controls.target.z];
			}

			root.invalidate();
		});

		// TODO do we need to remove these listeners?

		return controls;
	});

	onFrame(() => {
		if (controls && (autoRotate || enableDamping)) {
			controls.update();
		}
	});

	$: if (
		target &&
		(controls.target.x !== target[0] ||
			controls.target.y !== target[1] ||
			controls.target.z !== target[2])
	) {
		controls.target.set(target[0], target[1], target[2]);

		controls.update();
	}

	$: if (controls) {
		controls.autoRotate = autoRotate;
		controls.autoRotateSpeed = autoRotateSpeed;
		controls.dampingFactor = dampingFactor;
		controls.enableDamping = enableDamping;
		controls.enabled = enabled;
		controls.enablePan = enablePan;
		controls.enableRotate = enableRotate;
		controls.enableZoom = enableZoom;
		controls.keyPanSpeed = keyPanSpeed;
		controls.keys = keys;
		controls.maxAzimuthAngle = maxAzimuthAngle;
		controls.maxDistance = maxDistance;
		controls.maxPolarAngle = maxPolarAngle;
		controls.maxZoom = maxZoom;
		controls.minAzimuthAngle = minAzimuthAngle;
		controls.minDistance = minDistance;
		controls.minPolarAngle = minPolarAngle;
		controls.minZoom = minZoom;
		controls.mouseButtons = mouseButtons;
		controls.panSpeed = panSpeed;
		controls.rotateSpeed = rotateSpeed;
		controls.screenSpacePanning = screenSpacePanning;
		controls.touches = touches;
		controls.zoomSpeed = zoomSpeed;

		controls.update();
	}
</script>
