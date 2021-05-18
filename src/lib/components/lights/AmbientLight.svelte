<script>
	import { get_group } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;

	const group = get_group();

	const light = new THREE.AmbientLight(color, intensity);
	$: light.color.set(color);
	$: light.intensity = intensity;

	group.add(light);
</script>