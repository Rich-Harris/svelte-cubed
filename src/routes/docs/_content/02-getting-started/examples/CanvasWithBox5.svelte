<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
</script>

<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
	/>
	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} />
	<SC.AmbientLight intensity={0.4} />
	<SC.DirectionalLight intensity={0.6} position={[2, 3, 4]} />
</SC.Canvas>
