<script>
	import * as THREE from 'three';
	import * as GL from '$lib';
	import AmbientLight from '$lib/components/lights/AmbientLight.svelte';
</script>

<GL.Canvas background={new THREE.Color(0)}>
	<GL.Mesh
		geometry={new THREE.PlaneGeometry(20, 2)}
		material={new THREE.MeshStandardMaterial({ color: 'hotpink' })}
		rotation={[0, 0, Math.PI / 4]}
		position={[0, 0, -10]}
	/>

	<GL.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshPhysicalMaterial({
			thickness: 5,
			roughness: 1,
			transmission: 1,
			ior: 1.25,
			attenuationTine: '#ffe79e',
			attenuationDistance: 0
		})}
	/>

	<GL.PerspectiveCamera position={[0, 0, 2.5]} />
	<GL.OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} enableDamping />

	<GL.AmbientLight />
</GL.Canvas>
