<script>
	import { writable } from 'svelte/store';
	import * as THREE from 'three';
	import { get_group, get_root, set_object } from '../utils/context.js';
	import { transform } from '../utils/object.js';
	import * as defaults from '../utils/defaults.js';

	/** @type {THREE.Object3D} */
	export let object;

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

	const { invalidate } = get_root();
	const group = get_group();
	const container = new THREE.Object3D();

	group.add(container);

	const context = {
		current: writable(undefined)
	};

	set_object(context);

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
		context.current.set(object);

		invalidate();
	}

	$: {
		transform(container, position, rotation, scale);
		invalidate();
	}
</script>

{#if object}
	<slot></slot>
{/if}