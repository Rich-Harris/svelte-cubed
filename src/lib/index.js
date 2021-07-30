export { default as Canvas } from './components/Canvas.svelte';

// objects
export { default as Bone } from './components/objects/Bone.svelte';
export { default as Group } from './components/objects/Group.svelte';
export { default as Mesh } from './components/objects/Mesh.svelte';
export { default as Skeleton } from './components/objects/Skeleton.svelte';
export { default as SkinnedMesh } from './components/objects/SkinnedMesh.svelte';
export { default as Primitive } from './components/objects/Primitive.svelte';

// cameras
export { default as PerspectiveCamera } from './components/cameras/PerspectiveCamera.svelte';
export { default as OrthographicCamera } from './components/cameras/OrthographicCamera.svelte';

// controls
export { default as OrbitControls } from './components/controls/OrbitControls.svelte';

// lights
export { default as AmbientLight } from './components/lights/AmbientLight.svelte';
export { default as DirectionalLight } from './components/lights/DirectionalLight.svelte';
export { default as HemisphereLight } from './components/lights/HemisphereLight.svelte';
export { default as PointLight } from './components/lights/PointLight.svelte';
export { default as SpotLight } from './components/lights/SpotLight.svelte';

// animation
export { default as Animation } from './components/animation/Animation.svelte';

// helpers
export { default as SkeletonHelper } from './components/helpers/SkeletonHelper.svelte';
export { default as VertexNormalsHelper } from './components/helpers/VertexNormalsHelper.svelte';

// utils
export { onFrame } from './utils/lifecycle.js';

// context
export { getInvalidator } from './utils/context.js';
export { getCapabilities } from './utils/context.js';

/** @typedef {import('./types/common').Position} Position */
/** @typedef {import('./types/common').Rotation} Rotation */
/** @typedef {import('./types/common').Scale} Scale */
/** @typedef {import('./types/common').EulerOrder} EulerOrder */
