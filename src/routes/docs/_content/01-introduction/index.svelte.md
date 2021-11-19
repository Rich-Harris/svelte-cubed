---
title: Introduction
---

## What is Svelte Cubed?

Svelte Cubed is a component library for building [Three.js](https://threejs.org) scene graphs in [Svelte](https://svelte.dev) apps. In the same way that Svelte **declaratively** abstracts over all the messiness of **imperatively** building and updating the DOM, Svelte Cubed makes it easy to build state-driven 3D graphics.

**It is not yet done**. You can use it, but you should expect missing features and APIs that aren't yet set in stone.

## Comparisons

### Svelte GL

[Svelte GL](https://github.com/sveltejs/gl) was an experiment in creating a WebGL component framework from scratch. It was designed for tiny JavaScript bundles, and it succeeded — the JavaScript for [this New York Times story](https://www.nytimes.com/interactive/2020/02/21/business/coronavirus-airline-travel.html) is less than 30kb zipped — but reimplementing all the features rightly expected by users of Three.js would be an impossible task.

### Svelthree

[Svelthree](https://svelthree.dev/) is an existing project that brings declarative component-driven development to Three.js. The two projects have many similarities, but ultimately have different enough ideas about API design that it makes sense for them to be separate.

### React Three Fiber

[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) is a React component library for Three.js. It is a work of art, and [Paul Henschel's twitter feed](https://twitter.com/0xca0a/), where he frequently shares examples of projects built with R3F, is required reading.

Svelte Cubed is inspired by R3F in many ways. There are however some key differences:

- **Treeshaking.** Three.js includes a lot of stuff, and as a result it's a fairly large library. Usually, you can cut down on the bundle size with treeshaking — for example, if you're not using [DodecahedronGeometry](https://github.com/mrdoob/three.js/blob/master/src/geometries/DodecahedronGeometry.js) in your app, then as long as you're using a modern build tool it won't be served to your users in production.

  But that's not possible with R3F. The reason is that elements like `<mesh>` and `<dodecahedronGeometry>` are [PascalCased](https://github.com/pmndrs/react-three-fiber/blob/acd91a3d38a95bb06a3e210679c9b50553b67c0e/packages/fiber/src/core/renderer.ts#L275) and [looked up](https://github.com/pmndrs/react-three-fiber/blob/acd91a3d38a95bb06a3e210679c9b50553b67c0e/packages/fiber/src/core/renderer.ts#L296) on the `THREE` namespace at runtime. Because of that, it's not possible for a bundler to treeshake _anything_ from the library — no matter how simple your R3F app, you will pay full fare.

  There's a good reason for this design decision: because React re-runs your component code on every state change, any code like `new THREE.Mesh(...)` will re-run frequently, at great expense, unless you go ham with `useMemo`. By converting JSX elements to Three classes, R3F is able to avoid that. But it comes at a cost.

- **Idiomaticity.** R3F is able to render your scenes at 60fps because updates happen 'in a unified renderloop outside of React'. As the [performance pitfalls](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) page makes clear ("don't let React near animations"), it's not recommended to use component props to update objects, but rather to use an elaborate workaround involving refs.

  In other words, when using R3F you have to forgo a lot of declarativity — arguably the main reason for using a component framework — because React's update model is too expensive. In Svelte Cubed you can use the same reactivity model (including Svelte's built-in [motion](https://svelte.dev/tutorial/tweened) [primitives](https://svelte.dev/tutorial/spring)) as elsewhere in your Svelte apps.

On the flip side, R3F is battle-tested and feature-rich. Svelte Cubed doesn't yet have physics integrations and turnkey interactivity, for example. These things are planned for the future, but in the meantime if you need to build a WebGL app quickly and you already know React, R3F is the way to go.
