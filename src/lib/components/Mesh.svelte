<script>
	import { get_group, get_root } from '$lib/utils/context';
	import * as THREE from 'three';

	/** @type {THREE.BufferGeometry} */
	export let geometry;

	/** @type {THREE.Material} */
	export let material;

	/** @type {[number, number, number]} */
	export let position = [0, 0, 0];

	/** @type {[number, number, number]} */
	export let rotation = [0, 0, 0];

	/** @type {number | [number, number, number]} */
	export let scale = [1, 1, 1];

	const root = get_root();
	const group = get_group();

	/** @type {THREE.Mesh} */
	let mesh;

	$: {
		if (mesh) group.remove(mesh);

		mesh = new THREE.Mesh(geometry, material);
		group.add(mesh);
	}

	$: {
		mesh.position.set(position[0], position[1], position[2]);
		mesh.rotation.set(rotation[0], rotation[1], rotation[2]);

		if (typeof scale === 'number') {
			mesh.scale.set(scale, scale, scale);
		} else {
			mesh.scale.set(scale[0], scale[1], scale[2]);
		}

		root.invalidate();
	}
</script>