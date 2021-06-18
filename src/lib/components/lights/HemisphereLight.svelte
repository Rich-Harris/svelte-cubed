<script>
	import { context } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let groundColor = 0xffffff;
	export let intensity = 1;

	const { invalidate, parent } = context();

	const light = new THREE.HemisphereLight(color, groundColor, intensity);
	$parent.add(light);

	$: {
		light.color.set(color);
		light.groundColor.set(groundColor);
		light.intensity = intensity;

		invalidate();
	}
</script>