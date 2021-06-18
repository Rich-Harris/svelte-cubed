<script>
	import { setup } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let groundColor = 0xffffff;
	export let intensity = 1;

	const { root, self } = setup(new THREE.HemisphereLight());

	$: {
		self.color.set(color);
		self.groundColor.set(groundColor);
		self.intensity = intensity;

		root.invalidate();
	}
</script>