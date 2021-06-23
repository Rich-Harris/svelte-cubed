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
	export let renderOrder = 0;

	/** @type {'attached' | 'detached'} */
	export let bindMode = 'attached';

	/** @typedef {{ index: number, position: THREE.Vector3 }} SkeletonNode */
	/** @typedef {{ a: SkeletonNode, b: SkeletonNode, ab: THREE.Vector3 }} Capsule */

	/** @type {import('../../types').Skin | ((geometry: THREE.BufferGeometry, capsules: Capsule[]) => import('../../types').Skin)} */
	export let skin = (geometry, capsules) => {
		const position = geometry.attributes.position;
		const vertex = new THREE.Vector3();
		const indices = [];
		const weights = [];

		/**
		 * @param {THREE.Vector3} vertex
		 * @param {Capsule} capsule
		 */
		function distance_to_capsule(vertex, capsule) {
			const length = capsule.ab.length();
			const unit = capsule.ab.clone().normalize();

			const vector = new THREE.Vector3().subVectors(vertex, capsule.a.position);

			const dot_product = vector.dot(unit);
			const t = dot_product / length;

			if (t <= 0) {
				return {
					t: 0,
					d: vertex.distanceTo(capsule.a.position)
				};
			} else if (t >= 1) {
				return {
					t: 1,
					d: vertex.distanceTo(capsule.b.position)
				};
			} else {
				const projected = capsule.ab.clone().multiplyScalar(t).add(capsule.a.position);
				return {
					d: vertex.distanceTo(projected),
					t
				};
			}
		}

		for (let i = 0; i < position.count; i++) {
			vertex.fromBufferAttribute(position, i);

			const closest = capsules.map((capsule, index) => {
				const { d, t } = distance_to_capsule(vertex, capsule);
				return { capsule, d, t };
			}).sort((a, b) => a.d - b.d)[0];

			indices.push(closest.capsule.a.index, closest.capsule.b.index, 0, 0);
			weights.push(1 - closest.t, closest.t, 0, 0);
		}

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
			/** @type {Capsule[]} */
			const capsules = [];

			/**
			 * @param {THREE.Bone} bone
			 * @param {SkeletonNode} parent
			 * @param {THREE.Matrix4} matrix
			 */
			const add_bone = (bone, parent, matrix) => {
				matrix.multiplyMatrices(matrix, bone.matrix);
				const position = new THREE.Vector3().setFromMatrixPosition(matrix);

				const node = {
					index: self.skeleton.bones.indexOf(bone),
					position
				};

				if (parent) {
					capsules.push({
						a: parent,
						b: node,
						ab: new THREE.Vector3().subVectors(node.position, parent.position)
					});
				}

				bone.children.forEach(child => {
					if (/** @type {THREE.Bone} */ (child).isBone) {
						add_bone(/** @type {THREE.Bone} */ (child), node, matrix.clone());
					}
				});
			};

			self.skeleton.bones.filter(bone => bone.parent === self).forEach(bone => {
				const matrix = new THREE.Matrix4().identity();
				add_bone(bone, null, matrix);
			});

			_skin = skin(self.geometry, capsules);
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
		self.renderOrder = renderOrder;

		self.bindMode = bindMode;

		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

<slot></slot>