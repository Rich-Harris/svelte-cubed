<script>
	import { writable } from 'svelte/store';
	import * as THREE from 'three';
	import { get_group, get_root, set_object } from '../utils/context.js';
	import { transform } from '../utils/object.js';

	/** @type {THREE.Object3D} */
	export let object;

	/** @type {[number, number, number]} */
	export let position = [0, 0, 0];

	/** @type {[number, number, number, import('../types').EulerOrder?]} */
	export let rotation = [0, 0, 0];

	/** @type {number | [number, number, number]} */
	export let scale = 1;

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