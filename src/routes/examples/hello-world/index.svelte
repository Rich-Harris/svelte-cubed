<script>
	import * as THREE from 'three';
	import * as GL from '$lib';
	import { onMount } from 'svelte';
	import * as knobby from 'svelte-knobby';

	/** @type {THREE.Font} */
	let font;

	/** @type {THREE.BufferGeometry} */
	let text;

	/** @type {THREE.Texture} */
	let background;

	const options = knobby.panel({
		text: 'hello svelte-three',
		lights: {
			hemisphere: {
				intensity: { value: 1, min: 0, max: 1, step: 0.01 },
				color: '#ffffff',
				groundColor: '#aaaadd'
			},
			spot: {
				intensity: { value: 1, min: 0, max: 1, step: 0.01 },
				angle: { value: 0.3, min: 0, max: Math.PI, step: 0.01 },
				penumbra: { value: 0.3, min: 0, max: 1, step: 0.01 }
			}
		}
	});

	$: if (font) {
		text = new THREE.TextGeometry($options.text, {
			font,
			size: 2,
			height: 0.1,
			curveSegments: 12
		});

		text.computeBoundingBox();
		text.center();
	}

	onMount(() => {
		{
			const loader = new THREE.FontLoader();

			loader.load('/fonts/droid/droid_sans_regular.typeface.json', (loaded) => {
				font = loaded;
			});
		}

		{
			const loader = new THREE.TextureLoader();

			background = loader.load('/textures/kiara_1_dawn.jpeg');
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
		}
	});
</script>

<GL.Canvas {background} fog={new THREE.FogExp2(0x000000, 0.02)} shadows antialias>
	<GL.Mesh
		geometry={new THREE.PlaneGeometry(10000, 10000)}
		material={new THREE.MeshStandardMaterial({ color: 0xaaaadd })}
		rotation={[-Math.PI * 0.5, 0, 0]}
		position={[0, -0.02, 0]}
		receiveShadow
	/>

	{#if text}
		<GL.Mesh
			geometry={text}
			material={new THREE.MeshStandardMaterial({
				color: 0xff3e00,
				emissive: 0xff3e00,
				emissiveIntensity: 0.5
			})}
			rotation={[0, 0, 0]}
			position={[0, 1.5, 0]}
			castShadow
		/>
	{/if}

	<GL.Primitive object={new THREE.GridHelper(200, 40)} />

	<GL.PerspectiveCamera position={[0, 10, 40]} />
	<GL.OrbitControls
		target={[0, 0, 0]}
		enableZoom={false}
		enablePan={false}
		enableDamping
		maxPolarAngle={Math.PI * 0.48}
	/>

	<GL.HemisphereLight
		color={$options.lights.hemisphere.color}
		groundColor={$options.lights.hemisphere.groundColor}
		intensity={$options.lights.hemisphere.intensity}
	/>

	<GL.SpotLight
		position={[-20, 20, 20]}
		target={[0, 0, 0]}
		angle={$options.lights.spot.angle}
		penumbra={$options.lights.spot.penumbra}
		shadow
		intensity={$options.lights.spot.intensity}
	/>
</GL.Canvas>
