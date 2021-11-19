<script>
	import * as THREE from 'three';
	import * as SC from '$lib/index.js';
	import Backdrop from './Backdrop.svelte';
	import Logo from './Logo.svelte';
	import { load } from './texture';

	let w = 1;
	let h = 1;
	let y = 0;

	let loaded = false;

	const map = load('/images/example-code-2.png', () => {
		loaded = true;
	});
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h} />

<div class="hero" class:visible={loaded}>
	<SC.Canvas background={new THREE.Color(0xffffff)} shadows={THREE.VSMShadowMap} antialias>
		<!-- objects -->
		<Backdrop {map} />
		<Logo />

		<!-- camera -->
		<SC.PerspectiveCamera
			fov={65}
			zoom={1}
			position={[0, 0 - y * 0.005, 7]}
			target={[0, 0 - y * 0.005, 0]}
		/>

		<!-- lights -->
		<SC.AmbientLight intensity={0.5} />

		<SC.SpotLight
			angle={0.8}
			penumbra={0.5}
			position={[8, 0, 2]}
			intensity={0.5}
			shadow={{
				radius: 20,
				bias: -0.001,
				mapSize: [2048, 2048]
			}}
		/>

		<SC.SpotLight
			angle={0.8}
			penumbra={0.5}
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

<div style="height: 800px; background-color: rgb(40,41,35)" />

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
