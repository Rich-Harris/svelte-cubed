<script>
	import { setup } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;
	export let distance = 100;
	export let decay = 1;

	/** @type {import('../../types/common').Position} */
	export let position = [0, 0, 0];

	/**
	 * @type {boolean | {
	 *   mapSize?: [number, number];
	 *   camera?: { near?: number; far?: number };
	 *   bias?: number;
	 *   radius?: number
	 * }}
	 */
	export let shadow = null;

	const { root, self } = setup(new THREE.PointLight());

	$: {
		self.color.set(color);
		self.intensity = intensity;
		self.distance = distance;
		self.decay = decay;

		self.position.set(position[0], position[1], position[2]);

		root.invalidate();
	}

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1
			} = shadow === true ? {} : shadow;

			self.shadow.mapSize.set(mapSize[0], mapSize[1]);
			self.shadow.camera.near = near;
			self.shadow.camera.far = far;
			self.shadow.bias = bias;
			self.shadow.radius = radius;

			self.castShadow = true;
		} else {
			self.castShadow = false;
		}

		root.invalidate();
	}
</script>
