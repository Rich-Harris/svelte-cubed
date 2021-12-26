<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import * as knobby from 'svelte-knobby';

	/** @type {THREE.Texture} */
	let background;
	/** @type {number[]} */
	let vertices;
	/** @type {number} */
	let timer = 0;

	const options = knobby.panel({
		material: {
			color: '#00ff95',
			size: 1.0,
			opacity: 0.8
		},
		update: {
			speed: 1
		}
	});

	$: create_points = () => {
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

		geometry.center();

		return geometry;
	};
	$: create_material = (
		/** @type {string} */ color,
		/** @type {number} */ size,
		/** @type {number} */ opacity
	) => {
		return new THREE.PointsMaterial({
			color: color,
			size: size / 10,
			transparent: true,
			opacity: opacity
		});
	};

	function gen_points() {
		const local_verts = [];
		for (let i = 0; i < 10000; i++) {
			const x = THREE.MathUtils.randFloatSpread(200);
			const y = THREE.MathUtils.randFloatSpread(200);
			const z = THREE.MathUtils.randFloatSpread(200);

			local_verts.push(x, y, z);
		}
		vertices = local_verts;
	}

	onMount(() => {
		new THREE.TextureLoader().load('/textures/kiara_1_dawn.jpeg', (loaded) => {
			background = loaded;
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
			gen_points();
		});
	});

	SC.onFrame(() => {
		timer += 1;
		if ($options.update.speed > 0 && timer > 100 / $options.update.speed) {
			gen_points();
			timer = 0;
		}
	});
</script>

<div class="container" class:visible={background}>
	<SC.Canvas {background} antialias>
		<SC.Points
			geometry={create_points()}
			material={create_material(
				$options.material.color,
				$options.material.size,
				$options.material.opacity
			)}
			position={[0, 3, 0]}
		/>

		<SC.PerspectiveCamera position={[0, 0, 40]} />
		<SC.OrbitControls target={[0, 0, 0]} enableDamping maxPolarAngle={Math.PI * 0.5} />

		<SC.AmbientLight intensity={0.4} />
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
