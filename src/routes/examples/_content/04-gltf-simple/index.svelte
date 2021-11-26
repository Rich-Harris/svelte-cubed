<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let cameraX = 0.0;

	SC.onFrame((elapsedTime, deltaTime) => {
		cameraX = Math.pow(Math.sin(elapsedTime/1000),3)*3;
	});
</script>

<SC.Canvas
	antialias
	environment={new THREE.TextureLoader().load('/textures/kiara_1_dawn.jpeg',
	(tex) => {
			tex.mapping = THREE.EquirectangularReflectionMapping;
			tex.encoding = THREE.sRGBEncoding;
		})}
	background={new THREE.TextureLoader().load('/textures/kiara_1_dawn.jpeg',
	(tex) => {
			tex.mapping = THREE.EquirectangularReflectionMapping;
			tex.encoding = THREE.sRGBEncoding;
		})}
	shadows
>

	<SC.Group position={[0, -1, 0]}>
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

	<SC.GLTF path="/gltf/" filename="DamagedHelmet.glb"
	    position={[0, 0, 0]}
		castShadow
		receiveShadow />
	<SC.GLTF path="/gltf/waterbottle/" filename="WaterBottle.gltf"
		position={[3, 0, 0]}
		useDraco
		castShadow
		receiveShadow />
	<SC.GLTF path="/gltf/stainedglasslamp-KTX2/" filename="StainedGlassLamp.gltf"
		position={[-3, 0, 0]}
		useKTX2
		castShadow
		receiveShadow />

	<SC.PerspectiveCamera position={[1, 2, 6]} target={[0, 1, 0]} />
	<SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>
