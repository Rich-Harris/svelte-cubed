<script context="module">
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

	/** @type {GLTFLoader} */
	let loader = null;
	/** @type {DRACOLoader} */
	let dracoLoader = null;
	/** @type {KTX2Loader} */
	let ktxLoader = null;
</script>

<script>
	import { onMount } from 'svelte';

	import * as THREE from 'three';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';

	/** @type {string} */
	export let path = '';
	/** @type {string} */
	export let filename = null;
	export let useDraco = false;
	export let useKTX2 = false;

	export let position = defaults.position;
	export let rotation = defaults.rotation;
	export let scale = defaults.scale;
	export let castShadow = false;
	export let receiveShadow = false;
	export let frustumCulled = true;
	export let renderOrder = 0;

	/** @type {Object} */
	let gltfScene = null;

	const { root, parent, self } = setup(new THREE.Object3D());

	$: {
		if(gltfScene) {
			gltfScene.traverse( function( node ) {
				if ( node.isMesh ) { 
					node.castShadow = castShadow;
					node.receiveShadow = receiveShadow;
					node.frustumCulled = frustumCulled;
					node.renderOrder = renderOrder;
				}
			} );
		}

		transform(self, position, rotation, scale);
		root.invalidate();
	}

	onMount(() => {
		if (loader === null) {
			loader = new GLTFLoader()
		}

		if (useDraco && dracoLoader === null) {
			dracoLoader = new DRACOLoader().setDecoderPath( '/loaders/draco/' );
			loader.setDRACOLoader(dracoLoader);
		}

		if (useKTX2 && ktxLoader === null) {
			ktxLoader = new KTX2Loader()
				.setTranscoderPath( '/loaders/basis/' )
				.detectSupport( root.renderer );
			loader.setKTX2Loader(ktxLoader);
		}

		loader.setPath( path )
		  .load( filename, function ( gltf ) {
			gltfScene = gltf.scene;
			self.add(gltf.scene);
		} );

		return () => {};
	});
</script>

<slot />
