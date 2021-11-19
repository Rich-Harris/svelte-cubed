<script>
	import * as THREE from 'three';
	import * as SC from '$lib';
	import * as knobby from 'svelte-knobby';
	import { spring } from 'svelte/motion';
	import Wall from './Wall.svelte';
	import { center_of_mass, create_star, update, SIZE } from './astrophysics.js';

	const options = knobby.panel({
		stars: {
			value: 3,
			min: 3,
			max: 10,
			step: 1
		},
		gravity: {
			value: 4,
			min: 0.1,
			max: 10,
			step: 0.1
		},
		light: {
			multiplier: {
				value: 1,
				min: 0.1,
				max: 10,
				step: 0.1
			},
			distance: {
				value: 7,
				min: 0.1,
				max: 10,
				step: 0.1
			},
			decay: {
				value: 1.5,
				min: 0.1,
				max: 10,
				step: 0.1
			}
		},
		reset: (value) => {
			stars = [];
			for (let i = 0; i < value.stars; i += 1) {
				stars.push(create_star());
			}
		}
	});

	let stars = [create_star(), create_star(), create_star()];

	const sphere = new THREE.SphereGeometry(1, 32, 32);
	const material = new THREE.MeshStandardMaterial({ emissive: 0xffffdd });

	// camera should smoothly follow the center of mass
	const target = spring();
	$: target.set(center_of_mass(stars));

	SC.onFrame(() => {
		if (stars.length > $options.stars) {
			stars.splice($options.stars);
		} else {
			while (stars.length < $options.stars) {
				stars.push(create_star());
			}
		}

		stars = update(stars, $options.gravity);
	});
</script>

<SC.Canvas antialias background={new THREE.Color(0)} fog={new THREE.FogExp2(0, 0.0001)}>
	<!-- floor and ceiling -->
	<Wall position={[0, -SIZE, 0]} rotation={[0, 0, 0]} />
	<Wall position={[0, +SIZE, 0]} rotation={[Math.PI, 0, 0]} />

	<!-- left and right -->
	<Wall position={[-SIZE, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
	<Wall position={[+SIZE, 0, 0]} rotation={[0, 0, Math.PI / 2]} />

	<!-- back and front -->
	<Wall position={[0, 0, -SIZE]} rotation={[Math.PI / 2, 0, 0]} />
	<Wall position={[0, 0, +SIZE]} rotation={[-Math.PI / 2, 0, 0]} />

	{#each stars as star}
		<SC.Mesh
			geometry={sphere}
			{material}
			position={star.coords}
			scale={0.1 * Math.pow(star.mass, 1 / 3)}
		/>

		<SC.PointLight
			position={star.coords}
			intensity={$options.light.multiplier * star.brightness}
			distance={$options.light.distance}
			decay={$options.light.decay}
		/>
	{/each}

	<SC.PerspectiveCamera position={[0, 0, SIZE * 0.75]} />
	<SC.OrbitControls target={$target} enableZoom={true} enablePan={false} enableDamping />

	<SC.AmbientLight intensity={0.2} />
</SC.Canvas>
