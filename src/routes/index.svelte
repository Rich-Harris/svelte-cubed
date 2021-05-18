<script>
	import * as THREE from 'three';
	import { Scene, Mesh, PerspectiveCamera, OrbitControls, AmbientLight, PointLight, Primitive } from '$lib/index.js';
	import { onMount } from 'svelte';
	// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { GLTFLoader } from 'three-stdlib';

	let x = 0;
	let y = 0;
	let z = 0;

	/** @type {THREE.Object3D} */
	let object;

	onMount(() => {
		const loader = new GLTFLoader();

		loader.load('/glTF-Sample-Models/2.0/Avocado/glTF/Avocado.gltf', gltf => {
			object = gltf.scene;
		});
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

<Scene background={new THREE.Color(0xffffff)}>
	<!-- <Mesh
		geometry={new THREE.TorusKnotGeometry(1, 0.4, 128, 32)}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00, emissive: 0xff3e00 })}
		position={[x, y, z]}
		rotation={[x, y, z]}
		scale={1}
	/> -->

	<Primitive object={object} scale={50} position={[0, -1.2, 0]}/>

	<!-- camera/controls -->
	<PerspectiveCamera zoom={1} position={[0, 0, 10]} />
	<OrbitControls autoRotate enableDamping zoomSpeed={1}/>

	<!-- lights -->
	<AmbientLight color="white" intensity={0.5}/>
	<PointLight color="white" intensity={1} position={[8, 5, 3]}/>
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