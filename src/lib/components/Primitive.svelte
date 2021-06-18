<script>
	import { onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { context } from '../utils/context.js';
	import { transform } from '../utils/object.js';
	import * as defaults from '../utils/defaults.js';

	/** @type {THREE.Object3D} */
	export let object;

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

	const { invalidate, parent, self } = context();

	const container = new THREE.Object3D();
	$parent.add(container);

	$: {
		if ($self) {
			container.remove($self);
		}

		if (object) {
			container.add(object);
		}

		$self = object;
		invalidate();
	}

	$: {
		transform(container, position, rotation, scale);
		invalidate();
	}

	onDestroy(() => {
		$parent.remove(container);
		invalidate();
	});
</script>

{#if object}
	<slot></slot>
{/if}