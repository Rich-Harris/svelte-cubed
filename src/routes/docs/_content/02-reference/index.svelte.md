---
title: Reference
---

## Types

TypeScript users should install `@types/three` in order to get typechecking and autocompletion for Three.js code.

Svelte Cubed defines a handful of additional types to make it easier to work with components that use [Vector3](https://threejs.org/docs/#api/en/math/Vector3) and [Euler](https://threejs.org/docs/#api/en/math/Euler) classes:

```typescript
type Position = [number, number, number];

type Scale = number | [number, number, number];

type EulerOrder = 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
type Rotation = [number, number, number, EulerOrder?];
```

Type information for Svelte Cubed components and functions are detailed below in the following form:

```ts
// optional property
name: type = default

// required property
name: type
```

## <Canvas>

[Scene](https://threejs.org/docs/#api/en/scenes/Scene) properties:

```ts
background: THREE.Color | THREE.Texture = undefined
environment: THREE.Texture = undefined
fog: THREE.Fog = undefined
overrideMaterial: THREE.Material = undefined
```

[WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) properties:

```ts
precision: 'lowp' | 'mediump' | 'highp' = 'highp'
powerPreference: 'default' | 'high-performance' | 'low-power' = 'default'
alpha: boolean = false
premultipliedAlpha: boolean = true
antialias: boolean = false
stencil: boolean = true
preserveDrawingBuffer: boolean = false
failIfMajorPerformanceCaveat: boolean = false
depth: boolean = true
logarithmicDepthBuffer: boolean = false
autoClear: boolean = true
autoClearColor: boolean = true
autoClearDepth: boolean = true
autoClearStencil: boolean = true
checkShaderErrors: boolean = true
gammaFactor: number = 2
localClippingEnabled: boolean = false
physicallyCorrectLights: boolean = false
outputEncoding: number = undefined
clippingPlanes: THREE.Plane[] = []
shadows: boolean | typeof THREE.BasicShadowMap | typeof THREE.PCFShadowMap | typeof THREE.PCFSoftShadowMap | typeof THREE.VSMShadowMap = undefined
toneMapping: typeof THREE.NoToneMapping | typeof THREE.LinearToneMapping | typeof THREE.ReinhardToneMapping | typeof THREE.CineonToneMapping | typeof THREE.ACESFilmicToneMapping = THREE.NoToneMapping
toneMappingExposure: number = 1
```

Additional properties:

```ts
width: number = container.offsetWidth;
height: number = container.offsetHeight;
pixelRatio: number = devicePixelRatio;
```

Instance methods:

```ts
info: () => THREE.WebGLInfo;
```

## Objects

### <Bone>

TODO

### <Group>

TODO

### <Mesh>

[Object3D](https://threejs.org/docs/#api/en/core/Object3D) properties:

```ts
position: Position = [0, 0, 0];
rotation: Rotation = [0, 0, 0];
scale: Scale = 1;
castShadow: boolean = false;
receiveShadow: boolean = false;
frustumCulled: boolean = true;
renderOrder: number = 0;
```

[Mesh](https://threejs.org/docs/#api/en/objects/Mesh) properties:

```ts
geometry: THREE.BufferGeometry;
material: THREE.Material = new THREE.MeshNormalMaterial();
```

### <Primitive>

TODO

### <Skeleton>

TODO

### <SkinnedMesh>

TODO

## Lights

### <AmbientLight>

TODO

### <DirectionalLight>

TODO

### <HemisphereLight>

TODO

### <PointLight>

TODO

### <Spotlight>

TODO

## Cameras

### <OrthographicCamera>

TODO

### <PerspectiveCamera>

TODO

## Controls

### <OrbitControls>

TODO

### <PointerLockControls>

TODO

## Helpers

### <SkeletonHelper>

TODO

### <VertexNormalsHelper>

TODO

## Animation

### <Animation>

TODO

## Utilities

### onFrame

TODO

### getCapabilities

TODO

### getInvalidator

TODO
