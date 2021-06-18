<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';

	/** @type {THREE.Object3D} */
	export let object;

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

	const { root, self } = setup(new THREE.Object3D());

	/** @type {THREE.Object3D} */
	let previous;

	$: {
		if (previous) {
			self.remove(previous);
		}

		if (object) {
			self.add(object);
		}

		previous = object;
		root.invalidate();
	}

	$: {
		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

{#if object}
	<slot></slot>
{/if}