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
	export let castShadow = false;
	export let receiveShadow = false;
	export let frustumCulled = true;
	export let renderOrder = 0;

	const { root, self } = setup(new THREE.Object3D());

	/** @type {THREE.Object3D} */
	let previous;

	$: {
		object.traverse(node => {
			if (node instanceof THREE.Mesh) {
				node.castShadow = castShadow;
				node.receiveShadow = receiveShadow;
				node.frustumCulled = frustumCulled;
			}
		})
	}

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
		self.castShadow = castShadow;
		self.receiveShadow = receiveShadow;
		self.frustumCulled = frustumCulled;
		self.renderOrder = renderOrder;

		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

{#if object}
	<slot></slot>
{/if}