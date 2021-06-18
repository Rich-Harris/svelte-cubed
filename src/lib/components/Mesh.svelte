<script>
	import { onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { context } from '../utils/context.js';
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

	/** @type {import('../types/context').Context<import('three').Mesh>} */
	const { invalidate, parent, self } = context();

	$: {
		if ($self) {
			// TODO need to move children to new object
			$parent.remove($self);

			// TODO geometry might be used by another object?
			if ($self.geometry !== geometry) {
				$self.geometry.dispose();
			}
		}

		$self = new THREE.Mesh(geometry, material);
		$parent.add($self);
		invalidate();
	}

	$: {
		$self.castShadow = castShadow;
		$self.receiveShadow = receiveShadow;
		transform($self, position, rotation, scale);
		invalidate();
	}

	onDestroy(() => {
		$parent.remove($self);
		invalidate();
	});
</script>

<slot></slot>