<script>
	import * as THREE from 'three';
	import * as SC from '$lib/index.js';

	/** @type {import('three').Texture} */
	export let map;

	let w = 1;
	let h = 1;
	let y = 0;

	const backdrop = new THREE.PlaneGeometry(1, 1, 32, 32);

	// curve backdrop
	for (let i = 0; i < backdrop.attributes.position.array.length; i += 3) {
		const x = backdrop.attributes.position.array[i + 0];

		const sin = Math.sin(x);
		const cos = Math.cos(x);

		backdrop.attributes.position.array[i + 0] = sin;
		backdrop.attributes.position.array[i + 2] = -cos + 1;

		backdrop.attributes.normal.array[i + 0] = -sin;
		backdrop.attributes.normal.array[i + 2] = cos;
	}
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h} />

<SC.Mesh
	geometry={backdrop}
	material={new THREE.MeshStandardMaterial({
		map
	})}
	position={[0, 0, -15]}
	scale={25 * Math.max(w / h, 1)}
	receiveShadow
/>
