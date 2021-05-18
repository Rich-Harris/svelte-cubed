<script>
	import { get_root } from '../../utils/context.js';
	import { PerspectiveCamera } from 'three';

	export let fov = 45;
	export let near = 1;
	export let far = 2000;
	export let zoom = 1;

	export let position = [0, 0, 5];

	const root = get_root();

	const camera = new PerspectiveCamera(fov, root.canvas.clientWidth / root.canvas.clientHeight, near, far);

	console.log('setting camera');

	root.camera.set(camera, (w, h) => {
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	});

	$: {
		camera.zoom = zoom;
		camera.position.set(position[0], position[1], position[2]);
		camera.updateProjectionMatrix();

		// TODO is this necessary?
		// if (root.controls.object) {
		// 	root.controls.object.update();
		// }
	}
</script>