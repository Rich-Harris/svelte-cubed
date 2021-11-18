<script>
	import { setup } from '../../utils/context.js';
	import { OrthographicCamera, Vector3 } from 'three';

	export let left = -1;
	export let right = 1;
	export let top = 1;
	export let bottom = -1;
	export let near = 0.1;
	export let far = 2000;
	export let zoom = 1;

	export let position = [0, 0, 5];
	export let target = [0, 0, 0]; // TODO accept an object/vector?

	const { root, self } = setup(new OrthographicCamera(left, right, top, bottom, near, far));

	const target_vector = new Vector3();

	root.camera.set(self, (w, h) => {
		// TODO would it be easier to accept width/height/cx/cy and calculate values from there?
	});

	$: {
		self.left = left;
		self.right = right;
		self.top = top;
		self.bottom = bottom;
		self.near = near;
		self.far = far;
		self.zoom = zoom;

		self.position.set(position[0], position[1], position[2]);
		target_vector.set(target[0], target[1], target[2]);
		self.lookAt(target_vector);

		self.updateProjectionMatrix();
		root.invalidate();
	}
</script>
