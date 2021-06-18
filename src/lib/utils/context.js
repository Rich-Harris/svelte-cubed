import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const ROOT = {};
const PARENT = {};

/**
 * @returns {{
 *   invalidate: () => void;
 *   parent: import('svelte/store').Readable<any>;
 *   self: import('svelte/store').Writable<any>;
 * }}
 */
export function context() {
	const root = getContext(ROOT)();
	const parent = getContext(PARENT) || writable(root.scene);

	const self = writable(undefined);
	setContext(PARENT, self);

	return {
		invalidate: root.invalidate,
		parent: parent && { subscribe: parent.subscribe },
		self
	};
}

/** @param {import('../types/context').RootContext} context */
export function set_root(context) {
	setContext(ROOT, context);
	return context;
}

/** @returns {import('../types/context').RootContext} */
function get_root() {
	return getContext(ROOT);
}

export function getInvalidator() {
	return get_root().invalidate;
}
