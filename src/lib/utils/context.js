import { getContext, setContext, onDestroy } from 'svelte';

const ROOT = {};
const PARENT = {};

/**
 * @template T
 * @param {T} [self]
 * @returns {{
 *   root: import('../types/context').RootContext;
 *   parent: THREE.Object3D;
 *   self: T;
 * }}
 */
export function setup(self) {
	const root = getContext(ROOT);
	const parent = getContext(PARENT) || root.scene;

	if (self) {
		setContext(PARENT, self);

		parent.add(self);

		onDestroy(() => {
			parent.remove(self);
			root.invalidate();
		});
	}

	return {
		root,
		parent,
		self
	};
}

/** @returns {import('../types/context').RootContext} */
function get_root() {
	return getContext(ROOT);
}

/** @param {import('../types/context').RootContext} context */
export function set_root(context) {
	setContext(ROOT, context);
	return context;
}

export function getInvalidator() {
	return get_root().invalidate;
}

export function getCapabilities() {
	return get_root().renderer.capabilities;
}
