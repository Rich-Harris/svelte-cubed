<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let width = 1;
	let height = 1;
	let depth = 1;

	let spin = 0;

	SC.onFrame(() => {
		spin += 0.01;
	});
</script>

<SC.Canvas
	antialias
	background={new THREE.Color('papayawhip')}
	fog={new THREE.FogExp2('papayawhip', 0.1)}
	shadows
>
	<SC.Group position={[0, -height / 2, 0]}>
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

	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
		scale={[width, height, depth]}
		rotation={[0, spin, 0]}
		castShadow
	/>

	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>

<div class="controls">
	<label><input type="range" bind:value={width} min={0.1} max={3} step={0.1} /> width</label>
	<label><input type="range" bind:value={height} min={0.1} max={3} step={0.1} /> height</label>
	<label><input type="range" bind:value={depth} min={0.1} max={3} step={0.1} /> depth</label>
</div>

<style>
	.controls {
		position: absolute;
		left: 1em;
		top: 1em;
	}

	label {
		display: flex;
		width: 60px;
		gap: 0.5em;
	}

	input {
		width: 80px;
	}
</style>
