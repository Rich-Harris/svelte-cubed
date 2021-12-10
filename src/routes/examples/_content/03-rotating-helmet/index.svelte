<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { onMount } from 'svelte';

	let spin = 0;

	SC.onFrame(() => {
		spin += 0.01;
	});
	const loader = new GLTFLoader();
	/** @type {THREE.Group} */
	let c64;

	onMount(() => {
		loader.load('/gltf/DamagedHelmet.glb', (loaded) => {
			c64 = loaded.scene;
		});
	});
</script>

<SC.Canvas
	antialias
	background={new THREE.Color('papayawhip')}
	fog={new THREE.FogExp2('papayawhip', 0.1)}
	shadows
>
	<SC.Group position={[0, -0.5, 0]}>
		<SC.Mesh
			geometry={new THREE.PlaneGeometry(50, 50)}
			material={new THREE.MeshStandardMaterial({ color: 'burlywood' })}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		/>
		<SC.Primitive
			object={new THREE.GridHelper(50, 50, '#000', '#000')}
			position={[0, 0.01, 0]}
			receiveShadow
		/>
	</SC.Group>

	{#if c64}
		 <SC.Primitive
			 castShadow
			 receiveShadow
			 object={c64}
			 scale={[0.5, 0.5, 0.5]}
			 position={[0, 0.25, 0]}
			 rotation={[spin, spin, spin]}
		 />
	{/if}

	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>