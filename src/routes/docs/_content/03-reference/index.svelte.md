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

Type information for Svelte Cubed components and functions are detailed below.

## <Canvas>

## Objects

### <Mesh>

TODO

## Lights

TODO

## Cameras

TODO

## Controls

TODO

## Helpers

TODO

## Animation

TODO

## Utilities

TODO

### onFrame

TODO

### getCapabilities

TODO

### getInvalidator

TODO
