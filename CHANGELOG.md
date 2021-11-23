# svelte-cubed changelog

## 0.2.1

- Correctly diff OrbitControls target ([#12](https://github.com/Rich-Harris/svelte-cubed/issues/12))

## 0.2.0

- Rename from `svelte-three` to `svelte-cubed`

## 0.1.2

- Expose `info`

## 0.1.1

- Try forcing context loss

## 0.1.0

- **BREAKING** Rename `Scene` to `Canvas`
- Add `frustumCulled` prop to `<Mesh>` and `<SkinnedMesh>`

## 0.0.18

- Expose `viewOffset` on `<PerspectiveCamera>`

## 0.0.17

- Update `VertexNormalsHelper` automatically
- Expose `capabilities`

## 0.0.16

- Remove auto-skinning logic
- Add `VertexNormalsHelper`
- Use `three/examples` rather than `three-stdlib`

## 0.0.15

- Bump deps

## 0.0.14

- Generate proper types, with next version of SvelteKit

## 0.0.13

- Add some temporary broken logic for skinning. WIP, will be removed in future
- Make `renderOrder` configurable

## 0.0.12

- Add `SkinnedMesh`, `Skeleton`, `SkeletonHelper` and `Bone` components
- Internal rewrite

## 0.0.11

- Add `getInvalidator` function

## 0.0.10

- Add `HemisphereLight`

## 0.0.9

- Invalidate AmbientLight on change

## 0.0.8

- Fix OrbitControls bug

## 0.0.7

- Allow width/height to be explicit

## 0.0.6

- Expose orbit controls target

## 0.0.5

- Invalidate scene when camera changes

## 0.0.4

- Export Position/Rotation/Scale types

## 0.0.3

- Support Euler order in rotation props

## 0.0.2

- Various

## 0.0.1

- First release
