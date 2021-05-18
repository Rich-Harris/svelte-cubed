<script>
import { set_group, set_root } from '$lib/utils/context';

	import { onMount, setContext, onDestroy } from 'svelte';
	import * as THREE from 'three';

	/** @type {HTMLElement} */
	let container;

	/** @type {number} */
	let frame = null;

	const invalidate = () => {
		if (frame) return;

		frame = requestAnimationFrame(() => {
			frame = null;
			context.renderer.render(context.scene, context.camera.object);
		});
	}

	/** @type {import('../types').RootContext} */
	const context = {
		canvas: null,
		scene: null,
		renderer: null,

		camera: {
			object: null,
			callback: () => {
				console.warn('no camera is set');
			},
			set: (camera, callback) => {
				context.camera.object = camera;
				context.camera.callback = callback;

				if (context.controls.callback) {
					context.controls.callback(context.camera.object, context.canvas);
				}

				invalidate();
			}
		},

		controls: {
			object: null,
			callback: null,
			set: (callback) => {
				context.controls.callback = callback;

				if (context.camera.object) {
					context.controls.object = callback(context.camera.object, context.canvas);
				}
			}
		},

		invalidate
	};

	set_root(context);

	set_group({
		add: object => {
			context.scene.add(object);
			invalidate();

			onDestroy(() => {
				context.scene.remove(object);
				invalidate();
			});
		},
		remove: object => {
			context.scene.remove(object);
		}
	});

	onMount(() => {
		context.renderer = new THREE.WebGLRenderer({
			canvas: context.canvas
		});

		context.scene = new THREE.Scene();

		const pointlight = new THREE.PointLight(0xffffff, 1, 100, 2);
		pointlight.position.set(8, 5, 3);
		context.scene.add(pointlight);

		const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
		context.scene.add(ambientlight);

		resize();
	});

	const resize = () => {
		const w = container.clientWidth;
		const h = container.clientHeight;

		context.renderer.setSize(w, h);
		context.camera.callback(w, h);

		invalidate();
	};
</script>

<svelte:window on:resize={resize}/>

<div class="container" bind:this={container}>
	<canvas bind:this={context.canvas}/>
	{#if context.scene}
		<slot camera={context.camera} canvas={context.canvas}></slot>
	{/if}
</div>

<style>
	.container, canvas {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>