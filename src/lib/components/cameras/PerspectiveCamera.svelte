<script>
	import { get_root } from '../../utils/context.js';
	import { PerspectiveCamera, Vector3 } from 'three';

	export let fov = 45;
	export let near = 1;
	export let far = 2000;
	export let zoom = 1;

	export let position = [0, 0, 5];
	export let target = [0, 0, 0]; // TODO accept an object/vector?

	const root = get_root();

	const camera = new PerspectiveCamera(fov, root.canvas.clientWidth / root.canvas.clientHeight, near, far);
	const target_vector = new Vector3();

	root.camera.set(camera, (w, h) => {
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	});

	$: {
		camera.fov = fov;
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