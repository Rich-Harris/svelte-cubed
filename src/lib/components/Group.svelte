<script>
	import * as THREE from 'three';
	import { onDestroy } from 'svelte';
	import { get_group, get_root, set_group } from '../utils/context.js';
	import { transform } from '../utils/object.js';

	/** @type {import('../types').Position} */
	export let position = [0, 0, 0];

	/** @type {import('../types').Rotation} */
	export let rotation = [0, 0, 0];

	/** @type {import('../types').Scale} */
	export let scale = [1, 1, 1];

	const { invalidate } = get_root();
	const object = new THREE.Group();

	get_group().add(object);

	set_group({
		add(child) {
			object.add(child);
			invalidate();

			onDestroy(() => {
				object.remove(child);
				invalidate();
			});
		},
		remove(child) {
			object.remove(child);
			invalidate();
		}
	});

	$: {
		transform(object, position, rotation, scale);
		invalidate();
	}
</script>

<slot></slot>