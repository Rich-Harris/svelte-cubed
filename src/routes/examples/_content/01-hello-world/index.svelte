<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import * as knobby from 'svelte-knobby';

	/** @type {THREE.Font} */
	let font;

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

	$: create_text = (/** @type {string} */ str) => {
		if (!font) return;

		const geometry = new THREE.TextGeometry(str, {
			font,
			size: 5,
			height: 0.25,
			curveSegments: 12
		});

		geometry.center();

		return geometry;
	};

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
	<SC.Canvas {background} antialias>
		<SC.Mesh
			geometry={create_text($options.line1)}
			material={new THREE.MeshStandardMaterial($options.material)}
			position={[0, 3, 0]}
		/>

		<SC.Mesh
			geometry={create_text($options.line2)}
			material={new THREE.MeshStandardMaterial($options.material)}
			position={[0, -3, 0]}
		/>

		<SC.PerspectiveCamera position={[0, 0, 40]} />
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
