/**
 *
 * @param {import('three').Object3D} object
 * @param {[number, number, number]} position
 * @param {[number, number, number, import('../types').EulerOrder?]} rotation
 * @param {number | [number, number, number]} scale
 */
export function transform(object, position, rotation, scale) {
	object.position.set(position[0], position[1], position[2]);

	object.rotation.set(rotation[0], rotation[1], rotation[2], rotation[3]);

	if (typeof scale === 'number') {
		object.scale.set(scale, scale, scale);
	} else {
		object.scale.set(scale[0], scale[1], scale[2]);
	}
}
