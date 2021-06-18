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

/** @param {import('../types/context').RootContext} context */
export function set_root(context) {
	setContext(ROOT, context);
	return context;
}

export function getInvalidator() {
	return getContext(ROOT).invalidate;
}
