<script>
	import { set_group, set_root } from '../utils/context.js';
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	/** Scene options https://threejs.org/docs/?q=scene#api/en/scenes/Scene */

	/** @type {any} */
	export let background = null;

	/** @type {THREE.Texture} */
	export let environment = null;

	/** @type {THREE.FogBase} */
	export let fog = null;

	/** @type {THREE.Material} */
	export let overrideMaterial = null;

	/** Renderer options https://threejs.org/docs/?q=render#api/en/renderers/WebGLRenderer */

	/** @type {'lowp' | 'mediump' | 'highp'} */
	export let precision = 'highp';

	/** @type {'default' | 'high-performance' | 'low-power'} */
	export let powerPreference = 'default';

	export let alpha = false;
	export let premultipliedAlpha = true;
	export let antialias = false;
	export let stencil = true;
	export let preserveDrawingBuffer = false;
	export let failIfMajorPerformanceCaveat = false;
	export let depth = true;
	export let logarithmicDepthBuffer = false;

	export let autoClear = true;
	export let autoClearColor = true;
	export let autoClearDepth = true;
	export let autoClearStencil = true;
	export let checkShaderErrors = true;
	export let gammaFactor = 2;
	export let localClippingEnabled = false;
	export let physicallyCorrectLights = false;

	/** @type {number} */
	export let outputEncoding = undefined;

	/** @type {THREE.Plane[]} */
	export let clippingPlanes = [];

	/** @type {boolean | typeof THREE.BasicShadowMap | typeof THREE.PCFShadowMap | typeof THREE.PCFSoftShadowMap | typeof THREE.VSMShadowMap} */
	export let shadows = undefined;

	/** @type {typeof THREE.NoToneMapping | typeof THREE.LinearToneMapping | typeof THREE.ReinhardToneMapping | typeof THREE.CineonToneMapping | typeof THREE.ACESFilmicToneMapping} */
	export let toneMapping = THREE.NoToneMapping;
	export let toneMappingExposure = 1;

	/** additional props */
	/** @type {number} */
	export let width = undefined;

	/** @type {number} */
	export let height = undefined;

	export let pixelRatio = typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1;

	/** @type {number} */
	let _width;

	/** @type {number} */
	let _height;

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

	/** @type {import('../types/context').RootContext} */
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
			canvas: context.canvas,
			precision,
			powerPreference,
			alpha,
			premultipliedAlpha,
			antialias,
			stencil,
			preserveDrawingBuffer,
			failIfMajorPerformanceCaveat,
			depth,
			logarithmicDepthBuffer
		});

		context.scene = new THREE.Scene();

		resize();

		return () => {
			context.renderer.dispose();
		};
	});

	const resize = () => {
		if (width === undefined) {
			_width = container.clientWidth / pixelRatio;
		}

		if (height === undefined) {
			_height = container.clientHeight / pixelRatio;
		}
	};

	$: if (context.scene) {
		context.scene.background = background;
		context.scene.environment = environment;
		context.scene.fog = fog;
		context.scene.overrideMaterial = overrideMaterial;
	}

	$: if (context.renderer) {
		context.renderer.autoClear = autoClear;
		context.renderer.autoClearColor = autoClearColor;
		context.renderer.autoClearDepth = autoClearDepth;
		context.renderer.autoClearStencil = autoClearStencil;
		context.renderer.debug.checkShaderErrors = checkShaderErrors;
		context.renderer.gammaFactor = gammaFactor;
		context.renderer.localClippingEnabled = localClippingEnabled;
		context.renderer.physicallyCorrectLights = physicallyCorrectLights;
		if (outputEncoding != null) context.renderer.outputEncoding = outputEncoding;
		context.renderer.clippingPlanes = clippingPlanes;
		context.renderer.toneMapping = toneMapping;
		context.renderer.toneMappingExposure = toneMappingExposure;

		if (shadows) {
			context.renderer.shadowMap.enabled = true;
			context.renderer.shadowMap.autoUpdate = true; // TODO allow some way to control this?
			context.renderer.shadowMap.type = shadows === true ? THREE.PCFShadowMap : shadows;
		} else {
			context.renderer.shadowMap.enabled = false;
		}

		invalidate();
	}

	$: if (context.renderer) {
		const w = width !== undefined ? width : _width;
		const h = height !== undefined ? height : _height;

		context.renderer.setSize(w, h, false);
		context.camera.callback(w, h);
		context.renderer.setPixelRatio(pixelRatio);

		invalidate();
	}
</script>

<svelte:window on:resize={resize}/>

<div class="container" bind:this={container}>
	<canvas bind:this={context.canvas}/>

	{#if context.scene}
		<slot></slot>
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