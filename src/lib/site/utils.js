/**
 *
 * @param {number} min
 * @param {number} max
 * @param {number} step
 */
export function range(min, max, step) {
	const output = [];
	for (let i = min; i < max; i += step) {
		output.push(i);
	}

	return output;
}
