<script>
	import * as THREE from 'three';
	import { Scene, Mesh, PerspectiveCamera, OrbitControls, AmbientLight, PointLight } from '$lib/index.js';
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

<Scene background={new THREE.Color(0xffffff)} fog={new THREE.FogExp2(0xffffff, 0.01)}>
	<Mesh
		geometry={new THREE.TorusKnotGeometry(1, 0.4, 128, 32)}
		material={new THREE.MeshStandardMaterial({ color: 0xaaaaaa, wireframe: false })}
		position={[x, y, z]}
		rotation={[x, y, z]}
		scale={1}
	/>

	<!-- camera/controls -->
	<PerspectiveCamera zoom={1} position={[0, 0, 10]} />
	<OrbitControls autoRotate enableDamping zoomSpeed={1}/>

	<!-- lights -->
	<AmbientLight color="green" intensity={0.3}/>
	<PointLight color="red" intensity={1} position={[8, 5, 3]}/>
</Scene>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h1 {
		position: relative;
		z-index: 2;
	}
</style>