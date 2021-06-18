import * as THREE from 'three';

/** @type {import('../types').Position} */
export let position = [0, 0, 0];

/** @type {import('../types').Rotation} */
export let rotation = [0, 0, 0];

/** @type {import('../types').Scale} */
export let scale = [1, 1, 1];

/** @type {import('three').Material} */
export let material = new THREE.MeshNormalMaterial();
