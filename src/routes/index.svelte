<script>
	import * as THREE from 'three';
	import * as GL from '$lib/index.js';
	import { onMount } from 'svelte';

	let x = 1;
	let z = 1;

	onMount(() => {
		/** @type {number} */
		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			x = 20 * Math.sin(Date.now() / 1000);
			z = 20 * Math.cos(Date.now() / 1000);
		}

		loop();

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<h1>svelte-cubed</h1>

<GL.Canvas background={new THREE.Color(0xffffff)} shadows={THREE.VSMShadowMap}>
	<GL.Mesh
		geometry={new THREE.PlaneBufferGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xaaaaaa })}
		receiveShadow
		position={[0, 0, 0]}
		rotation={[-Math.PI / 2, 0, 0]}
		scale={30}
	/>

	<GL.Mesh
		geometry={new THREE.TorusKnotGeometry(2, 0.8, 128, 32)}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00, emissive: 0xff3e00 })}
		castShadow
		position={[0, 4, 0]}
		rotation={[0, 0, 0]}
		scale={1}
	/>

	<!-- camera/controls -->
	<GL.PerspectiveCamera zoom={1} position={[15, 15, 25]} />
	<!-- <OrthographicCamera zoom={1} position={[30, 30, 50]} /> -->
	<GL.OrbitControls zoomSpeed={1} maxPolarAngle={Math.PI / 2 - 0.1} />

	<!-- lights -->
	<GL.AmbientLight color="white" intensity={0.4} />
	<GL.SpotLight
		color="white"
		intensity={1}
		angle={0.3}
		penumbra={0.2}
		position={[x, 20, z]}
		shadow={{
			radius: 20,
			bias: -0.001,
			mapSize: [2048, 2048]
		}}
	/>
</GL.Canvas>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h1 {
		position: relative;
		z-index: 2;
	}
</style>
