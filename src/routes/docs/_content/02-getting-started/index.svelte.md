---
title: Getting started
---

<script>
	import CanvasWithBox1 from './examples/CanvasWithBox1.svelte';
	import CanvasWithBox2 from './examples/CanvasWithBox2.svelte';
	import CanvasWithBox3 from './examples/CanvasWithBox3.svelte';
	import CanvasWithBox4 from './examples/CanvasWithBox4.svelte';
	import CanvasWithBox5 from './examples/CanvasWithBox5.svelte';
	import CanvasWithBox6 from './examples/CanvasWithBox6.svelte';
	import CanvasWithBox7 from './examples/CanvasWithBox7.svelte';
	import CanvasWithBox8 from './examples/CanvasWithBox8.svelte';
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
	<SC.PerspectiveCamera position={[1, 1, 3]} />
</SC.Canvas>
```

<div class="demo">
	<CanvasWithBox1/>
</div>

Let's break this down.

First, we're importing `THREE` and `SC` from `three` and `svelte-cubed` respectively. In general, Svelte Cubed doesn't _wrap_ the underlying Three.js objects, it simply gives you a place to _put_ them, so whenever you're creating things like geometry or materials you will need to import `three`.

The `<SC.Canvas>` component creates a [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) and a [Scene](https://threejs.org/docs/#api/en/scenes/Scene). Child components will be added to the scene.

A [mesh](https://threejs.org/docs/#api/en/objects/Mesh) is a combination of geometry and material. In this case, `<SC.Mesh>` is creating a mesh with [BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry) and the default [MeshNormalMaterial](https://threejs.org/docs/#api/en/materials/MeshNormalMaterial).

Finally, we're adding a [PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) so that we can see our mesh. The `position` attribute represents the `x`, `y` and `z` components of a [Vector3](https://threejs.org/docs/#api/en/math/Vector3).

The equivalent Three.js code would look something like this:

```js
import * as THREE from 'three';

function render(element) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		45,
		element.clientWidth / element.clientHeight,
		0.1,
		2000
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(element.clientWidth / element.clientHeight);
	element.appendChild(renderer.domElement);

	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshNormalMaterial();
	const box = new THREE.Mesh(geometry, material);
	scene.add(box);

	camera.position.x = 2;
	camera.position.y = 2;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer.render(scene, camera);
}
```

As you can see, it's a lot more code — more than three times as much, by character count — and we haven't started adding state changes, or animation, or hierarchies of objects, or any of the other things that cause imperative code to get tangled up. Over time, a component framework makes it vastly easier to keep track of the relationships between the different parts of your scene.

## Customising the canvas

Let's make things look a bit nicer by adding some options. The `<SC.Canvas>` component takes properties corresponding to Scene options, like `background`, and WebGLRenderer options like `antialias`:

```diff
-<SC.Canvas>
+<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh geometry={new THREE.BoxGeometry()} />
	<SC.PerspectiveCamera position={[1, 1, 3]} />
​</SC.Canvas>
```

<div class="demo">
	<CanvasWithBox2/>
</div>

## Controlling the camera

If you're like me, the first thing you did when you saw the cube above was to try and spin it. That won't work until we add some controls:

```diff
​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh geometry={new THREE.BoxGeometry()} />
	<SC.PerspectiveCamera position={[1, 1, 3]} />
+	<SC.OrbitControls enableZoom={false} />
​</SC.Canvas>
```

Try spinning the camera around!

<div class="demo">
	<CanvasWithBox3/>
</div>

> Note that the scene is only re-rendered when necessary — when the spinning stops, so does the rendering.

## Living in a material world

The default `MeshNormalMaterial` is useful for debugging, but most of the time you'll want to specify something else, such as [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial):

```diff
​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
-	<SC.Mesh geometry={new THREE.BoxGeometry()} />
+	<SC.Mesh
+		geometry={new THREE.BoxGeometry()}
+		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
+	/>
	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} />
​</SC.Canvas>
```

<div class="demo">
	<CanvasWithBox4/>
</div>

Since `MeshStandardMaterial` uses physically-based rendering, we'll need to illuminate the mesh.

## Let there be light

Svelte Cubed provides components corresponding to the various lights in Three.js, such as [AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight) and [DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight):

```diff
​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
	/>
	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} />
+	<SC.AmbientLight intensity={0.6} />
+	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
​</SC.Canvas>
```

<div class="demo">
	<CanvasWithBox5/>
</div>

## Updating state

Svelte Cubed components are just like any other component, which means we can update state in the normal way:

```diff
​<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
+
+	let width = 1;
+	let height = 1;
+	let depth = 1;
​</script>

​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
+		scale={[width, height, depth]}
	/>
	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
​</SC.Canvas>

+<div class="controls">
+	<label><input type="range" bind:value={width} min={0.1} max={3} step={0.1} /> width</label>
+	<label><input type="range" bind:value={height} min={0.1} max={3} step={0.1} /> height</label>
+	<label><input type="range" bind:value={depth} min={0.1} max={3} step={0.1} /> depth</label>
+</div>
```

<div class="demo">
	<CanvasWithBox6/>
</div>

## Adding motion

Since we're in a Svelte component, we have access to [tweened](https://svelte.dev/tutorial/tweened) and [spring](https://svelte.dev/tutorial/spring) stores and can use them to update component properties.

Sometimes, though, it's convenient to be able to update state on every frame. For these cases, Svelte Cubed provides an `onFrame` lifecycle function:

```diff
​<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';

	let width = 1;
	let height = 1;
	let depth = 1;
+
+	let spin = 0;
+
+	SC.onFrame(() => {
+		spin += 0.01;
+	});
​</script>

​<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
		scale={[width, height, depth]}
+		rotation={[0, spin, 0]}
	/>
	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={false} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
​</SC.Canvas>
```

<div class="demo">
	<CanvasWithBox7/>
</div>

## Finishing touches

Let's add a few more tweaks. First, let's make the box cast a shadow:

```diff
​<SC.Mesh
	geometry={new THREE.BoxGeometry()}
	material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
	scale={[width, height, depth]}
	rotation={[0, spin, 0]}
+	castShadow
/>
```

Then we'll add an `<SC.Group>` containing a plane to receive the shadow (rotated so that it's horizontal) and a [GridHelper](https://threejs.org/docs/#api/en/helpers/GridHelper). The grid helper is added using the `<SC.Primitive>` component, and positioned `0.01` units above the plane to avoid [z-fighting](https://en.wikipedia.org/wiki/Z-fighting):

```diff
+<SC.Group position={[0, -height / 2, 0]}>
+	<SC.Mesh
+		geometry={new THREE.PlaneGeometry(50, 50)}
+		material={new THREE.MeshStandardMaterial({ color: 'burlywood' })}
+		rotation={[-Math.PI / 2, 0, 0]}
+		receiveShadow
+	/>
+
+	<SC.Primitive
+		object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
+		position={[0, 0.01, 0]}
+	/>
+</SC.Group>
```

Before the shadows will work, we need to enable them at the canvas level...

```diff
-<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
+<SC.Canvas antialias background={new THREE.Color('papayawhip')} shadows>
```

...and on the light source (specifying a larger-than-default `mapSize` to avoid blurriness):

```diff
-<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />
+<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
```

Add a `maxPolarAngle` so the camera can't dip below the floor:

```diff
-<SC.OrbitControls enableZoom={false} />
+<SC.OrbitControls enableZoom={false} maxPolarAngle={Math.PI * 0.51} />
```

Finally, add a `fog` property to the canvas:

```diff
​<SC.Canvas
	antialias
	background={new THREE.Color('papayawhip')}
+	fog={new THREE.FogExp2('papayawhip', 0.1)}
	shadows
>
```

<div class="demo">
	<CanvasWithBox8/>
</div>
