<script>
	import * as THREE from 'three';
	import { context } from '../utils/context.js';
	import { transform } from '../utils/object.js';
	import * as defaults from '../utils/defaults.js';
	import { onDestroy } from 'svelte';

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

	const { invalidate, parent, self } = context();

	$self = new THREE.Group();
	$parent.add($self);

	$: {
		transform($self, position, rotation, scale);
		invalidate();
	}

	onDestroy(() => {
		$parent.remove($self);
		invalidate();
	});
</script>

<slot></slot>