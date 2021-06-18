<script>
	import * as THREE from 'three';
	import { setup } from '../utils/context.js';
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

	// TODO morphTargetInfluences, morphTargetDictionary, raycast

	const { root, self } = setup(new THREE.Mesh());

	$: {
		if (self.geometry && geometry !== self.geometry) {
			// TODO geometry might be used by another object?
			self.geometry.dispose();
		}

		self.geometry = geometry;
		self.material = material;
		self.castShadow = castShadow;
		self.receiveShadow = receiveShadow;
		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

<slot></slot>