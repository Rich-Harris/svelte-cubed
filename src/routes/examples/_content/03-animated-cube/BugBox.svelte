<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let width = 1;
	let height = 1;
	let depth = 1;

	SC.onFrame((elapsedTime, deltaTime) => {
		let timeSeconds = elapsedTime / 1000;

		width = Math.sin(timeSeconds*5) + 1.1;
		height = Math.cos(timeSeconds*3) + 1.1;
	});
</script>


<SC.Mesh
  geometry={new THREE.BoxGeometry()}
  material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
  scale={[width, height, depth]}
  position={[0, height / 2, 0]}
  rotation={[0, 0, 0]}
  castShadow
/>