<script>
	import { get_group, get_root } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;
	export let distance = 0;
	export let angle = Math.PI / 3;
	export let penumbra = 0;
	export let decay = 1;

	/** @type {import('../types').Position} */
	export let position = [0, 0, 0];

	/** @type {import('../types').Position} */
	export let target = [0, 0, 0];

	/**
	 * @type {boolean | {
	 *   mapSize?: [number, number];
	 *   camera?: { near?: number; far?: number };
	 *   bias?: number;
	 *   radius?: number
	 * }}
	 */
	export let shadow = null;

	const light = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
	get_group().add(light);

	const target_vector = new THREE.Vector3();

	const { invalidate } = get_root();

	$: {
		light.color.set(color);
		light.intensity = intensity;
		light.distance = distance;
		light.decay = decay;

		light.position.set(position[0], position[1], position[2]);

		target_vector.set(target[0], target[1], target[2]);
		light.lookAt(target_vector);

		invalidate();
	}

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1,
			} = shadow === true ? {} : shadow;

			light.shadow.mapSize.set(mapSize[0], mapSize[1]);
			light.shadow.camera.near = near;
			light.shadow.camera.far = far;
			light.shadow.bias = bias;
			light.shadow.radius = radius;

			light.castShadow = true;
		} else {
			light.castShadow = false;
		}

		invalidate();
	}
</script>