<script>
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import * as SC from '$lib/index.js';
	import { onMount } from 'svelte';
	import { vfov } from '$lib/site/fov';
	import { opts } from '$lib/site/opts.js';
	import { range } from '$lib/site/utils.js';

	let w = 1;
	let h = 1;
	let y = 0;

	/** @type {import('three').Font} */
	let font;

	/** @type {THREE.BufferGeometry[]} */
	let text;

	const materials = {
		light: new THREE.MeshStandardMaterial({
			color: 0,
			emissive: 0xf0f0f0
		}),
		dark: new THREE.MeshStandardMaterial({
			color: 0,
			emissive: 0x676778
		})
	};

	$: if (font) {
		text = [
			new THREE.TextGeometry('SVELTE', {
				font,
				size: 1,
				height: 0,
				curveSegments: 12
			}),
			new THREE.TextGeometry('CUBED', {
				font,
				size: 1,
				height: 0,
				curveSegments: 12
			})
		];

		text[0].computeBoundingBox();
		text[0].center();

		text[1].computeBoundingBox();
		text[1].center();
	}

	/** @type {import('three').Shape[]}*/
	let shapes;

	/** @type {import('three').ShapeGeometry} */
	let geometry;

	$: if (shapes) {
		geometry = new THREE.ExtrudeGeometry(shapes[0], $opts.logo);
		geometry.center();
	}

	onMount(() => {
		const fontloader = new THREE.FontLoader();

		fontloader.load('/fonts/overpass.json', (loaded) => {
			font = loaded;
		});

		const svgloader = new SVGLoader();

		svgloader.load('/svelte-logo.svg', (loaded) => {
			shapes = loaded.paths[0].toShapes(false);
		});
	});

	let r = Math.PI / 4;

	SC.onFrame(() => {
		r -= 0.01;
	});
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h} />

<div class="hero" class:visible={font && geometry}>
	<SC.Canvas background={new THREE.Color(0xffffff)} shadows={THREE.VSMShadowMap} antialias>
		{#if geometry}
			<SC.Mesh
				{geometry}
				material={new THREE.MeshPhysicalMaterial($opts.glass)}
				position={[0, 0.4, 0]}
				rotation={[0, r, 0]}
				scale={0.03}
			/>
		{/if}

		{#if text}
			{#each range(-50, 10, 1) as y}
				<SC.Group position={[0, (y + 0.5) * 1.2, 0]}>
					<SC.Mesh
						geometry={text[0]}
						material={y === 0 ? materials.dark : materials.light}
						rotation={[0, 0, 0]}
						position={[-0.8, 0, -2.5]}
						castShadow
					/>

					<SC.Mesh
						geometry={text[1]}
						material={y === 0 ? materials.dark : materials.light}
						rotation={[0, -Math.PI / 2, 0]}
						position={[+1.7, 0, 0]}
						castShadow
					/>
				</SC.Group>
			{/each}
		{/if}

		<!-- camera/controls -->
		<SC.PerspectiveCamera
			fov={vfov(65, w / h)}
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
			intensity={$opts.lights.spot.intensity}
			angle={$opts.lights.spot.angle}
			penumbra={$opts.lights.spot.penumbra}
			position={[
				$opts.lights.spot.position.x,
				$opts.lights.spot.position.y,
				$opts.lights.spot.position.z
			]}
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
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
	}

	.visible {
		opacity: 1;
	}
</style>
