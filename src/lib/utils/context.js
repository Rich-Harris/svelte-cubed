import { getContext, setContext } from 'svelte';

const ROOT = {};
const GROUP = {};
const OBJECT = {};

/** @param {import('../types').RootContext} context */
export function set_root(context) {
	setContext(ROOT, context);
}

/** @returns {import('../types').RootContext} */
export function get_root() {
	return getContext(ROOT);
}

/** @param {import('../types').GroupContext} context */
export function set_group(context) {
	setContext(GROUP, context);
}

/** @returns {import('../types').GroupContext} */
export function get_group() {
	return getContext(GROUP);
}

/** @param {import('../types').ObjectContext} context */
export function set_object(context) {
	setContext(OBJECT, context);
}

/** @returns {import('../types').ObjectContext} */
export function get_object() {
	return getContext(OBJECT);
}
