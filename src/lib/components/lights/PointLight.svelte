<script>
	import { get_group } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;
	export let distance = 100;
	export let decay = 1;

	/** @type {[number, number, number]} */
	export let position = [0, 0, 0];

	const group = get_group();

	const light = new THREE.PointLight(color, intensity, distance, decay);

	$: {
		light.color.set(color);
		light.intensity = intensity;
		light.distance = distance;
		light.decay = decay;

		light.position.set(position[0], position[1], position[2]);
	}

	group.add(light);
</script>