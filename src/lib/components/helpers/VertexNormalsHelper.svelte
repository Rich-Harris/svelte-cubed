<script>
	import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
	import { onDestroy } from 'svelte';
	import { setup } from '../../utils/context';

	export let size = 1;
	export let color = 0xff0000;

	const { root, parent } = setup();

	const helper = new VertexNormalsHelper(parent, size, color);
	root.scene.add(helper);

	root.before_render(() => {
		helper.update();
	});

	$: helper.size = size;

	onDestroy(() => {
		root.scene.remove(helper);
		root.invalidate();
	});
</script>
