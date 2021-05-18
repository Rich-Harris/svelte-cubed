<script>
	import { get_group, get_root } from '../utils/context.js';
	import * as THREE from 'three';

	/** @type {THREE.Object3D} */
	export let object;

	/** @type {[number, number, number]} */
	export let position = [0, 0, 0];

	/** @type {[number, number, number]} */
	export let rotation = [0, 0, 0];

	/** @type {number | [number, number, number]} */
	export let scale = 1;

	const root = get_root();
	const group = get_group();
	const container = new THREE.Object3D();

	group.add(container);

	/** @type {THREE.Object3D} */
	let previous_object;

	$: {
		if (previous_object) {
			container.remove(previous_object);
		}

		if (object) {
			container.add(object);
		}

		previous_object = object;
	}

	$: {
		container.position.set(position[0], position[1], position[2]);
		container.rotation.set(rotation[0], rotation[1], rotation[2]);

		if (typeof scale === 'number') {
			container.scale.set(scale, scale, scale);
		} else {
			container.scale.set(scale[0], scale[1], scale[2]);
		}

		root.invalidate();
	}
</script>