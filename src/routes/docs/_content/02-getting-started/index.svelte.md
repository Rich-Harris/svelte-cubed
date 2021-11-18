---
title: Getting started
---

<script>
	import EmptyCanvas from './examples/EmptyCanvas.svelte';
</script>

If you don't have a Svelte project to work on, create a new one with SvelteKit:

```bash
npm init svelte@next my-new-app
cd my-new-app
npm install
npm run dev
```

Then install Three.js and Svelte Cubed:

```bash
npm install three svelte-cubed
```

If you're using TypeScript:

```bash
npm install -D @types/three
```

Now you're ready to start building 3D graphics (in your project's `src/routes/index.svelte`, for example).

## Your first scene

```svelte
<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
</script>

<SC.Canvas>
	<SC.Mesh geometry={new THREE.BoxGeometry()} />
	<SC.PerspectiveCamera position={[2, 2, 5]} />
</SC.Canvas>
```

<div class="demo">
	<EmptyCanvas/>
</div>

Let's break this down.

First, we're importing `THREE` and `SC` from `three` and `svelte-cubed` respectively. In general, Svelte Cubed doesn't _wrap_ the underlying Three.js objects, it simply gives you a place to _put_ them, so whenever you're creating things like geometry or materials you will need to import `three`.

The `<SC.Canvas>` component creates a [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) and a [Scene](https://threejs.org/docs/#api/en/scenes/Scene).
