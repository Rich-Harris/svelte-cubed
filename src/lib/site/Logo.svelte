<script>
	import * as THREE from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
	import * as SC from '$lib/index.js';
	import logo from './svelte-logo.svg?raw';

	const [shape] = new SVGLoader().parse(logo).paths[0].toShapes(false);

	const geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 24,
		depth: 2,
		bevelEnabled: true,
		bevelOffset: 0,
		bevelSegments: 4,
		bevelSize: 1,
		bevelThickness: 1
	});
	geometry.center();

	let r = 0;

	SC.onFrame(() => {
		r -= 0.005;
	});
</script>

<SC.Mesh
	{geometry}
	material={new THREE.MeshLambertMaterial({
		envMap: new THREE.TextureLoader().load('/textures/studio_small_09_1024.jpeg', (texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			texture.encoding = THREE.sRGBEncoding;
		}),
		reflectivity: 0.4,
		color: 0xff3e00
	})}
	position={[0, 0.4, 0]}
	rotation={[0, r, 0]}
	scale={0.03}
	castShadow
/>
