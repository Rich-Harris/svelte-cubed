<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
	import { createEventDispatcher } from 'svelte';
	import { onFrame } from '../../utils/lifecycle.js';
	import * as SC from 'svelte-cubed';

	export let maxPolarAngle = Math.PI;
	export let minPolarAngle = 0;
	export let velocity = new THREE.Vector3();

	export let moveForward = false;
	export let moveBackward = false;
	export let moveLeft = false;
	export let moveRight = false;
	export let canJump = false;
	/** @type {SC.Mesh[]} */
	export let objects = [];

	let isLocked = false;
	let prevTime = performance.now();
	const direction = new THREE.Vector3();
	/** @type {THREE.Raycaster} */
	let raycaster

	const { root } = setup();
	const dispatch = createEventDispatcher();

	/** @type {PointerLockControls} */
	let controls;

	root.controls.set((camera, canvas) => {
		raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

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

		canvas.addEventListener('click', () => {
			controls.lock();
		});

		canvas.addEventListener('keydown', (e) => {
			switch (e.code) {
				case 'ArrowUp':
				case 'KeyW':
					moveForward = true;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = true;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = true;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = true;
					break;

				case 'Space':
					if (canJump === true) velocity.y += 350;
					canJump = false;
					break;
			}
		});

		canvas.addEventListener('keyup', (e) => {
			switch (e.code) {
				case 'ArrowUp':
				case 'KeyW':
					moveForward = false;
					break;

				case 'ArrowLeft':
				case 'KeyA':
					moveLeft = false;
					break;

				case 'ArrowDown':
				case 'KeyS':
					moveBackward = false;
					break;

				case 'ArrowRight':
				case 'KeyD':
					moveRight = false;
					break;
			}
		});

		return controls;
	});

	onFrame(() => {
		if (controls && isLocked) {
			const camera = controls.getObject()
			const time = performance.now();

			const delta = (time - prevTime) / 1000;

			velocity.x -= velocity.x * 10.0 * delta;
			velocity.z -= velocity.z * 10.0 * delta;

			velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

			direction.z = Number(moveForward) - Number(moveBackward);
			direction.x = Number(moveRight) - Number(moveLeft);
			direction.normalize(); // this ensures consistent movements in all directions

			if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
			if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

			raycaster.ray.origin.copy( camera.position );
			raycaster.ray.origin.y -= 10;

			console.log(objects);
			// const intersections = raycaster.intersectObjects( objects.map(object => object.mesh), false );

			// const onObject = intersections.length > 0;

			// if (onObject === true) {
			// 	velocity.y = Math.max(0, velocity.y);
			// 	canJump = true;
			// }

			controls.moveRight(-velocity.x * delta);
			controls.moveForward(-velocity.z * delta);

			camera.position.y += velocity.y * delta; // new behavior

			if (camera.position.y < 10) {
				velocity.y = 0;
				camera.position.y = 10;

				canJump = true;
			}

			prevTime = time;
		}
	});

	$: if (controls) {
		controls.isLocked = isLocked;
		controls.maxPolarAngle = maxPolarAngle;
		controls.minPolarAngle = minPolarAngle;
	}
</script>
