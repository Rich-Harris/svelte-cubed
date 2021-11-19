<script>
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import * as SC from '$lib/index.js';
	import { onMount } from 'svelte';
	import { opts } from '$lib/site/opts.js';
	import logo from './svelte-logo.svg';

	let w = 1;
	let h = 1;
	let y = 0;

	let loaded = false;

	let spot = [3, 1, 5];

	const backdrop = new THREE.PlaneGeometry(1, 1, 32, 32);

	console.log(backdrop);

	// curve backdrop
	for (let i = 0; i < backdrop.attributes.position.array.length; i += 3) {
		const x = backdrop.attributes.position.array[i + 0];
		const y = backdrop.attributes.position.array[i + 1];
		const z = backdrop.attributes.position.array[i + 2];

		backdrop.attributes.position.array[i + 0] = Math.sin(x);
		backdrop.attributes.position.array[i + 2] = -Math.cos(x) + 1;

		backdrop.attributes.normal.array[i + 0] = -Math.sin(x);
		backdrop.attributes.normal.array[i + 2] = Math.cos(x);
	}

	backdrop.attributes.position.needsUpdate = true;
	backdrop.attributes.normal.needsUpdate = true;

	/** @type {import('three').Shape[]}*/
	let shapes;

	/** @type {import('three').ShapeGeometry} */
	let geometry;

	$: if (shapes) {
		geometry = new THREE.ExtrudeGeometry(shapes[0], $opts.logo);
		geometry.center();
	}

	onMount(() => {
		new SVGLoader().load('/svelte-logo.svg', (loaded) => {
			shapes = loaded.paths[0].toShapes(false);
		});
	});

	let r = Math.PI / 4;

	SC.onFrame(() => {
		r -= 0.005;
	});
</script>

<svelte:window
	bind:scrollY={y}
	bind:innerWidth={w}
	bind:innerHeight={h}
	on:mousemove={(e) => {
		spot = [
			-3 * (e.clientX / window.innerWidth - 0.5),
			5 * (e.clientY / window.innerHeight - 0.5),
			5
		];
	}}
/>

<div class="hero" class:visible={geometry && loaded}>
	<SC.Canvas background={new THREE.Color(0xffffff)} shadows={THREE.VSMShadowMap} antialias>
		<!-- code sample backdrop -->
		<SC.Mesh
			geometry={backdrop}
			material={new THREE.MeshStandardMaterial({
				color: 'white',
				map: new THREE.TextureLoader().load('/images/example-code-2.png', () => {
					loaded = true;
				})
			})}
			position={[0, 0, -15]}
			scale={25 * Math.max(w / h, 1)}
			receiveShadow
		/>

		<!-- spinning logo -->
		<!-- <SC.Mesh
			{geometry}
			material={new THREE.MeshPhysicalMaterial({
				...$opts.glass,
				envMap: new THREE.TextureLoader().load('/textures/empty_warehouse_01.jpeg')
			})}
			position={[0, 0.4, 0]}
			rotation={[0, r, 0]}
			scale={0.03}
		/> -->

		<SC.Mesh
			{geometry}
			material={new THREE.MeshLambertMaterial({
				envMap: new THREE.TextureLoader().load('/textures/studio_small_09_1024.jpeg', (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					texture.encoding = THREE.sRGBEncoding;
				}),
				reflectivity: 0.4,
				color: 0xff3e00
			})}
			position={[0, 0.4, 0]}
			rotation={[0, r, 0]}
			scale={0.03}
			castShadow
		/>

		<!-- camera/controls -->
		<SC.PerspectiveCamera
			fov={65}
			zoom={1}
			position={[0, 0 - y * 0.005, 7]}
			target={[0, 0 - y * 0.005, 0]}
		/>

		<!-- lights -->
		<SC.AmbientLight
			color={$opts.lights.ambient.color}
			intensity={$opts.lights.ambient.intensity}
		/>
		<SC.SpotLight
			color={$opts.lights.spot.color}
			angle={$opts.lights.spot.angle}
			penumbra={$opts.lights.spot.penumbra}
			position={[8, 0, 2]}
			intensity={0.5}
			shadow={{
				radius: 20,
				bias: -0.001,
				mapSize: [2048, 2048]
			}}
		/>
		<SC.SpotLight
			color={$opts.lights.spot.color}
			angle={$opts.lights.spot.angle}
			penumbra={$opts.lights.spot.penumbra}
			position={[2, 0, 10]}
			intensity={0.5}
			shadow={{
				radius: 20,
				bias: -0.001,
				mapSize: [2048, 2048]
			}}
		/>
	</SC.Canvas>
</div>

<div style="height: 800px" />

<style>
	.hero {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.hero::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 20%;
		left: 0;
		bottom: 0;
	}

	.visible {
		opacity: 1;
	}
</style>
