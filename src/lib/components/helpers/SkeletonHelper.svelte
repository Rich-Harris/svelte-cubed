<script>
	import { onMount, tick } from 'svelte';
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';

	const { root, parent } = setup();

	onMount(() => {
		/** @type {THREE.SkeletonHelper} */
		let helper;
		let destroyed = false;

		tick().then(() => {
			if (!destroyed) {
				helper = new THREE.SkeletonHelper(parent);
				root.scene.add(helper);
				root.invalidate();
			}
		});

		return () => {
			destroyed = true;
			root.scene.remove(helper);
			root.invalidate();
		};
	});
</script>