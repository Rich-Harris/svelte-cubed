import * as knobby from 'svelte-knobby';

export const opts = knobby.panel({
	lights: {
		ambient: {
			color: '#ffffff',
			intensity: 0.5
		},
		spot: {
			color: '#ffffff',
			intensity: 1,
			angle: 0.8,
			penumbra: 0.5
		}
	},
	glass: {
		thickness: {
			value: 4.5,
			min: 0,
			max: 20,
			step: 0.01
		},
		roughness: {
			value: 0.1,
			min: 0,
			max: 1,
			step: 0.01
		},
		transmission: {
			value: 0.92,
			min: 0,
			max: 1,
			step: 0.01
		},
		ior: {
			value: 1.5,
			min: 1,
			max: 2.333,
			step: 0.01
		}
		// attenuationTint: '#ffffff',
		// attenuationDistance: {
		// 	value: 0.1,
		// 	min: 0,
		// 	max: 20,
		// 	step: 0.01
		// }
	},
	logo: {
		curveSegments: {
			value: 24,
			min: 1,
			max: 32
		},
		depth: {
			value: 2,
			min: 0.1,
			max: 10
		},
		bevelEnabled: true,
		bevelOffset: {
			value: 0,
			min: 0,
			max: 1,
			step: 0.01
		},
		bevelSegments: {
			value: 4,
			min: 0,
			max: 10
		},
		bevelSize: {
			value: 1,
			min: 0,
			max: 3,
			step: 0.01
		},
		bevelThickness: {
			value: 1,
			min: 0,
			max: 3,
			step: 0.01
		}
	}
});
