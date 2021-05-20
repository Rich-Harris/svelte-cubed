<script>
	import * as THREE from 'three';
	import { get_root, get_object } from '../../utils/context.js';

	/** @type {THREE.AnimationClip} */
	export let clip;

	export let time = 0;
	export let timeScale = 1;
	export let weight = 1;

	const { current } = get_object();

	/** @type {THREE.AnimationMixer} */
	let mixer;

	/** @type {THREE.AnimationAction} */
	let action;

	const { invalidate } = get_root();

	$: {
		mixer = new THREE.AnimationMixer($current);
		action = mixer.clipAction(clip);
		action.play();

		// TODO uncache stuff
	}

	$: {
		action.time = time;
		action.timeScale = timeScale;
		action.weight = weight;

		invalidate();
	}
</script>

