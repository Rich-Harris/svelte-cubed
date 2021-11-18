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

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae voluptas hic maxime velit iusto tempore unde non. Voluptates quis itaque aut, fugiat amet nihil accusantium! Itaque et magnam sequi.
