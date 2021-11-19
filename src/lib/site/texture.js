import { browser } from '$app/env';
import * as THREE from 'three';

const cache = new Map();

/**
 * @param {string} url
 * @param {() => void} callback
 */
export function load(url, callback) {
	if (!browser) return;

	if (cache.has(url)) {
		callback();
	} else {
		cache.set(url, new THREE.TextureLoader().load('/images/example-code-2.png', callback));
	}

	return cache.get(url);
}
