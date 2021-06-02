<script>
	import * as THREE from 'three';
	import { writable } from 'svelte/store';
	import { get_group, get_root, set_object } from '../utils/context.js';
	import { transform } from '../utils/object.js';

	/** @type {THREE.BufferGeometry} */
	export let geometry;

	/** @type {THREE.Material} */
	export let material;

	export let castShadow = false;
	export let receiveShadow = false;

	/** @type {import('../types').Position} */
	export let position = [0, 0, 0];

	/** @type {import('../types').Rotation} */
	export let rotation = [0, 0, 0];

	/** @type {import('../types').Scale} */
	export let scale = [1, 1, 1];

	const { invalidate } = get_root();
	const group = get_group();

	const context = {
		current: writable(undefined)
	};

	set_object(context);

	/** @type {THREE.Mesh} */
	let object;

	/** @type {THREE.BufferGeometry} */
	let previous_geometry = null;

	$: {
		if (object) group.remove(object);

		object = new THREE.Mesh(geometry, material);
		group.add(object);

		context.current.set(object);

		if (previous_geometry && previous_geometry !== geometry) previous_geometry.dispose();
		previous_geometry = geometry;
	}

	$: {
		object.castShadow = castShadow;
		object.receiveShadow = receiveShadow;
		transform(object, position, rotation, scale);
		invalidate();
	}
</script>

{#if object}
	<slot></slot>
{/if}