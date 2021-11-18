<script>
	import { setup } from '../../utils/context';
	import * as THREE from 'three';

	/** @type {string | number | THREE.Color} */
	export let color = 0xffffff;
	export let intensity = 1;

	/** @type {import('../../types/common').Position} */
	export let position = [0, 1, 0];

	/** @type {import('../../types/common').Position} */
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

	const { root, self } = setup(new THREE.DirectionalLight());

	$: {
		self.color.set(color);
		self.intensity = intensity;

		self.position.set(position[0], position[1], position[2]);
		self.target.position.set(target[0], target[1], target[2]);

		root.invalidate();
	}

	$: {
		if (shadow) {
			const {
				mapSize = [512, 512],
				camera: { left = -5, bottom = -5, right = 5, top = 5, near = 0.5, far = 500 } = {},
				bias = 0,
				radius = 1
			} = shadow === true ? {} : shadow;

			self.shadow.mapSize.set(mapSize[0], mapSize[1]);
			self.shadow.camera.left = left;
			self.shadow.camera.top = top;
			self.shadow.camera.right = right;
			self.shadow.camera.bottom = bottom;
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
