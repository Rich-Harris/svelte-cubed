<script>
	import { setContext, onMount } from 'svelte';
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';

	/** @type {THREE.Bone[]} */
	const bones = [];

	setContext('SKELETON', {
		bones
	});

	const { parent } = setup();

	const mesh = /** @type {THREE.SkinnedMesh} */ (parent);

	if (!mesh.isSkinnedMesh) {
		throw new Error('<Skeleton> must be a direct child of a <SkinnedMesh>');
	}

	onMount(() => {
		const skeleton = new THREE.Skeleton(bones);
		mesh.bind(skeleton);

		return () => skeleton.dispose();
	});
</script>

<slot></slot>