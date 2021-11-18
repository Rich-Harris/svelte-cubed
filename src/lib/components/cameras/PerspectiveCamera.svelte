<script>
	import { setup } from '../../utils/context.js';
	import { PerspectiveCamera, Vector3 } from 'three';

	export let fov = 45;
	export let near = 0.1;
	export let far = 2000;
	export let zoom = 1;

	/** @type {{
	 *   fullWidth: number;
	 *   fullHeight: number;
	 *   x: number;
	 *   y: number;
	 *   width: number;
	 *   height: number;
	 * }} */
	export let viewOffset = undefined;

	export let position = [0, 0, 5];
	export let target = [0, 0, 0]; // TODO accept an object/vector?

	const { root, self } = setup(new PerspectiveCamera());

	const target_vector = new Vector3();

	root.camera.set(self, (w, h) => {
		self.aspect = w / h;
		self.updateProjectionMatrix();
	});

	$: {
		self.fov = fov;
		self.near = near;
		self.far = far;
		self.zoom = zoom;

		if (viewOffset) {
			self.setViewOffset(
				viewOffset.fullWidth,
				viewOffset.fullHeight,
				viewOffset.x,
				viewOffset.y,
				viewOffset.width,
				viewOffset.height
			);
		}

		self.position.set(position[0], position[1], position[2]);
		target_vector.set(target[0], target[1], target[2]);
		self.lookAt(target_vector);

		self.updateProjectionMatrix();
		root.invalidate();
	}
</script>
