import * as THREE from 'three';

/** @type {import('../types/common').Position} */
export let position = [0, 0, 0];

/** @type {import('../types/common').Rotation} */
export let rotation = [0, 0, 0];

/** @type {import('../types/common').Scale} */
export let scale = [1, 1, 1];

/** @type {import('three').BufferGeometry} */
export let geometry = new THREE.BufferGeometry();

/** @type {import('three').Material} */
export let material = new THREE.MeshNormalMaterial();
