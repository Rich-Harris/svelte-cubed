<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import * as knobby from 'svelte-knobby';

	const rayCaster = new THREE.Raycaster();
	const point = new THREE.Vector2();

	/** @type {THREE.Font} */
	let font;

	let camera;
	let cube;

	/** @type {THREE.Texture} */
	let background;

	const options = knobby.panel({
		line1: 'hello',
		line2: 'world',
		material: {
			color: '#ff3e00',
			metalness: { value: 0.3, min: 0, max: 1, step: 0.01 },
			roughness: { value: 0.4, min: 0, max: 1, step: 0.01 },
			opacity: { value: 0.5, min: 0, max: 1, step: 0.01 },
			transparent: false
		},
		light: {
			x: { value: 2, min: -20, max: 20, step: 0.1 },
			y: { value: 1, min: -20, max: 20, step: 0.1 },
			z: { value: 5, min: -20, max: 20, step: 0.1 },
			intensity: { value: 1, min: 0, max: 1, step: 0.1 },
			color: '#ffffff'
		}
	});

	function castRay(event) {
		point.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		point.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		rayCaster.setFromCamera( point, camera );
	}

	onMount(() => {
		new THREE.FontLoader().load('/fonts/overpass.json', (loaded) => {
			font = loaded;
		});

		new THREE.TextureLoader().load('/textures/kiara_1_dawn.jpeg', (loaded) => {
			background = loaded;
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
		});
	});
</script>

<div class="container" class:visible={font && background}>
	<SC.Canvas {background} antialias on:click={() => {console.log("HEllo world");}}
		on:mousemove={castRay}>
		<SC.Mesh
			geometry={new THREE.BoxGeometry(1,1,1)}
			material={new THREE.MeshStandardMaterial($options.material)}
			position={[0, 0, 0]}
			bind:this={cube}
		/>

		<SC.PerspectiveCamera position={[0, 0, 10]} bind:this={camera} />
		<SC.OrbitControls
			target={[0, 0, 0]}
			enableZoom={false}
			enablePan={false}
			enableDamping
			maxPolarAngle={Math.PI * 0.5}
		/>

		<SC.AmbientLight intensity={0.4} />
		<SC.DirectionalLight
			position={[$options.light.x, $options.light.y, $options.light.z]}
			intensity={$options.light.intensity}
			color={$options.light.color}
		/>
	</SC.Canvas>
</div>

<style>
	.container {
		position: absolute;
		background: rgb(58, 63, 126);
		width: 100%;
		height: 100%;
		top: 0;
	}

	.container :global(canvas) {
		opacity: 0;
		transition: opacity 0.4s;
	}

	.container.visible :global(canvas) {
		opacity: 1;
	}
</style>
