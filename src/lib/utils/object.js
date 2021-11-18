/**
 * @param {import('three').Object3D} object
 * @param {import('../types/common').Position} position
 * @param {import('../types/common').Rotation} rotation
 * @param {import('../types/common').Scale} scale
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
