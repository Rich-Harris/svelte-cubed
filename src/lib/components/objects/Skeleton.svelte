<script>
	import { setContext, onMount } from 'svelte';
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';

	const { parent } = setup();

	const mesh = /** @type {THREE.SkinnedMesh} */ (parent);

	if (!mesh.isSkinnedMesh) {
		throw new Error('<Skeleton> must be a direct child of a <SkinnedMesh>');
	}

	/**
	 * @param {THREE.Object3D} object
	 * @param {THREE.Bone[]} bones
	 */
	function find_bones(object, bones = []) {
		object.children.forEach(child => {
			if (/** @type {THREE.Bone} */ (child).type === 'Bone') {
				bones.push(/** @type {THREE.Bone} */ (child));
			}

			find_bones(child, bones);
		});

		return bones;
	}

	onMount(() => {
		const bones = find_bones(parent);

		const skeleton = new THREE.Skeleton(bones);
		mesh.bind(skeleton);

		return () => skeleton.dispose();
	});
</script>

<slot></slot>