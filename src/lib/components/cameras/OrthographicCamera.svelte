<script>
	import { get_root } from '../../utils/context.js';
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

	const root = get_root();

	const camera = new OrthographicCamera(left, right, top, bottom, near, far);
	const target_vector = new Vector3();

	root.camera.set(camera, (w, h) => {
		// TODO would it be easier to accept width/height/cx/cy and calculate values from there?
	});

	$: {
		camera.left = left;
		camera.right = right;
		camera.top = top;
		camera.bottom = bottom;
		camera.near = near;
		camera.far = far;
		camera.zoom = zoom;

		camera.position.set(position[0], position[1], position[2]);
		target_vector.set(target[0], target[1], target[2]);
		camera.lookAt(target_vector);

		camera.updateProjectionMatrix();
		root.invalidate();
	}
</script>