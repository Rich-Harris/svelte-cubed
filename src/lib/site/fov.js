/**
 * @param {number} hfov
 * @param {number} ratio
 */
export function vfov(hfov, ratio) {
	return (Math.atan(Math.tan((hfov * Math.PI) / 360) / ratio) * 360) / Math.PI;
}
