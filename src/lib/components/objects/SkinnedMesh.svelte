<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';

	/** @type {THREE.BufferGeometry} */
	export let geometry;

	export let material = defaults.material;
	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;
	export let castShadow = false;
	export let receiveShadow = false;
	export let frustumCulled = true;
	export let renderOrder = 0;

	/** @type {'attached' | 'detached'} */
	export let bindMode = 'attached';

	/** @typedef {{ index: number, position: THREE.Vector3 }} SkeletonNode */
	/** @typedef {{ a: SkeletonNode, b: SkeletonNode, ab: THREE.Vector3 }} Capsule */

	const { root, self } = setup(new THREE.SkinnedMesh(geometry, material));

	$: {
		if (self.geometry && geometry !== self.geometry) {
			// TODO geometry might be used by another object?
			self.geometry.dispose();
		}

		self.geometry = geometry;
		self.material = material;
		self.castShadow = castShadow;
		self.receiveShadow = receiveShadow;
		self.frustumCulled = frustumCulled;
		self.renderOrder = renderOrder;

		self.bindMode = bindMode;

		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

<slot />
