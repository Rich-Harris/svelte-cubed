import { getContext, setContext } from 'svelte';

const ROOT = {};
const GROUP = {};
const OBJECT = {};

/** @param {import('../types/context').RootContext} context */
export function set_root(context) {
	setContext(ROOT, context);
}

/** @returns {import('../types/context').RootContext} */
export function get_root() {
	return getContext(ROOT);
}

/** @param {import('../types/context').GroupContext} context */
export function set_group(context) {
	setContext(GROUP, context);
}

/** @returns {import('../types/context').GroupContext} */
export function get_group() {
	return getContext(GROUP);
}

/** @param {import('../types/context').ObjectContext} context */
export function set_object(context) {
	setContext(OBJECT, context);
}

/** @returns {import('../types/context').ObjectContext} */
export function get_object() {
	return getContext(OBJECT);
}
