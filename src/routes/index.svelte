<script>
	import * as THREE from 'three';
	import { Scene, Mesh, PerspectiveCamera, OrbitControls } from '$lib/index.js';
	import { onMount } from 'svelte';

	let x = 0;
	let y = 0;
	let z = 0;

	onMount(() => {
		// let frame = requestAnimationFrame(function loop() {
		// 	frame = requestAnimationFrame(loop);

		// 	x = Math.sin(Date.now() / 1000);
		// 	y = Math.sin(Date.now() / 1400);
		// 	z = Math.sin(Date.now() / 1800);
		// });

		// return () => {
		// 	cancelAnimationFrame(frame);
		// };
	});
</script>

<h1>svelte-three</h1>

<Scene let:camera let:canvas>
	<Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: false })}
		position={[x, y, z]}
		rotation={[x, y, z]}
		scale={1}
	/>

	<PerspectiveCamera zoom={1} position={[0, 0, 10]} />
	<OrbitControls autoRotate enableDamping zoomSpeed={1}/>
</Scene>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h1 {
		position: relative;
		color: white;
		z-index: 2;
	}
</style>