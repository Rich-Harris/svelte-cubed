<script>
	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;

	const { root, self } = setup(new THREE.Bone());

	$: {
		transform(self, position, rotation, scale);
		root.invalidate();
	}
</script>

<slot></slot>