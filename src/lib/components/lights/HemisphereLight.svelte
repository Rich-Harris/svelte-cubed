<script>
	import { get_group, get_root } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let groundColor = 0xffffff;
	export let intensity = 1;

	const { invalidate } = get_root();

	const light = new THREE.HemisphereLight(color, groundColor, intensity);
	get_group().add(light);

	$: {
		light.color.set(color);
		light.groundColor.set(groundColor);
		light.intensity = intensity;

		invalidate();
	}
</script>