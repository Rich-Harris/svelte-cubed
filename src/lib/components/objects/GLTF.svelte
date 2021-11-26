<script>
	import { onMount } from 'svelte';

	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
	import { setup } from '../../utils/context.js';
	import { transform } from '../../utils/object.js';
	import * as defaults from '../../utils/defaults.js';

	/** @type {string} */
	export let path = null;
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

		const loader = new GLTFLoader()
		  .setPath( path )
		  .setDRACOLoader( useDraco ? new DRACOLoader().setDecoderPath( '/loaders/draco/' ) : null )
		  .setKTX2Loader( useKTX2 ? new KTX2Loader()
				.setTranscoderPath( '/loaders/basis/' )
				.detectSupport( root.renderer ) : null )
		  .load( filename, function ( gltf ) {
			gltfScene = gltf.scene;
			self.add(gltf.scene);
		} );

		return () => {};
	});
</script>

<slot />
