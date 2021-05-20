<script>
	import { get_group, get_root } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;

	/** @type {[number, number, number]} */
	export let position = [0, 1, 0];

	/** @type {[number, number, number]} */
	export let target = [0, 0, 0];

	/**
	 * @type {boolean | {
	 *   mapSize?: [number, number];
	 *   camera?: { left?: number; right?: number; top?: number; bottom?: number; near?: number; far?: number };
	 *   bias?: number;
	 *   radius?: number
	 * }}
	 */
	export let shadow = null;

	const light = new THREE.DirectionalLight(color, intensity);
	get_group().add(light);

	const { invalidate } = get_root();

	$: {
		light.color.set(color);
		light.intensity = intensity;

		light.position.set(position[0], position[1], position[2]);
		light.target.position.set(target[0], target[1], target[2]);

		invalidate();
	}

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { left = -5, bottom = -5, right = 5, top = 5, near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1,
			} = shadow === true ? {} : shadow;

			light.shadow.mapSize.set(mapSize[0], mapSize[1]);
			light.shadow.camera.left = left;
			light.shadow.camera.top = top;
			light.shadow.camera.right = right;
			light.shadow.camera.bottom = bottom;
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