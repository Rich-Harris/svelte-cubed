<script>
	import { set_root } from '../utils/context.js';
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';

	/** Scene options https://threejs.org/docs/?q=scene#api/en/scenes/Scene */

	/** @type {THREE.Color | THREE.Texture} */
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

	// public methods
	export function info() {
		return root.renderer.info;
	}

	/** @type {number} */
	let _width;

	/** @type {number} */
	let _height;

	/** @type {HTMLElement} */
	let container;

	/** @type {number} */
	let frame = null;

	/** @param {Function} fn */
	const run = (fn) => fn();

	const invalidate = () => {
		if (frame) return;

		frame = requestAnimationFrame(() => {
			frame = null;
			before_render.forEach(run);
			root.renderer.render(root.scene, root.camera.object);
		});
	};

	/** @type {Array<() => void>}*/
	const before_render = [];

	const root = set_root({
		canvas: null,
		scene: null,
		renderer: null,

		camera: {
			object: null,
			callback: () => {
				console.warn('no camera is set');
			},
			set: (camera, callback) => {
				root.camera.object = camera;
				root.camera.callback = callback;

				if (root.controls.callback) {
					root.controls.callback(root.camera.object, root.canvas);
				}

				invalidate();
			}
		},

		controls: {
			object: null,
			callback: null,
			set: (callback) => {
				root.controls.callback = callback;

				if (root.camera.object) {
					root.controls.object = callback(root.camera.object, root.canvas);
				}
			}
		},

		before_render(fn) {
			before_render.push(fn);

			onDestroy(() => {
				const i = before_render.indexOf(fn);
				before_render.splice(i, 1);
			});
		},

		invalidate
	});

	onMount(() => {
		root.renderer = new THREE.WebGLRenderer({
			canvas: root.canvas,
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

		root.scene = new THREE.Scene();

		resize();

		return () => {
			console.log('disposing of renderer');
			root.renderer.forceContextLoss();
			root.renderer.dispose();
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

	$: if (root.scene) {
		root.scene.background = background;
		root.scene.environment = environment;
		root.scene.fog = fog;
		root.scene.overrideMaterial = overrideMaterial;
	}

	$: if (root.renderer) {
		root.renderer.autoClear = autoClear;
		root.renderer.autoClearColor = autoClearColor;
		root.renderer.autoClearDepth = autoClearDepth;
		root.renderer.autoClearStencil = autoClearStencil;
		root.renderer.debug.checkShaderErrors = checkShaderErrors;
		root.renderer.gammaFactor = gammaFactor;
		root.renderer.localClippingEnabled = localClippingEnabled;
		root.renderer.physicallyCorrectLights = physicallyCorrectLights;
		if (outputEncoding != null) root.renderer.outputEncoding = outputEncoding;
		root.renderer.clippingPlanes = clippingPlanes;
		root.renderer.toneMapping = toneMapping;
		root.renderer.toneMappingExposure = toneMappingExposure;

		if (shadows) {
			root.renderer.shadowMap.enabled = true;
			root.renderer.shadowMap.autoUpdate = true; // TODO allow some way to control this?
			root.renderer.shadowMap.type = shadows === true ? THREE.PCFShadowMap : shadows;
		} else {
			root.renderer.shadowMap.enabled = false;
		}

		invalidate();
	}

	$: if (root.renderer) {
		const w = width !== undefined ? width : _width;
		const h = height !== undefined ? height : _height;

		root.renderer.setSize(w, h, false);
		root.camera.callback(w, h);
		root.renderer.setPixelRatio(pixelRatio);

		invalidate();
	}
</script>

<svelte:window on:resize={resize} />

<div class="container" bind:this={container}>
	<canvas bind:this={root.canvas} />

	{#if root.scene}
		<slot />
	{/if}
</div>

<style>
	.container,
	canvas {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
