<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';
	import { onMount } from 'svelte';

	/** @type {THREE.BufferGeometry} */
	export let geometry;

	export let material = defaults.material;
	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;
	export let castShadow = false;
	export let receiveShadow = false;

	/** @type {'attached' | 'detached'} */
	export let bindMode = 'attached';

	/** @type {import('../../types').Skin | ((geometry: THREE.BufferGeometry, positions: THREE.Vector3[]) => import('../../types').Skin)} */
	export let skin = (geometry, positions) => {
		const position = geometry.attributes.position;
		const vertex = new THREE.Vector3();
		const indices = [];
		const weights = [];

		for (let i = 0; i < position.count; i++) {
			vertex.fromBufferAttribute(position, i);

			const closest = positions.map((position, index) => {
				const distance = vertex.distanceTo(position);
				return { index, weight: 1 / distance };
			}).sort((a, b) => b.weight - a.weight).slice(0, 4);

			// handle special case where bone and vertex are in same position
			if (closest.find(({ weight }) => weight === Infinity)) {
				closest.forEach(({ weight }, i) => {
					closest[i].weight = weight === Infinity ? 1 : 0;
				});
			}

			// normalise weights
			const mag = closest.reduce((total, x) => total + x.weight, 0);
			const normalised = closest.map(({ weight }) => weight / mag);

			indices.push(...closest.map(({ index }) => index));
			weights.push(...normalised);
		}

		console.log({ indices, weights });

		return {
			index: new THREE.Uint16BufferAttribute(indices, 4),
			weight: new THREE.Float32BufferAttribute(weights, 4)
		};
	};

	// TODO morphTargetInfluences, morphTargetDictionary, raycast

	const { root, self } = setup(new THREE.SkinnedMesh(geometry, material));

	onMount(() => {
		/** @type {import('../../types').Skin} */
		let _skin;

		if (typeof skin === 'function') {
			const matrix = new THREE.Matrix4().identity();

			const positions = self.skeleton.bones.map((bone) => {
				matrix.multiplyMatrices(matrix, bone.matrix);
				return new THREE.Vector3().setFromMatrixPosition(matrix);
			});

			_skin = skin(self.geometry, positions);
		} else {
			_skin = skin;
		}

		self.geometry.setAttribute('skinIndex', _skin.index);
		self.geometry.setAttribute('skinWeight', _skin.weight);
	});

	$: {
		if (self.geometry && geometry !== self.geometry) {
			// TODO geometry might be used by another object?
			self.geometry.dispose();
		}

		self.geometry = geometry;
		self.material = material;
		self.castShadow = castShadow;
		self.receiveShadow = receiveShadow;

		self.bindMode = bindMode;

		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

<slot></slot>