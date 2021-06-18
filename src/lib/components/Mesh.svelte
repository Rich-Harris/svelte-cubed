<script>
	import * as THREE from 'three';
	import { writable } from 'svelte/store';
	import { get_group, get_root, set_object } from '../utils/context.js';
	import { transform } from '../utils/object.js';
	import * as defaults from '../utils/defaults.js';

	/** @type {THREE.BufferGeometry} */
	export let geometry;

	export let material = defaults.material;
	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;
	export let castShadow = false;
	export let receiveShadow = false;

	const { invalidate } = get_root();
	const group = get_group();

	const context = {
		current: writable(undefined)
	};

	set_object(context);

	/** @type {THREE.Mesh} */
	let object;

	$: {
		if (object) {
			group.remove(object); // TODO need to move children to new object
			if (object.geometry !== geometry) object.geometry.dispose();
		}

		object = new THREE.Mesh(geometry, material);
		group.add(object);

		context.current.set(object);
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