<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let root

	const rayCaster = new THREE.Raycaster();
	const point = new THREE.Vector2();
	// TODO-DefinitelyMaybe: export from mesh or object
	// https://threejs.org/docs/index.html?q=mesh#api/en/core/Object3D.visible
	let visible = false;
	const white = new THREE.MeshStandardMaterial({color:"white"})
	const black = new THREE.MeshStandardMaterial({color:"black"})
	let color = white
	let x = 0;
	let y = 0;
	let z = 0;

	/** @type {THREE.Font} */
	let font;

	/** @type {THREE.Texture} */
	let background;

	function castRay(event) {
		point.x = ( event.clientX / root.renderer.domElement.clientWidth ) * 2 - 1;
		point.y = - ( event.clientY / root.renderer.domElement.clientHeight ) * 2 + 1;
		rayCaster.setFromCamera( point, root.camera.object );
		const intersects = rayCaster.intersectObject( root.scene.children[0] );
		if ( intersects.length > 0 ) {
			visible = true
			x = intersects[0].point.x
			y = intersects[0].point.y
			z = intersects[0].point.z
		} else {
			visible = false
		}
	}

	onMount(() => {
		new THREE.FontLoader().load('/fonts/overpass.json', (loaded) => {
			font = loaded;
		});

		new THREE.TextureLoader().load('/textures/kiara_1_dawn.jpeg', (loaded) => {
			background = loaded;
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
		});
	});
</script>

<div class="container" class:visible={font && background}>
	<SC.Canvas bind:root={root} {background} antialias
		on:mousedown={() => {color = black}}
		on:mouseup={() => {color = white}}
		on:mousemove={castRay}>
		<SC.Mesh
			geometry={new THREE.BoxGeometry(1,1,1)}
			material={new THREE.MeshStandardMaterial({color:0xff3e00})}
			position={[0, 0, 0]}/>
		<SC.Mesh
			geometry={new THREE.BoxGeometry(0.1,0.1,0.1)}
			material={color}
			position={[x, y, z]}/>

		<SC.PerspectiveCamera position={[0, 0, 10]} />
		<SC.OrbitControls
			target={[0, 0, 0]}
			enableZoom={false}
			enablePan={false}
			enableDamping
			maxPolarAngle={Math.PI * 0.5}
		/>

		<SC.AmbientLight intensity={0.4} />
		<SC.DirectionalLight
			position={[2, 1, 5]}
			intensity={1}
			color={0xffffff}
		/>
	</SC.Canvas>
</div>

<style>
	.container {
		position: absolute;
		background: rgb(58, 63, 126);
		width: 100%;
		height: 100%;
		top: 0;
	}

	.container :global(canvas) {
		opacity: 0;
		transition: opacity 0.4s;
	}

	.container.visible :global(canvas) {
		opacity: 1;
	}
</style>
