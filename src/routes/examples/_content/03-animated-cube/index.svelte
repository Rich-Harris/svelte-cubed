<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	import BugBox from './BugBox.svelte';

	let cameraX = 0.0;

	SC.onFrame((elapsedTime, deltaTime) => {
		cameraX = Math.pow(Math.sin(elapsedTime/1000),3)*3;
	});
</script>

<SC.Canvas
	antialias
	background={new THREE.Color('papayawhip')}
	fog={new THREE.FogExp2('papayawhip', 0.1)}
	shadows
>
	<SC.Group position={[0, 0, 0]}>
		<SC.Mesh
			geometry={new THREE.PlaneGeometry(50, 50)}
			material={new THREE.MeshStandardMaterial({ color: 'burlywood' })}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		/>
		<SC.Primitive
			object={new THREE.GridHelper(50, 50, 'papayawhip', 'papayawhip')}
			position={[0, 0.001, 0]}
		/>
	</SC.Group>

	<BugBox/>

	<SC.PerspectiveCamera position={[cameraX, 2, 6]} target={[0, 1, 0]} />
	<!-- <SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51} /> -->
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>

<style>

	label {
		display: flex;
		width: 60px;
		gap: 0.5em;
		align-items: center;
	}

	input {
		width: 80px;
		margin: 0;
	}
</style>
