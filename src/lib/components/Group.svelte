<script>
	import * as THREE from 'three';
	import { onDestroy } from 'svelte';
	import { get_group, get_root, set_group } from '../utils/context.js';
	import { transform } from '../utils/object.js';
	import * as defaults from '../utils/defaults.js';

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

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