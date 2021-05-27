<script>
	import * as THREE from 'three';
	import { onDestroy } from 'svelte';
	import { get_group, get_root, set_group } from '../utils/context.js';

	/** @type {[number, number, number]} */
	export let position = [0, 0, 0];

	/** @type {[number, number, number]} */
	export let rotation = [0, 0, 0];

	/** @type {number | [number, number, number]} */
	export let scale = [1, 1, 1];

	const { invalidate } = get_root();
	const group = new THREE.Group();

	get_group().add(group);

	set_group({
		add(object) {
			group.add(object);
			invalidate();

			onDestroy(() => {
				group.remove(object);
				invalidate();
			});
		},
		remove(object) {
			group.remove(object);
			invalidate();
		}
	});

	$: {
		group.position.set(position[0], position[1], position[2]);
		group.rotation.set(rotation[0], rotation[1], rotation[2]);

		if (typeof scale === 'number') {
			group.scale.set(scale, scale, scale);
		} else {
			group.scale.set(scale[0], scale[1], scale[2]);
		}

		invalidate();
	}
</script>

<slot></slot>