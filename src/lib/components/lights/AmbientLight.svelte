<script>
	import { get_group, get_root } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;

	const { invalidate } = get_root();
	const group = get_group();

	const light = new THREE.AmbientLight(color, intensity);
	get_group().add(light);

	$: {
		light.color.set(color);
		light.intensity = intensity;

		invalidate();
	}
</script>